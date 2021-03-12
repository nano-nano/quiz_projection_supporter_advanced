<template>
  <div class="root">
    <div class="ui segment" style="height: 50%;">
      <div v-if="refIsShowQuestionId">【問題ID: {{refQuiz.id}}】</div>
      {{refQuiz.question}}
    </div>
    <div class="ui segments" style="height: 50%;">
      <div class="ui segment" :style="{ height: (refIsShowAnotherAnswer ? 50 : 100 ) + '%' }">
        {{refQuiz.answer}}
      </div>
      <div class="ui segment" :style="{ height: (refIsShowAnotherAnswer ? 50 : 0 ) + '%' }" v-if="refIsShowAnotherAnswer">
        {{refQuiz.anotherAnswer}}
      </div>
    </div>
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
    const refIsShowQuestionId = ref(false);
    const refIsShowAnotherAnswer = ref(false);

    onMounted(() => {
      window.ipcApi.receiveQuizData((quiz) => {
        refQuiz.value = quiz;
      });
      window.ipcApi.receiveChangingIsShowQuestionId((val) => {
        refIsShowQuestionId.value = val;
      });
      window.ipcApi.receiveChangingIsShowAnotherAnswer((val) => {
        refIsShowAnotherAnswer.value = val;
      });
    })

    return {
      refQuiz,
      refIsShowQuestionId,
      refIsShowAnotherAnswer
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
  padding: 2.5%;
}
</style>