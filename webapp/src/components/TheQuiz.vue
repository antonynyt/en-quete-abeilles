<script setup>
import BaseModal from './BaseModal.vue';
import { ref } from 'vue';
import { useStrapiApi } from '@/composables/useStrapiApi';
import { useGameStore } from '@/stores/gameStore';
import BaseButton from './BaseButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const gameStore = useGameStore();
const { getTaskQuiz } = useStrapiApi();

const props = defineProps({
    taskId: {
        type: String,
        required: true
    }
});

const modal = ref();
const showModal = () => modal.value?.show()
const quiz = ref(null);
const selectedAnswers = ref([]);
const isCorrect = ref(false);
const showFeedback = ref(false);
const isTaskDone = () => gameStore.isTaskCompleted(props.taskId);

const loadQuiz = async () => {
    try {
        const response = await getTaskQuiz(props.taskId);
        if (response.data.quiz) {
            quiz.value = {
                question: response.data.quiz.question,
                feedback: response.data.quiz.feedback,
                choices: response.data.quiz.choice.map(choice => ({
                    id: choice.id,
                    text: choice.response,
                    isCorrect: choice.correct
                }))
            };
            showModal();
        } else {
            console.warn('No quiz found for this task');
        }
    } catch (error) {
        console.error('Failed to load quiz:', error);
    }
};

const handleContinue = () => {
    gameStore.markTaskAsCompleted(props.taskId);
    router.push('/');
};

const handleChoiceSelect = (event) => {
    const choiceId = parseInt(event.target.id);
    if (event.target.checked) {
        if (!selectedAnswers.value.includes(choiceId)) {
            selectedAnswers.value.push(choiceId);
        }
    } else {
        selectedAnswers.value = selectedAnswers.value.filter(id => id !== choiceId);
    }
};

const handleSubmit = () => {
    const correctAnswers = quiz.value.choices.filter(choice => choice.isCorrect).map(choice => choice.id);
    const hasCorrectAnswers = correctAnswers.length > 0 &&
        selectedAnswers.value.length === correctAnswers.length &&
        selectedAnswers.value.every(id => correctAnswers.includes(id));

    isCorrect.value = hasCorrectAnswers;
    showFeedback.value = true;
};

defineExpose({
    loadQuiz
});

</script>

<template>
    <BaseModal ref="modal" class="quiz">
        <h1 class="quiz__title">Quiz</h1>

        <div v-if="!showFeedback && !isTaskDone()" class="quiz__content">
            <h2 class="quiz__question">{{ quiz?.question }}</h2>
            <form @submit.prevent="handleSubmit" class="quiz__form">
                <ul class="quiz__choices">
                    <li v-for="choice in quiz?.choices" :key="choice.id" class="quiz__choice">
                        <label :for="choice.id" class="quiz__choice-label">
                            <input type="checkbox" :id="choice.id" @change="handleChoiceSelect"
                                class="quiz__choice-input" />
                            <span class="quiz__choice-text button">{{ choice.text }}</span>
                        </label>
                    </li>
                </ul>
                <BaseButton class="primary" type="submit">Valider</BaseButton>
            </form>
        </div>

        <div v-else class="quiz__content">
            <div class="quiz__feedback">
                <h2 v-if="!isTaskDone()"
                    :class="['quiz__feedback-title', isCorrect ? 'quiz__feedback-title--correct' : 'quiz__feedback-title--incorrect']">
                    {{ isCorrect ? 'Bravo !' : 'Pas tout à fait!' }}
                </h2>
                <h2 v-else class="quiz__feedback-title">{{ quiz?.question }}</h2>
                <p class="quiz__feedback-text">{{ quiz?.feedback }}</p>
            </div>
            <div class="quiz__answer">
                <p class="quiz__answer-text">
                    <span class="quiz__answer-label bold">Réponse:</span>
                    {{quiz?.choices.filter(choice => choice.isCorrect).map(choice => choice.text).join(', ')}}.
                </p>
            </div>
            <div class="quiz__actions">
                <BaseButton class="primary" @click="handleContinue">Continuer l'aventure</BaseButton>
            </div>
        </div>
    </BaseModal>
</template>

<style scoped>
.quiz {
    padding-top: var(--spacing-md);
}

.quiz__title {
    margin-bottom: 0;
}

.quiz__question {
    font-size: var(--font-size-md);
}

.quiz__choices {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    margin: var(--spacing-lg) 0;
}

.quiz__choice {
    margin: 0;
}

.quiz__choice-input {
    display: none;
}

.quiz__choice-input:checked+.quiz__choice-text {
    background-color: var(--color-beige);
    box-shadow: none;
    transform: translateY(calc(var(--border-size) * 2));
}

.quiz__feedback {
    margin-bottom: var(--spacing-md);
}

.quiz__feedback-title {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-sm);
}

.quiz__feedback-title--correct {
    color: #427e37;
}

.quiz__feedback-title--incorrect {
    color: #d33141;
}

.quiz__feedback-text {
    margin: var(--spacing-sm) 0;
}

.quiz__answer {
    margin: var(--spacing-md) 0;
    border-radius: var(--radius-sm);
    padding: var(--spacing-md);
    background-color: var(--color-beige);
    color: var(--color-brown);
}

.quiz__answer-text {
    margin: 0;
}
</style>