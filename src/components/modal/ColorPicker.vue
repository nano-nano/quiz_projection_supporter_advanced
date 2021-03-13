<template>
  <div :style="{ display: 'flex', flexDirection: (pickerPos == 'lower' ? 'column' : 'column-reverse')}">
    <sui-button toggle style="width: 100%;" :disabled="disabled" :active="refIsShowColorPicker" @click="onClickBtn">色選択</sui-button>
    <Chrome v-if="refIsShowColorPicker" v-model="refColor" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import { Chrome } from 'vue-color';

type Props = {
  initColor: string;
  onClickPickerBtn: (isOpen: boolean) => void;
  onChange: (newVal: string) => void;
  pickerPos: 'upper' | 'lower';
  disabled: boolean;
}

export default defineComponent({
  name: 'ColorPicker',
  props: {
    initColor: String,
    onClickPickerBtn: Function,
    onChange: Function,
    pickerPos: {
      type: String,
      default: 'lower'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Chrome
  },
  setup(props: Props) {
    const refIsShowColorPicker = ref(false);
    const refColor = ref({ hex8: props.initColor });

    watch(refColor, (newVal) => props.onChange(newVal.hex8));

    const onClickBtn = () => {
      refIsShowColorPicker.value = !refIsShowColorPicker.value;
      props.onClickPickerBtn(refIsShowColorPicker.value);
    }

    return {
      refIsShowColorPicker,
      refColor,
      onClickBtn
    }
  }
});
</script>

<style scoped>
.vc-chrome {
	position: absolute;
	z-index: 10;
}
</style>