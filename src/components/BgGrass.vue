<template>
    <div class="bg-wrapper" aria-hidden="true">
        <div class="bg" v-bind="$attrs"></div>
    </div>
</template>

<style scoped>
.bg-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -99;
}

.bg {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
}

.bg::after {
    content: '';
    position: absolute;
    top: 10rem;
    width: 400vw;
    height: 100%;
    background-color: var(--color-green);
    border-radius: 100% 100% 0 0;
}

.h-80 {
    height: 80vh;
}
</style>