<template>
  <div class="root">
    <!-- 現在表示中問題エリア -->
    <div class="row" style="height: 27vh;">
      <QuizCard style="width: 60vw;" label="現在表示中の問題" :quiz="quiz" />
    </div>
    <div class="row">
      <h1><i class="angle double up icon"></i></h1>
    </div>
    <!-- 表示候補問題エリア -->
    <div class="row" style="height: 27vh; justify-content: space-around;">
      <QuizCard label="ひとつ前" :quiz="quiz" isSummary />
      <QuizCard style="width: 35vw;" label="次表示候補問題" :quiz="quiz" isSummary />
      <QuizCard label="ひとつ次" :quiz="quiz" isSummary />
    </div>
    <!-- オペレーションエリア -->
    <div>
      <div class="row operation" style="justify-content: space-around;">
        <sui-button size="massive" icon="left arrow" label-position="left">前の問題</sui-button>
        <sui-button primary size="massive">投影画面へ表示する</sui-button>
        <sui-button size="massive" icon="right arrow" label-position="right">次の問題</sui-button>
      </div>
      <div class="row operation">
        <sui-button size="large">投影画面の表示を消す</sui-button>
        <sui-button size="large">問題IDで選択する</sui-button>
      </div>
      <div class="row operation">
        <sui-checkbox class="checkbox" label="別解を表示" />
        <sui-checkbox class="checkbox" label="問題IDを表示" />
        <sui-checkbox class="checkbox" label="問題選択をループする" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { QuizData } from '@/models';
import QuizCard from '@/components/QuizCard.vue';

export default defineComponent({
  name: 'Home',
  components: {
    QuizCard
  },
  setup() {
    // TODO:
    const quiz = {
      id: '99999',
      question: '問題文＊＊＊＊＊＊＊あいうえおかきくけこあいうえおかきくけこあいうえおかきくけこ問題文＊＊＊＊＊＊＊あいうえおかきくけこあいうえおかきくけこあいうえおかきくけこ',
      answer: '模範解答＊＊＊＊＊＊あいうえおかきくけこあいうえおかきくけこあいうえおかきくけこんんんんん',
      anotherAnswer: '別解＊＊＊＊＊＊＊＊あいうえおかきくけこあいうえおかきくけこあいうえおかきくけこんんんんん'
    } as QuizData;

    return {
      quiz
    }
  }
});
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.row {
  display: flex;
  justify-content: center;
  width: 100vw;
  margin: 6px auto;
}
.row.operation {
  margin: 18px auto;
}

.checkbox {
  margin: 0 20px;
}
.ui.checkbox label {
  font-size: medium; 
}
.ui.button {
  margin: 0 0.2rem;
}
</style>