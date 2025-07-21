<script setup>
import IconPlay from './icons/IconPlay.vue'

</script>

<template>
    <div class="player__controls">
        <button class="player__button button" title="Play (space)">
            <IconPlay />
        </button>
        <div class="progress">
            <div class="progress__filled"></div>
        </div>
        <div class="player__timing">
            <span class="player__current-time">0:00</span>
            <span class="player__duration">0:00</span>
        </div>
    </div>
</template>

<style scoped>
.player__controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    background: var(--color-beige-light);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border: var(--border-size) solid var(--color-beige);
}

.player__button {
    color: var(--color-brown);
    display: flex;
    width: auto;
}

.progress {
    display: flex;
    height: 1em;
    background: var(--color-beige);
    cursor: pointer;
    border-radius: 1em;
    flex-grow: 1;
}

.progress__filled {
    width: 50%;
    background: var(--color-brown);
    flex: 0;
    flex-basis: 0%;
    position: relative;
    border-radius: 1em;
    display: flex;
    align-items: center;
}

.progress__filled::after {
    content: '';
    position: absolute;
    height: 2em;
    width: 1em;
    border-radius: 1em;
    right: -0.5em;
    background: var(--color-brown);
}

.player__timing {
    display: flex;
    gap: var(--spacing-xs);
}

.player__current-time,
.player__duration {
    color: var(--color-brown);
    font-size: var(--font-size-xs);
}

.player__duration::before {
    content: '/';
    margin-right: var(--spacing-xs);
    color: var(--color-brown-light);
}
</style>