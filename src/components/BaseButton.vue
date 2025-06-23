<script setup>
import router from '@/router';

const props = defineProps({
    tag: {
        type: String,
        default: 'button'
    },
    type: {
        type: String,
        default: 'button'
    },
    href: {
        type: String,
        default: null
    }
})

const processClick = () => {
    if ('vibrate' in navigator) {
        navigator.vibrate(1);
    }
    if (props.href) {
        router.push(props.href);
    }
}
</script>

<!-- For Accessibility it is either a Button or an Anchor -->
<template>
    <component :is="tag" :href="href" :type="tag === 'button' ? type : null" class="button"
        @click.prevent="processClick">
        <slot />
    </component>
</template>

<style scoped>
/* .button styles are in the main.css */
/* That way it can be used on other components e.g. on the quiz */
</style>
