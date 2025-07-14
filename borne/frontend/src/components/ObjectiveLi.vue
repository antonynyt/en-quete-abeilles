<template>
    <li>
        <slot />
    </li>
</template>

<style scoped>
li {
    position: relative;
    /* space to preserve indentation on wrap */
    list-style: none;
}

li:before {
    content: '';
    position: absolute;
    left: -1.6em;
    top: 0.1em;
    /* place the SVG at the start of the padding */
    width: 24px;
    height: 24px;
    background: url("data:image/svg+xml;utf8,<?xml version='1.0' encoding='utf-8'?><svg width='1.5em' height='1.5em' viewBox='0 -960 960 960' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z'/></svg>") no-repeat;
}
</style>