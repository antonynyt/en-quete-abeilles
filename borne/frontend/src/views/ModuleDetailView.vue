<script setup>
import DetailLayout from '@/layouts/DetailLayout.vue';
import BaseCardList from '@/components/BaseCardList.vue';
import BaseCard from '@/components/BaseCard.vue';
import IconPlay from '@/components/icons/IconPlay.vue';

</script>

<template>
    <DetailLayout v-slot="{ module }">
        <div class="subject-list">
            <h2>Choisis un sujet pour en savoir plus</h2>
            <div class="list">
                <BaseCardList v-if="module">
                    <BaseCard v-for="subject in module.subject" :key="subject.id" :item="subject"
                        :to="`${module.documentId}/${subject.id}`" :showIcon="true">
                        <template #icon>
                            <IconPlay />
                        </template>
                    </BaseCard>
                </BaseCardList>
            </div>
        </div>
    </DetailLayout>
</template>

<style scoped>
.subject-list {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-lg);
}

.subject-list h2 {
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: 500;
}

.list {
    height: 100%;
    display: flex;
    align-items: center;
}

.list :deep(h2) {
    font-size: var(--font-size-md);
}

.list :deep(.card) {
    width: 25vw;
}
</style>