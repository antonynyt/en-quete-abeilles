<script setup>
import NavbarItem from '@/components/NavbarItem.vue';
import IconTasklist from './icons/IconTasklist.vue';
import IconScanner from './icons/IconScanner.vue';
import IconBee from './icons/IconBee.vue';
</script>

<template>
    <header>
        <nav>
            <NavbarItem href="/tasks" title="Tâches" class="icon-tasklist">
                <IconTasklist />
            </NavbarItem>
            <NavbarItem href="/scanner" title="Scanner">
                <IconScanner />
            </NavbarItem>
            <NavbarItem href="/profil" title="Profil">
                <IconBee />
            </NavbarItem>
        </nav>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    color: var(--color-brown);
    background-color: var(--color-background);
    border-top: 1px solid var(--color-beige);
    z-index: 1000;
}

nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    padding-bottom: calc(var(--spacing-sm) + env(safe-area-inset-bottom));
    max-width: var(--max-width);
    margin: auto;
}

:deep(.icon-tasklist .icon::before) {
    content: '';
    position: absolute;
    top: 0;
    right: 2.1px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--color-orange-electric);
}

@media screen and (min-width: 768px) {
    header {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 100px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 1px solid var(--color-beige);
        border-top: none;
    }

    nav {
        flex-direction: column;
        justify-content: center;
        gap: var(--spacing-lg);
        padding: 0;
        width: 80%;
    }

}
</style>