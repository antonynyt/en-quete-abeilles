const VERSION = 'v_0.2'
const CACHE_NAMES = {
    core: `${VERSION}_core`,
    assets: `${VERSION}_assets`,
    images: `${VERSION}_images`,
    data: `${VERSION}_data`,
}
const CACHE_LIMITS = {
    assets: 100,
    images: 100,
    data: 20,
}

const CORE_FILES = [
    '/',
    '/index.html',
    '/favicon.ico',
    '/manifest.json',
    '/site.webmanifest',
    '/favicon.svg',
    '/apple-touch-icon.png',
    '/scanner',
]

const API_DOMAIN = self.location.hostname.startsWith('localhost')
    ? 'http://localhost:1337'
    : `https://cms.${self.location.hostname.replace('app.', '')}`

const API_ENDPOINTS = [
    `${API_DOMAIN}/api/tasks?populate=*`,
    `${API_DOMAIN}/api/tasks?populate[clue][populate]=image`,
    `${API_DOMAIN}/api/final-task?populate[clue][populate]=image`,
]

// ===== Helper Functions =====
function isImageRequest(request) {
    return /\.(png|jpg|jpeg|gif|svg|ico|webp|avif)$/i.test(request.url)
}

function isAssetRequest(request) {
    return /\.(js|css|json|woff2?|ttf|otf)$/i.test(request.url)
}

function isApiDomain(url) {
    return url.hostname === new URL(API_DOMAIN).hostname
}

// ===== Service Worker Events =====
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAMES.core)
            .then((cache) => cache.addAll(CORE_FILES))
            .then(() => self.skipWaiting()),
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(
                    keys.map((key) => {
                        if (!Object.values(CACHE_NAMES).includes(key)) {
                            return caches.delete(key)
                        }
                    }),
                ),
            )
            .then(() => self.clients.claim())
            .then(() => precacheApiImages()),
    )
})

self.addEventListener('fetch', (event) => {
    const { request } = event
    console.log('Fetch event:', request.method, request.url)
    const url = new URL(request.url)

    if (request.method !== 'GET') return

    if (url.pathname.startsWith('/api') || isApiDomain(url)) {
        return event.respondWith(handleApiRequest(event))
    }

    if (isImageRequest(request)) {
        return event.respondWith(handleImageRequest(event))
    }

    if (!url.origin.startsWith(self.location.origin)) {
        return
    }

    if (isAssetRequest(request)) {
        return event.respondWith(handleAssetRequest(event))
    }

    event.respondWith(handleCoreRequest(event))
})

// ===== Image Handling Functions =====
function isValidImageUrl(url) {
    return url.includes('/uploads/') && /\.(png|jpg|jpeg|gif|svg|ico|webp|avif)(\?.*)?$/i.test(url)
}

async function extractImageUrlsFromApi(data) {
    const imageUrls = new Set()
    const findImages = (obj) => {
        if (!obj) return

        if (typeof obj === 'string' && isValidImageUrl(obj)) {
            // Normalize URL to API domain
            const normalizedUrl = obj.replace(/^https?:\/\/[^\/]+/i, API_DOMAIN)
            imageUrls.add(normalizedUrl)
        } else if (Array.isArray(obj)) {
            obj.forEach((item) => findImages(item))
        } else if (typeof obj === 'object') {
            Object.values(obj).forEach((value) => findImages(value))
        }
    }

    findImages(data)
    return Array.from(imageUrls)
}

// ===== API Image Precaching =====
async function precacheApiImages() {
    try {
        const apiCache = await caches.open(CACHE_NAMES.data)
        const imageCache = await caches.open(CACHE_NAMES.images)

        for (const endpoint of API_ENDPOINTS) {
            const response = await apiCache.match(endpoint)
            if (response) {
                try {
                    const data = await response.json()
                    const imageUrls = await extractImageUrlsFromApi(data)

                    for (const imgUrl of imageUrls) {
                        // Ensure URL includes API domain
                        const fullImgUrl = imgUrl.startsWith('http')
                            ? imgUrl
                            : imgUrl.startsWith('/')
                              ? `${API_DOMAIN}${imgUrl}`
                              : `${API_DOMAIN}/${imgUrl}`

                        // Create a proper Request object with the full URL
                        const imgRequest = new Request(fullImgUrl)

                        if (!(await imageCache.match(imgRequest))) {
                            try {
                                const imgResponse = await fetch(imgRequest)
                                if (imgResponse.ok) {
                                    await imageCache.put(imgRequest, imgResponse.clone())
                                    console.log('Cached image:', fullImgUrl)
                                }
                            } catch (err) {
                                console.warn('Image precache failed:', fullImgUrl, err)
                            }
                        }
                    }
                } catch (jsonError) {
                    console.error('JSON parse error:', endpoint, jsonError)
                }
            }
        }
        trimCache(CACHE_NAMES.images, CACHE_LIMITS.images)
    } catch (err) {
        console.error('API image precaching failed', err)
    }
}

// ===== Request Handlers =====
async function handleApiRequest(event) {
    const cache = await caches.open(CACHE_NAMES.data)
    const request = event.request

    try {
        const networkResponse = await fetch(request)

        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone())
            trimCache(CACHE_NAMES.data, CACHE_LIMITS.data)

            event.waitUntil(
                networkResponse
                    .clone()
                    .json()
                    .then((data) => {
                        const imageUrls = extractImageUrlsFromApi(data)
                        return cacheApiImages(imageUrls)
                    })
                    .catch(() => {}),
            )
        }

        return networkResponse
    } catch (error) {
        const cachedResponse = await cache.match(request)
        return cachedResponse || createErrorResponse()
    }
}

async function cacheApiImages(imageUrls) {
    if (!imageUrls.length) return

    const cache = await caches.open(CACHE_NAMES.images)
    await Promise.all(
        imageUrls.map(async (url) => {
            if (!(await cache.match(url))) {
                try {
                    const response = await fetch(url)
                    if (response.ok) {
                        cache.put(url, response)
                    }
                } catch {
                    // Fail silently
                }
            }
        }),
    )

    trimCache(CACHE_NAMES.images, CACHE_LIMITS.images)
}

async function handleImageRequest(event) {
    const request = event.request
    const url = new URL(request.url)

    // Only cache valid API images
    if (isApiDomain(url) && url.pathname.includes('/uploads/')) {
        const cache = await caches.open(CACHE_NAMES.images)
        const cached = await cache.match(request)

        if (cached) return cached

        try {
            const netResponse = await fetch(request)
            if (netResponse.ok) {
                const cloned = netResponse.clone()
                const headers = new Headers(cloned.headers)
                headers.set('Content-Security-Policy', "default-src 'self'")

                event.waitUntil(
                    cache.put(
                        request,
                        new Response(cloned.body, {
                            status: cloned.status,
                            statusText: cloned.statusText,
                            headers: headers,
                        }),
                    ),
                )
            }
            return netResponse
        } catch (err) {
            // Fall through to network error
        }
    }
    return fetch(request)
}

async function handleAssetRequest(event) {
    const cache = await caches.open(CACHE_NAMES.assets)
    const cached = await cache.match(event.request)
    if (cached) return cached

    try {
        const netResponse = await fetch(event.request)
        if (netResponse.ok) {
            cache.put(event.request, netResponse.clone())
            trimCache(CACHE_NAMES.assets, CACHE_LIMITS.assets)
        }
        return netResponse
    } catch {
        return createErrorResponse()
    }
}

async function handleCoreRequest(event) {
    try {
        const response = await fetch(event.request)
        if (response.ok) return response
    } catch {}

    const cachedResponse = await caches.match(event.request)
    return cachedResponse || caches.match('/')
}

function createErrorResponse() {
    return new Response(JSON.stringify({ error: 'Network error' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
    })
}

async function trimCache(cacheName, maxItems) {
    const cache = await caches.open(cacheName)
    const keys = await cache.keys()
    if (keys.length > maxItems) {
        const toDelete = keys.slice(0, keys.length - maxItems)
        await Promise.all(toDelete.map((key) => cache.delete(key)))
    }
}

// ===== Precache API Data =====
self.addEventListener('message', async (event) => {
    if (event.data === 'precache-api') {
        const cache = await caches.open(CACHE_NAMES.data)

        for (const endpoint of API_ENDPOINTS) {
            try {
                const response = await fetch(endpoint)
                if (response.ok) {
                    await cache.put(endpoint, response.clone())
                }
            } catch (error) {
                console.error('Precache failed:', endpoint, error)
            }
        }
        trimCache(CACHE_NAMES.data, CACHE_LIMITS.data)
        precacheApiImages()
    }
})
