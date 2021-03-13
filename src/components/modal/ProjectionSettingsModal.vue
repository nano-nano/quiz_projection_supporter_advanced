<template>
  <sui-modal v-model="isOpen" :closable="false" size="tiny">
    <sui-modal-header>投影設定</sui-modal-header>
    <sui-modal-content>
      <sui-form-field>
        <label>問題文テキストサイズ</label>
        <sui-input type="number" style="width: 100%;" placeholder="数値入力..." v-model="refSettings.questionFontSize"/>
      </sui-form-field>
      <sui-form-field>
        <label>模範解答テキストサイズ</label>
        <sui-input type="number" style="width: 100%;" placeholder="数値入力..." v-model="refSettings.answerFontSize" />
      </sui-form-field>
      <sui-form-field>
        <label>別解テキストサイズ</label>
        <sui-input type="number" style="width: 100%;" placeholder="数値入力..." v-model="refSettings.anotherAnswerFontSize" />
      </sui-form-field>
      <sui-form-field>
        <label>問題文－模範解答間の枠位置</label>
        <sui-input type="number" style="width: 100%;" placeholder="数値入力..." v-model="refSettings.questionAnswerSeparatePosition" />
      </sui-form-field>
      <sui-form-field>
        <label>テキストカラー</label>
        <ColorPicker
          :initColor="refSettings.textColor"
          :onClickPickerBtn="onClickTextColorPickerButton"
          :onChange="onChangeTextColor"
          :disabled="refIsOpenBackgroundColorPicker || refIsOpenFrameColorPicker" />
      </sui-form-field>
      <sui-form-field>
        <label>テキスト背景カラー</label>
        <ColorPicker
          pickerPos="upper"
          :initColor="refSettings.backgroundColor"
          :onClickPickerBtn="onClickBackgroundColorPickerButton"
          :onChange="onChangeBackgroundColor"
          :disabled="refIsOpenTextColorPicker || refIsOpenFrameColorPicker" />
      </sui-form-field>
      <sui-form-field>
        <label>枠カラー</label>
        <ColorPicker
          pickerPos="upper"
          :initColor="refSettings.frameColor"
          :onClickPickerBtn="onClickFrameColorPickerButton"
          :onChange="onChangeFrameColor"
          :disabled="refIsOpenTextColorPicker || refIsOpenBackgroundColorPicker" />
      </sui-form-field>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button positive :disabled="isPickerOpened" @click="onClickCloseBtn">閉じる</sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import { ProjectionSettings } from '@/models';
import ColorPicker from './ColorPicker.vue';

type Props = {
  isOpen: boolean;
  settings: ProjectionSettings;
  closeCallback: () => void;
}

export default defineComponent({
  name: 'ProjectionSettingsModal',
  props: {
    isOpen: Boolean,
    settings: Object,
    closeCallback: Function,
  },
  components: {
    ColorPicker
  },
  setup(props: Props) {
    const refSettings = ref(props.settings);
    const refIsOpenTextColorPicker = ref(false);
    const refIsOpenBackgroundColorPicker = ref(false);
    const refIsOpenFrameColorPicker = ref(false);

    // == computed ==

    const isPickerOpened = computed(() => 
      refIsOpenTextColorPicker.value || refIsOpenBackgroundColorPicker.value || refIsOpenFrameColorPicker.value);

    // == watch ==

    watch(refSettings.value, () => window.ipcApi.sendProjectionSettings(refSettings.value));

    // == methods ==

    const onClickCloseBtn = () => {
      props.closeCallback();
    }

    // == callback ==

    const onClickTextColorPickerButton = (isOpen: boolean) => {
      refIsOpenTextColorPicker.value = isOpen;
    }
    const onClickBackgroundColorPickerButton = (isOpen: boolean) => {
      refIsOpenBackgroundColorPicker.value = isOpen;
    }
    const onClickFrameColorPickerButton = (isOpen: boolean) => {
      refIsOpenFrameColorPicker.value = isOpen;
    }

    const onChangeTextColor = (newVal: string) => {
      refSettings.value.textColor = newVal;
    }
    const onChangeBackgroundColor = (newVal: string) => {
      refSettings.value.backgroundColor = newVal;
    }
    const onChangeFrameColor = (newVal: string) => {
      refSettings.value.frameColor = newVal;
    }

    return {
      refSettings,
      refIsOpenTextColorPicker,
      refIsOpenBackgroundColorPicker,
      refIsOpenFrameColorPicker,
      isPickerOpened,
      onClickCloseBtn,
      onClickTextColorPickerButton,
      onClickBackgroundColorPickerButton,
      onClickFrameColorPickerButton,
      onChangeTextColor,
      onChangeBackgroundColor,
      onChangeFrameColor
    }
  }
});
</script>

<style scoped>
</style>