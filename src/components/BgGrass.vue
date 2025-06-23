<template>
    <div class="bg-wrapper" aria-hidden="true">
        <div class="bg" v-bind="$attrs"></div>
    </div>
</template>

<style scoped>
.bg-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: -99;
}

.bg {
    position: absolute;
    bottom: -10vh;
    left: -100%;
    width: 300%;
    right: 0;
    height: 70vh;
    background-color: var(--color-green);
    border-radius: 100% 100% 0 0;
    transform: rotate(-2deg);
}

.h-80 {
    height: 80vh;
}
</style>