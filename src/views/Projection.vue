<template>
  <div class="root">
    <p>{{refQuiz.question}}</p>
    <p>{{refQuiz.answer}}</p>
    <p>{{refQuiz.anotherAnswer}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { QuizData } from '@/models';

const INIT_QUIZ_DATA = {
  id: '',
  question: '',
  answer: '',
  anotherAnswer: ''
} as QuizData

export default defineComponent({
  name: 'Projection',
  components: {
  },
  setup() {
    const refQuiz = ref(INIT_QUIZ_DATA);

    onMounted(() => {
      window.ipcApi.receiveQuizData((quiz: any) => {
        refQuiz.value = quiz;
      })
    })

    return {
      refQuiz
    }
  }
});
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
</style>