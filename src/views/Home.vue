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
        <sui-button size="large" :disabled="isQuizDataNotLoaded" @click="onClickSelectByQuestionIdBtn">問題IDで選択する</sui-button>
      </div>
      <div class="row operation">
        <sui-checkbox class="checkbox" label="別解を表示" v-model="refIsShowAnotherAnswer" />
        <sui-checkbox class="checkbox" label="問題IDを表示" v-model="refIsShowQuestionId" />
        <sui-checkbox class="checkbox" label="問題選択をループする" v-model="refCanLoopQuizSelect" />
      </div>
    </div>

    <ConfirmDisplayModal :isOpen="refIsConfirmModalOpened" :quiz="currentCandidateQuiz" :callback="callbackConfirmDisplayModal" />
    <SelectByQuestionIdModal :isOpen="refIsSelectByQuestionIdModalOpened" :questionIdArray="questionIdArray" :callback="callbackSelectByQuestionIdModal" />
    <ProjectionSettingsModal
      :isOpen="refIsProjectionSettingsModalOpened"
      :settings="refProjectionSettings" 
      :closeCallback="callbackProjectionSettingsCloseModal" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from '@vue/composition-api';
import { QuizData } from '@/models';
import QuizCard from '@/components/QuizCard.vue';
import ConfirmDisplayModal, { ConfirmDisplayModalResult } from '@/components/modal/ConfirmDisplayModal.vue';
import SelectByQuestionIdModal from '@/components/modal/SelectByQuestionIdModal.vue';
import ProjectionSettingsModal from '@/components/modal/ProjectionSettingsModal.vue';

import { MockQuizDataArray } from '@/mocks';
import { DEFAULT_SETTINGS, EMPTY_QUIZ_DATA, EMPTY_QUIZ_DATA_WITH_HYPHEN } from '@/constants';

export default defineComponent({
  name: 'Home',
  components: {
    QuizCard,
    ConfirmDisplayModal,
    SelectByQuestionIdModal,
    ProjectionSettingsModal
  },
  setup() {
    /** クイズデータ配列 */
    const refQuizDataArray = ref([] as QuizData[]);
    /** 現在表示中問題index（非表示時はnull） */
    const refCurrentDisplayedIdx = ref(null as number | null)
    /** 次表示候補問題index */
    const refNextCandidateIdx = ref(0);
    /** 別解表示チェックボックス状態 */ 
    const refIsShowAnotherAnswer = ref(false);
    /** 問題ID表示チェックボックス状態 */ 
    const refIsShowQuestionId = ref(false);
    /** 問題選択ループチェックボックス状態 */ 
    const refCanLoopQuizSelect = ref(false);
    /** 投影設定 */
    const refProjectionSettings = ref(DEFAULT_SETTINGS);

    /** 投影確認モーダルの表示状態 */
    const refIsConfirmModalOpened = ref(false);
    /** 問題ID選択モーダルの表示状態 */
    const refIsSelectByQuestionIdModalOpened = ref(false);
    /** 投影設定モーダルの表示状態 */
    const refIsProjectionSettingsModalOpened = ref(false);

    window.ipcApi.receiveProjectionSettings((newVal) => {
      refProjectionSettings.value = newVal;
    });
    window.ipcApi.receiveOpenProjectionSettingsModal(() => {
      refIsProjectionSettingsModalOpened.value = true;
    });

    onMounted(() => {
      window.ipcApi.getProjectionSettings();
    });

    // == watch ==

    watch(refIsShowAnotherAnswer, (newVal) => {
      window.ipcApi.sendChangingIsShowAnotherAnswer(newVal);
    });
    watch(refIsShowQuestionId, (newVal) => {
      window.ipcApi.sendChangingIsShowQuestionId(newVal);
    });

    // == computed ==

    /** クイズデータが読み込まれているか */
    const isQuizDataNotLoaded = computed(() => refQuizDataArray.value.length == 0);
    const questionIdArray = computed(() => refQuizDataArray.value.map((e) => e.id));

    const currentDisplayedQuiz = computed(() => {
      return refCurrentDisplayedIdx.value == null ? EMPTY_QUIZ_DATA_WITH_HYPHEN : refQuizDataArray.value[refCurrentDisplayedIdx.value];
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
      refIsConfirmModalOpened.value = true;
    }
    const onClickEraseBtn = () => {
      refCurrentDisplayedIdx.value = null;
      window.ipcApi.sendQuizData(EMPTY_QUIZ_DATA);
    }
    const onClickSelectByQuestionIdBtn = () => {
      refIsSelectByQuestionIdModalOpened.value = true;
    }

    // == callbacks ==

    const callbackConfirmDisplayModal = (result: ConfirmDisplayModalResult) => {
      refIsConfirmModalOpened.value = false;
      if (result == ConfirmDisplayModalResult.OK) {
        refCurrentDisplayedIdx.value = refNextCandidateIdx.value;
        window.ipcApi.sendQuizData(currentDisplayedQuiz.value);
      }
    }
    const callbackSelectByQuestionIdModal = (result: string) => {
      refIsSelectByQuestionIdModalOpened.value = false;
      const index = refQuizDataArray.value.findIndex((e) => e.id == result);
      if (index != -1) refNextCandidateIdx.value = index;
    }
    const callbackProjectionSettingsCloseModal = () => {
      refIsProjectionSettingsModalOpened.value = false;
    }

    // XXX: ダミー実装
    refQuizDataArray.value = [...refQuizDataArray.value, ...MockQuizDataArray]

    return {
      isQuizDataNotLoaded,
      questionIdArray,
      currentDisplayedQuiz,
      currentCandidateQuiz,
      nextCandidateQuiz,
      prevCandidateQuiz,
      refIsShowAnotherAnswer,
      refIsShowQuestionId,
      refCanLoopQuizSelect,
      refProjectionSettings,
      refIsConfirmModalOpened,
      refIsSelectByQuestionIdModalOpened,
      refIsProjectionSettingsModalOpened,
      onClickNextBtn,
      onClickPrevBtn,
      onClickDisplayBtn,
      onClickEraseBtn,
      onClickSelectByQuestionIdBtn,
      callbackConfirmDisplayModal,
      callbackSelectByQuestionIdModal,
      callbackProjectionSettingsCloseModal
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