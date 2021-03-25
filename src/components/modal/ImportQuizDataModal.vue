<template>
  <sui-modal v-model="isOpen" :closable="false" size="small">
    <sui-modal-header
      @dragover.prevent="refIsDragging = true"
      @dragleave.prevent="refIsDragging = false"
      @drop.prevent="onDropFile"
    >問題ファイルを選択してください（ここへのドラッグ＆ドロップも可）</sui-modal-header>
    <sui-modal-content
      @dragover.prevent="refIsDragging = true"
      @dragleave.prevent="refIsDragging = false"
      @drop.prevent="onDropFile"
    >
      <sui-form-field>
        <label>問題ファイルのパス</label>
        <div class="ui action input" style="width: 100%;">
          <input type="text" placeholder="ファイルパス..." v-model="refFilePath" />
          <sui-button @click="onClickSelectFileBtn">ファイル選択</sui-button>
        </div>
      </sui-form-field>
      <sui-form-field>
        <label>ファイルのパスワード</label>
        <sui-input type="text" style="width: 100%;" placeholder="ない場合は空欄..." v-model="refFilePass" />
      </sui-form-field>
      <div class="ui error message" v-if="refHasFileLoadError">
        ファイルの読み込みに失敗しました。<br />
        ファイルパス、パスワード、ファイル内容を確認してください。
      </div>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button negative :disabled="refIsDragging" @click="onClickCancelBtn">キャンセル</sui-button>
      <sui-button positive :disabled="refIsDragging" @click="onClickOkBtn">問題を読み込む</sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script lang="ts">
import { QuizData } from '@/models';
import { defineComponent, ref } from '@vue/composition-api';

type Props = {
  isOpen: boolean;
  closeCallback: (result: QuizData[] | null) => void;
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
    const refFilePath = ref('');
    const refFilePass = ref('');
    const refHasFileLoadError = ref(false);
    const refIsDragging = ref(false);

    const onClickSelectFileBtn = () => window.ipcApi.sendFileOpenDialog();
    const onClickOkBtn = () => {
      refHasFileLoadError.value = false;
      window.ipcApi.loadQuizData(refFilePath.value, refFilePass.value);
    };
    const onClickCancelBtn = () => {
      props.closeCallback(null);
      refHasFileLoadError.value = false;
    };

    const onDropFile = (event: DragEvent) => {
      refIsDragging.value = false;
      if (!event || !event.dataTransfer || event.dataTransfer.files.length === 0) {
        return;
      }
      const path = event.dataTransfer.files[0].path;
      if (!path.endsWith('xls') && !path.endsWith('xlsx')) {
        return;
      }
      refFilePath.value = path;
    }

    window.ipcApi.receiveFileOpenDialogResult((filePath: string) => {
      refFilePath.value = filePath;
    });
    window.ipcApi.receiveLoadQuizData(result => {
      if (result.isSuccess) {
        props.closeCallback(result.data);
      } else {
        refHasFileLoadError.value = true;
      }
    });

    return {
      refFilePath,
      refFilePass,
      refHasFileLoadError,
      refIsDragging,
      onClickSelectFileBtn,
      onClickOkBtn,
      onClickCancelBtn,
      onDropFile
    }
  }
});
</script>

<style scoped>
</style>