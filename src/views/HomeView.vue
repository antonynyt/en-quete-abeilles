<script setup>
import BackButton from '@/components/BaseButtonBack.vue';
import BaseButton from '@/components/BaseButton.vue';
import TheNavbar from '@/components/TheNavbar.vue';
import BaseTask from '@/components/BaseTask.vue';
import BaseProgress from '@/components/BaseProgress.vue';
import BaseIcon from '@/components/BaseIcon.vue';
import IconCommunity from '@/components/icons/IconCommunity.vue';
import IconFlag from '@/components/icons/IconFlag.vue';
import IconTooling from '@/components/icons/IconTooling.vue';

function test() {
    console.log('Button clicked!');
}

</script>

<template>
    <TheNavbar />
    <main>
        <h1>Bienvenue Gros titre</h1>
        <BaseButton tag="button" type="button" @click="test" class="primary">Commencer l'aventure</BaseButton>
        <BaseButton tag="a" @click="test" href="scanner">Commencer l'aventure</BaseButton>

        <div>
            <BackButton />
            <BaseButton tag="button" type="button" @click="test">Voler l'abeille</BaseButton>
        </div>
        <BaseTask href="scanner" color="var(--color-green)" title="J'adore danser" :isCompleted=true />
        <BaseTask color="var(--color-sky)" title="Pollen et nectar" />
        <BaseTask color="var(--color-sky)" title="La drogue de la vie" />
        <BaseTask color="var(--color-sky)" title="La drogue de la vie" />
        <BaseTask color="var(--color-sky)" title="La drogue de la vie" />
        <BaseTask color="var(--color-sky)" title="La drogue de la vie" />
        <BaseTask title="Brûler l'abeille" />
        <BaseTask color="var(--color-orange)" title="Trouver le miel" :isLocked=true />
        <BaseTask color="var(--color-sky)" title="Éviter la reine" />

        <div>
            <BaseProgress :currentStep="1" :totalSteps="5" />
        </div>

        <div>
            <BaseIcon>
                <IconCommunity />
            </BaseIcon>
            <BaseIcon color="var(--color-brown)">
                <IconFlag fill="var(--color-orange)" />
            </BaseIcon>
        </div>
        <BaseIcon>
            <IconTooling />
        </BaseIcon>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

div {
    display: flex;
    flex-direction: row;
    gap: var(--spacing-md);
}
</style>
