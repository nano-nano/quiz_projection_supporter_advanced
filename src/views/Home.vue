<template>
  <div>
    <sui-button>Click Here</sui-button>
    <HelloWorld msg="あいうえお"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {
    // TODO:
  }
});
</script>
