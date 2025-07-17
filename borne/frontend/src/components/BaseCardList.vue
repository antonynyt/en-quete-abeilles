<template>
    <main>
        <slot />
    </main>
</template>

<style scoped>
main {
    display: flex;
    gap: var(--spacing-md);
    overflow-y: auto;
    padding: var(--spacing-xs) var(--spacing-md);
}

main::-webkit-scrollbar {
    /* Chrome, Safari and Opera */
    display: none;
}

main {
    /* Firefox */
    scrollbar-width: none;
}
</style>