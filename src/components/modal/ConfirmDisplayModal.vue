<template>
  <sui-modal v-model="isOpen" :closable="false" size="small">
    <sui-modal-header>この問題を投影します。よろしいですか？</sui-modal-header>
    <sui-modal-content>
      <sui-modal-description>
        <p>{{quiz.question}}</p>
        <div class="ui divider"></div>
        <div class="answer-area">
          {{quiz.answer}}<br />
          {{quiz.anotherAnswer}}
        </div>
      </sui-modal-description>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button negative @click="onClickCancelBtn">キャンセル</sui-button>
      <sui-button positive @click="onClickOkBtn">投影する</sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { QuizData } from '@/models';

type Props = {
  isOpen: boolean;
  quiz: QuizData;
  callback: (result: ConfirmDisplayModalResult) => void;
}

export enum ConfirmDisplayModalResult {
  OK,
  CANCEL
}

export default defineComponent({
  name: 'ConfirmDisplayModal',
  props: {
    isOpen: Boolean,
    quiz: Object,
    callback: Function
  },
  components: {
  },
  setup(props: Props) {
    const onClickOkBtn = () => {
      props.callback(ConfirmDisplayModalResult.OK);
    }
    const onClickCancelBtn = () => {
      props.callback(ConfirmDisplayModalResult.CANCEL);
    }

    return {
      onClickOkBtn,
      onClickCancelBtn
    }
  }
});
</script>

<style scoped>
.answer-area {
  color: rgba(0,0,0,.4);
  font-size: small;
}
</style>