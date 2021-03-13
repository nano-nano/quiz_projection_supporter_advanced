<template>
  <sui-modal v-model="isOpen" :closable="false" size="small">
    <sui-modal-header>問題ファイルを選択してください</sui-modal-header>
    <sui-modal-content>
      <sui-form-field>
        <label>問題ファイルのパス</label>
        <div class="ui action input" style="width: 100%;">
          <input type="text" placeholder="ファイルパス...">
          <sui-button>ファイル選択</sui-button>
        </div>
      </sui-form-field>
      <sui-form-field>
        <label>ファイルのパスワード</label>
        <sui-input type="text" style="width: 100%;" placeholder="ない場合は空欄..." />
      </sui-form-field>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button negative @click="onClickCancelBtn">キャンセル</sui-button>
      <sui-button positive @click="onClickOkBtn">問題を読み込む</sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

type Props = {
  isOpen: boolean;
  closeCallback: () => void;
}

export default defineComponent({
  name: 'ImportQuizDataModal',
  props: {
    isOpen: Boolean,
    closeCallback: Function
  },
  components: {
  },
  setup(props: Props) {

    const onClickOkBtn = () => {
      props.closeCallback();
    }
    const onClickCancelBtn = () => {
      props.closeCallback();

    }
    return {
      onClickOkBtn,
      onClickCancelBtn
    }
  }
});
</script>

<style scoped>
</style>