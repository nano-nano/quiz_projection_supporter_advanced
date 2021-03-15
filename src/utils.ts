import { QuizData } from "./models";
import xlsx from 'xlsx-populate';

const longestTextSample = 'これはサンプル問題文・サンプル解答文です。問題ID: MAXの問題文には読み込まれた問題のうち最大字数相当の長さの文章が、解答文には読み込まれた解答のうち最大字数相当の長さの文章が自動的に設定されます。この最大字数の問題および解答がウィンドウ内で表示されるように、文字サイズや問題・解答の境界を調節してください。このサンプル問題およびサンプル解答を活用することで、表示テストを行うと同時に文字サイズや境界の調整を行いやすくなっています。投影の前にサンプル問題文およびサンプル解答を上手に活用ください。';

const formatImportedText = (target: any) => {
    if (Array.isArray(target)) {
      // セル内の文字の一部に書式が設定されているような場合、こちらのフローに入る
      return target.filter(prop => prop.name === 'r').map(r => r.children.filter((prop: any) => prop.name === 't')[0].children[0]).join('');
    } else {
      return target;
    }
  }
  
  const createQuizData = (idCellInfo: any) => {
    return {
      id: idCellInfo.value(),
      question: formatImportedText(idCellInfo.relativeCell(0, 1).value()),
      answer: formatImportedText(idCellInfo.relativeCell(0, 2).value()),
      anotherAnswer: formatImportedText(
        (idCellInfo.relativeCell(0, 3).value() || idCellInfo.relativeCell(0, 3).value() === 0) ? idCellInfo.relativeCell(0, 3).value() : ''
      )
    } as QuizData;
  }
  
  const createLongestSampleQuizData = (quizDataArray: QuizData[]) => {
    let longestQuestionLength = 0;
    let longestAnswerLength = 0;
    for (const quizData of quizDataArray) {
      if (longestQuestionLength < quizData.question.length) {
        longestQuestionLength = quizData.question.length;
      }
      if (longestAnswerLength < quizData.answer.length) {
        longestAnswerLength = quizData.answer.length;
      }
    }
    // 文字数確認用サンプルは必ず問題データの先頭に追加する
    quizDataArray.unshift({
      id: 'MAX',
      question: longestTextSample.substr(0, longestQuestionLength),
      answer: longestTextSample.substr(0, longestAnswerLength),
      anotherAnswer: ''
    });
  }

export default class Utils {

    static async createQuizDataArray (filePath: string, password: string) {
        const quizDataArray: QuizData[] = [];
        const workbook = await xlsx.fromFileAsync(filePath, { password: password });
        // 1枚目のシートを参照する
        const sheet = workbook.sheet(0)
        let idCellInfo = sheet.cell('A2');
        while (idCellInfo.value() || idCellInfo.value() === 0) {
          // 問題ID列に空セル(undefined)が現れるまでループ
          // undefinedはfalseを返すことを利用している（ただし、0もfalseを返してしまうので例外処理を追加）
          quizDataArray.push(createQuizData(idCellInfo));
          idCellInfo = idCellInfo.relativeCell(1, 0);
        }
      
        // 文字数確認用サンプル作成
        createLongestSampleQuizData(quizDataArray);
        return quizDataArray;
      }
}


