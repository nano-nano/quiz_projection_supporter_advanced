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