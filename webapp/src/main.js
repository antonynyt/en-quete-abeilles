import './styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js')
            console.log('Service worker registered:', registration)
            navigator.serviceWorker.ready.then((registration) => {
                registration.active.postMessage('precache-api')
            })
        } catch (error) {
            console.error('Service worker registration failed:', error)
        }
    })
}
