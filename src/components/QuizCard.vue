<template>
  <div class="ui card">
    <div class="content">
      <div class="header">{{label}}</div>
      <div class="description">
        <p>【ID: {{quiz.id}}】</p>
        {{questionText}}
      </div>
    </div>
    <div class="extra content">
      <div>{{answerText}}</div>
      <div>{{anotherAnswerText}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { QuizData } from '@/models';

type Props = {
  label: string;
  quiz: QuizData;
  isSummary?: boolean;
}

export default defineComponent({
  name: 'QuizCard',
  props: {
    label: String,
    quiz: Object,
    isSummary: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  setup(props: Props) {
    const getSubstringText = (target: string, length: number) => {
      if (target.length > length) {
        return target.substr(0, length) + '...';
      } else {
        return target;
      }
    };

    const questionText = computed(() => {
      return getSubstringText(props.quiz.question, props.isSummary ? 30 : 80)
    });
    const answerText = computed(() => {
      return getSubstringText(props.quiz.answer, props.isSummary ? 15 : 40)
    });
    const anotherAnswerText = computed(() => {
      return getSubstringText(props.quiz.anotherAnswer, props.isSummary ? 15 : 40)
    });

    return {
      questionText,
      answerText,
      anotherAnswerText
    }
  }
});
</script>

<style scoped>
.ui.card {
  font-size: medium;
  margin: 0;
  word-wrap: break-word;
}
</style>