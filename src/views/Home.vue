<template>
  <div class="root">
    <!-- 現在表示中問題エリア -->
    <div class="row" style="height: 27vh;">
      <QuizCard style="width: 60vw;" label="現在表示中問題" :quiz="currentDisplayedQuiz" />
    </div>
    <div class="row">
      <h1><i class="angle double up icon"></i></h1>
    </div>
    <!-- 表示候補問題エリア -->
    <div class="row" style="height: 27vh; justify-content: space-around;">
      <QuizCard label="ひとつ前" :quiz="prevCandidateQuiz" isSummary />
      <QuizCard style="width: 35vw;" label="次表示候補問題" :quiz="currentCandidateQuiz" isSummary />
      <QuizCard label="ひとつ次" :quiz="nextCandidateQuiz" isSummary />
    </div>
    <!-- オペレーションエリア -->
    <div>
      <div class="row operation" style="justify-content: space-around;">
        <sui-button size="massive" icon="left arrow" label-position="left" :disabled="isQuizDataNotLoaded" @click="onClickPrevBtn">前の問題</sui-button>
        <sui-button primary size="massive" :disabled="isQuizDataNotLoaded" @click="onClickDisplayBtn">投影画面へ表示する</sui-button>
        <sui-button size="massive" icon="right arrow" label-position="right" :disabled="isQuizDataNotLoaded" @click="onClickNextBtn">次の問題</sui-button>
      </div>
      <div class="row operation">
        <sui-button size="large" :disabled="isQuizDataNotLoaded" @click="onClickEraseBtn">投影画面の表示を消す</sui-button>
        <sui-button size="large" :disabled="isQuizDataNotLoaded">問題IDで選択する</sui-button>
      </div>
      <div class="row operation">
        <sui-checkbox class="checkbox" label="別解を表示" />
        <sui-checkbox class="checkbox" label="問題IDを表示" />
        <sui-checkbox class="checkbox" label="問題選択をループする" v-model="refCanLoopQuizSelect" />
      </div>
    </div>

    <ConfirmDisplayModal :isOpen="refIsConfirmDialogOpened" :quiz="currentCandidateQuiz" :callback="callbackCOnfirmDisplayModal" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { QuizData } from '@/models';
import QuizCard from '@/components/QuizCard.vue';
import ConfirmDisplayModal, { ConfirmDisplayModalResult } from '@/components/modal/ConfirmDisplayModal.vue';

import { MockQuizDataArray } from '@/mocks';

const EMPTY_QUIZ_DATA = {
  id: '',
  question: '',
  answer: '',
  anotherAnswer: ''
} as QuizData
const EMPTY_QUIZ_DATA_WITH_HYPHEN = {
  id: '---',
  question: '---',
  answer: '---',
  anotherAnswer: '---'
} as QuizData

export default defineComponent({
  name: 'Home',
  components: {
    QuizCard,
    ConfirmDisplayModal
  },
  setup() {
    /** クイズデータ配列 */
    const refQuizDataArray = ref([] as QuizData[]);
    /** 現在表示中問題index（非表示時はnull） */
    const refCurrentDisplayedIdx = ref(null as number | null)
    /** 次表示候補問題index */
    const refNextCandidateIdx = ref(0);
    /** 問題選択ループフラグ */
    const refCanLoopQuizSelect = ref(false);

    const refIsConfirmDialogOpened = ref(false);

    // == computed ==

    const isQuizDataNotLoaded = computed(() => refQuizDataArray.value.length == 0);

    const currentDisplayedQuiz = computed(() => {
      return refCurrentDisplayedIdx.value == null ? EMPTY_QUIZ_DATA : refQuizDataArray.value[refCurrentDisplayedIdx.value];
    });
    const currentCandidateQuiz = computed(() => {
      return refQuizDataArray.value.length == 0 ? EMPTY_QUIZ_DATA_WITH_HYPHEN : refQuizDataArray.value[refNextCandidateIdx.value];
    });
    const nextCandidateQuiz = computed(() => {
      if (refQuizDataArray.value.length == 0) return EMPTY_QUIZ_DATA_WITH_HYPHEN;
  
      const nextIdx = refNextCandidateIdx.value + 1;
      if (nextIdx == refQuizDataArray.value.length) {
        if (refCanLoopQuizSelect.value) {
          // ループ設定が有効: 配列先頭の値
          return refQuizDataArray.value[0];
        } else {
          // ループ設定が無効: 非表示
          return EMPTY_QUIZ_DATA_WITH_HYPHEN;
        }
      }
      return refQuizDataArray.value[nextIdx];
    });
    const prevCandidateQuiz = computed(() => {
      if (refQuizDataArray.value.length == 0) return EMPTY_QUIZ_DATA_WITH_HYPHEN;
  
      const prevIdx = refNextCandidateIdx.value - 1;
      if (prevIdx < 0) {
        if (refCanLoopQuizSelect.value) {
          // ループ設定が有効: 配列末尾の値
          return refQuizDataArray.value[refQuizDataArray.value.length - 1];
        } else {
          // ループ設定が無効: 非表示
          return EMPTY_QUIZ_DATA_WITH_HYPHEN;
        }
      }
      return refQuizDataArray.value[prevIdx];
    });

    // == methods ==

    const onClickNextBtn = () => {
      if (refQuizDataArray.value.length == 0) return;

      let nextIdx = refNextCandidateIdx.value + 1;
      if (nextIdx == refQuizDataArray.value.length) {
        if (refCanLoopQuizSelect.value) {
          // ループ設定が有効: 配列の先頭
          nextIdx = 0;
        } else {
          // ループ設定が無効: 値はそのまま
          nextIdx = refNextCandidateIdx.value;
        }
      }
      refNextCandidateIdx.value = nextIdx;
    }
    const onClickPrevBtn = () => {
      if (refQuizDataArray.value.length == 0) return;

      let prevIdx = refNextCandidateIdx.value - 1;
      if (prevIdx < 0) {
        if (refCanLoopQuizSelect.value) {
          // ループ設定が有効: 配列の末尾
          prevIdx = refQuizDataArray.value.length - 1;
        } else {
          // ループ設定が無効: 値はそのまま
          prevIdx = refNextCandidateIdx.value;
        }
      }
      refNextCandidateIdx.value = prevIdx;
    }
    const onClickDisplayBtn = () => {
      // 確認ダイアログの表示
      refIsConfirmDialogOpened.value = true;
    }
    const onClickEraseBtn = () => {
      refCurrentDisplayedIdx.value = null;
    }

    // == callbacks ==

    const callbackCOnfirmDisplayModal = (result: ConfirmDisplayModalResult) => {
      refIsConfirmDialogOpened.value = false;
      if (result == ConfirmDisplayModalResult.OK) {
        refCurrentDisplayedIdx.value = refNextCandidateIdx.value;
      }
    }

    // XXX: ダミー実装
    refQuizDataArray.value = [...refQuizDataArray.value, ...MockQuizDataArray]

    return {
      isQuizDataNotLoaded,
      currentDisplayedQuiz,
      currentCandidateQuiz,
      nextCandidateQuiz,
      prevCandidateQuiz,
      refCanLoopQuizSelect,
      refIsConfirmDialogOpened,
      onClickNextBtn,
      onClickPrevBtn,
      onClickDisplayBtn,
      onClickEraseBtn,
      callbackCOnfirmDisplayModal
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