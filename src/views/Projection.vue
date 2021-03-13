<template>
  <div class="root"
    :style="{
      color: refProjectionSettings.textColor,
      backgroundColor: refProjectionSettings.frameColor,
    }">
    <div
      class="ui segment"
      :style="{
        height: (refProjectionSettings.questionAnswerSeparatePosition) + '%',
        backgroundColor: refProjectionSettings.backgroundColor,
        fontSize: refProjectionSettings.questionFontSize + 'px',
        lineHeight: 1.25 + 'em',
        overflow: 'hidden'
      }">
      <div v-if="refIsShowQuestionId">【問題ID: {{refQuiz.id}}】</div>
      {{refQuiz.question}}
    </div>
    <div class="ui segments" :style="{ height: (100 - refProjectionSettings.questionAnswerSeparatePosition) + '%' }">
      <div
        class="ui segment"
        :style="{
          height: (refIsShowAnotherAnswer ? 50 : 100 ) + '%',
          backgroundColor: refProjectionSettings.backgroundColor,
          fontSize: refProjectionSettings.answerFontSize + 'px',
          lineHeight: 1.25 + 'em',
          overflow: 'hidden'
        }">
        {{refQuiz.answer}}
      </div>
      <div
        class="ui segment"
        v-if="refIsShowAnotherAnswer"
        :style="{
          height: (refIsShowAnotherAnswer ? 50 : 0 ) + '%',
          backgroundColor: refProjectionSettings.backgroundColor,
          fontSize: refProjectionSettings.anotherAnswerFontSize + 'px',
          lineHeight: 1.25 + 'em',
          overflow: 'hidden'
        }">
        {{refQuiz.anotherAnswer}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { QuizData } from '@/models';
import { DEFAULT_SETTINGS } from '@/constants';

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
    const refProjectionSettings = ref(DEFAULT_SETTINGS);

    window.ipcApi.receiveQuizData((quiz) => {
      refQuiz.value = quiz;
    });
    window.ipcApi.receiveChangingIsShowQuestionId((val) => {
      refIsShowQuestionId.value = val;
    });
    window.ipcApi.receiveChangingIsShowAnotherAnswer((val) => {
      refIsShowAnotherAnswer.value = val;
    });
    window.ipcApi.receiveProjectionSettings((newVal) => {
      refProjectionSettings.value = newVal;
    });

    onMounted(() => {
      window.ipcApi.getProjectionSettings();
    })

    return {
      refQuiz,
      refIsShowQuestionId,
      refIsShowAnotherAnswer,
      refProjectionSettings
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
.ui.segment {
  padding: 10px 15px;
}
</style>