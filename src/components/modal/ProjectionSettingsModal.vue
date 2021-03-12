<template>
  <sui-modal v-model="isOpen" :closable="false" size="tiny">
    <sui-modal-header>投影設定</sui-modal-header>
    <sui-modal-content>
      <sui-form-field>
        <label>問題文テキストサイズ</label>
        <sui-input style="width: 100%;" placeholder="数値入力..." />
      </sui-form-field>
      <sui-form-field>
        <label>模範解答テキストサイズ</label>
        <sui-input style="width: 100%;" placeholder="数値入力..." />
      </sui-form-field>
      <sui-form-field>
        <label>別解テキストサイズ</label>
        <sui-input style="width: 100%;" placeholder="数値入力..." />
      </sui-form-field>
      <sui-form-field>
        <label>問題文－模範解答間の枠位置</label>
        <sui-input style="width: 100%;" placeholder="数値入力..." />
      </sui-form-field>
      <sui-form-field>
        <label>テキストカラー</label>
        <ColorPicker initColor="#000000FF" :onClickPickerBtn="onClickTextColorPickerButton" :onChange="onChangeTextColor" />
      </sui-form-field>
      <sui-form-field>
        <label>テキスト背景カラー</label>
        <ColorPicker :initColor="refSettings.backgroundColor" :onClickPickerBtn="onClickBackgroundColorPickerButton" :onChange="onChangeBackgroundColor" />
      </sui-form-field>
      <sui-form-field>
        <label>枠カラー</label>
        <ColorPicker initColor="#000000FF" :onClickPickerBtn="onClickFrameColorPickerButton" :onChange="onChangeFrameColor" />
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
  changeCallback: (result: ProjectionSettings) => void;
}

export default defineComponent({
  name: 'ProjectionSettingsModal',
  props: {
    isOpen: Boolean,
    settings: Object,
    closeCallback: Function,
    changeCallback: Function,
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
      props.changeCallback(refSettings.value);
    }
    const onChangeBackgroundColor = (newVal: string) => {
      refSettings.value.backgroundColor = newVal;
      props.changeCallback(refSettings.value);
    }
    const onChangeFrameColor = (newVal: string) => {
      refSettings.value.frameColor = newVal;
      props.changeCallback(refSettings.value);
    }

    return {
      refSettings,
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