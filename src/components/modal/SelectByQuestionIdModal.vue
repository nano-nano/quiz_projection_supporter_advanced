<template>
  <sui-modal v-model="isOpen" :closable="false" size="tiny">
    <sui-modal-header>選択したい問題IDを入力してください</sui-modal-header>
    <sui-modal-content>
      <sui-modal-description>
        <sui-input placeholder="問題ID..." v-model="refQuestionId" style='width: 100%;' />
        <div class="ui error message" v-if="refHasNotFoundError">
          存在しない問題IDが入力されています
        </div>
      </sui-modal-description>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button negative @click="onClickCancelBtn">キャンセル</sui-button>
      <sui-button positive @click="onClickOkBtn">選択する</sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

type Props = {
  isOpen: boolean;
  questionIdArray: string[];
  callback: (result: string) => void;
}

export default defineComponent({
  name: 'SelectByQuestionIdModal',
  props: {
    isOpen: Boolean,
    questionIdArray: Array,
    callback: Function
  },
  components: {
  },
  setup(props: Props) {
    const refQuestionId = ref('');
    const refHasNotFoundError = ref(false);

    const onClickOkBtn = () => {
      if (props.questionIdArray.includes(refQuestionId.value)) {
        // 問題IDが存在する
        refHasNotFoundError.value = false;
        props.callback(refQuestionId.value);
        refQuestionId.value = '';
      } else {
        // 存在しない
        refHasNotFoundError.value = true;
      }
    }
    const onClickCancelBtn = () => {
      props.callback('');
      refHasNotFoundError.value = false;
      refQuestionId.value = '';
    }
    return {
      refQuestionId,
      refHasNotFoundError,
      onClickOkBtn,
      onClickCancelBtn
    }
  }
});
</script>

<style scoped>
</style>