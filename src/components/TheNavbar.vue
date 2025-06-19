<script setup>
import NavbarItem from '@/components/NavbarItem.vue';
import IconTasklist from './icons/IconTasklist.vue';
import IconScanner from './icons/IconScanner.vue';
import IconBee from './icons/IconBee.vue';
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <div class="wrapper">
            <nav>
                <NavbarItem href="/" title="Tâches">
                    <IconTasklist />
                </NavbarItem>
                <NavbarItem href="/scanner" title="Scanner">
                    <IconScanner />
                </NavbarItem>
                <NavbarItem href="/profil" title="Profil">
                    <IconBee />
                </NavbarItem>
            </nav>
        </div>
    </header>
</template>

<style scoped>
img.logo {
    display: none;
}

.wrapper {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
}

nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-md);
    padding-bottom: calc(var(--spacing-sm) + env(safe-area-inset-bottom));
    background-color: var(--color-background);
    color: var(--color-brown);
}
</style>