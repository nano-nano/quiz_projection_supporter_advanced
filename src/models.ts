/** 1問分のクイズを表現するモデル */
export type QuizData = {
    /** 問題ID */
    id: string;
    /** 問題文 */
    question: string;
    /** 模範解答 */
    answer: string;
    /** 別解 */
    anotherAnswer: string;
}

/** 投影設定を表現するモデル */
export type ProjectionSettings = {
    /** 問題文フォントサイズ */
    questionFontSize: number;
    /** 模範解答フォントサイズ */
    answerFontSize: number;
    /** 別解フォントサイズ */
    anotherAnswerFontSize: number;
    /** テキストカラー */
    textColor: string;
    /** テキスト背景カラー */
    backgroundColor: string;
    /** 枠カラー */
    frameColor: string;
    /** 問題文と模範解答を分ける枠の位置 */
    questionAnswerSeparatePosition: number;
}