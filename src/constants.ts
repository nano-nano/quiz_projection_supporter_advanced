import { ProjectionSettings, QuizData } from "./models";

export enum IpcChannel {
    SEND_QUIZ_DATA = 'send_quiz_data',
    SEND_IS_SHOW_QUESTION_ID = 'send_is_show_question_id',
    SEND_IS_SHOW_ANOTHER_ANSWER = 'send_is_show_another_answer',
    SEND_OPEN_PROJECTION_SETTINGS_MODAL = 'send_open_projection_settings_modal',
    GET_PROJECTION_SETTINGS = 'get_projection_settings',
    SEND_PROJECTION_SETTINGS = 'send_projection_setting',
    SEND_OPEN_IMPORT_QUIZ_DATA_MODAL = 'send_open_import_quiz_data_modal',
    SEND_FILE_OPEN_DIALOG = 'send_file_open_dialog',
    RECEIVE_FILE_OPEM_DIALOG_RESULT = 'receive_file_open_dialog_result',
    LOAD_QUIZ_DATA = 'load_quiz_data'
}

export const EMPTY_QUIZ_DATA = {
    id: '',
    question: '',
    answer: '',
    anotherAnswer: ''
} as QuizData;

export const EMPTY_QUIZ_DATA_WITH_HYPHEN = {
    id: '---',
    question: '---',
    answer: '---',
    anotherAnswer: '---'
} as QuizData;

export const DEFAULT_SETTINGS = {
    questionFontSize: 50,
    answerFontSize: 40,
    anotherAnswerFontSize: 30,
    textColor: '#000000FF',
    backgroundColor: '#FFFFFFFF',
    frameColor: '#000000FF',
    questionAnswerSeparatePosition: 60
} as ProjectionSettings;