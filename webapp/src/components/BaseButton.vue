<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    to: {
        type: [String, Object],
        default: null
    }
})

const emit = defineEmits(['click']);

const processClick = () => {
    if ('vibrate' in navigator) {
        navigator.vibrate(1);
    }
    emit('click');
}

const componentTag = props.to ? RouterLink : (props.href ? 'a' : 'button');
</script>

<!-- For Accessibility it is either a Button, RouterLink, or an Anchor -->
<template>
    <component :is="componentTag" :to="to" class="button" @click="processClick">
        <slot />
    </component>
</template>

<style scoped>
/* .button styles are in the main.css */
/* That way it can be used on other components e.g. on the quiz */
</style>