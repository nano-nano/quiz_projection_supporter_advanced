import { contextBridge, ipcRenderer } from 'electron';
import { IpcChannel } from './constants'
import { ProjectionSettings, QuizData, ReceiveLoadQuizDataResult } from './models';

contextBridge.exposeInMainWorld(
    'ipcApi', {
        sendQuizData: (quizData: QuizData) => {
            ipcRenderer.invoke(IpcChannel.SEND_QUIZ_DATA, quizData);
        },
        receiveQuizData: (callback: (quizData: QuizData) => void) => {
            ipcRenderer.on(IpcChannel.SEND_QUIZ_DATA, (_, arg) => callback(arg));
        },
        sendChangingIsShowQuestionId: (isShow: boolean) => {
            ipcRenderer.invoke(IpcChannel.SEND_IS_SHOW_QUESTION_ID, isShow);
        },
        receiveChangingIsShowQuestionId: (callback: (isShow: boolean) => void) => {
            ipcRenderer.on(IpcChannel.SEND_IS_SHOW_QUESTION_ID, (_, arg) => callback(arg));
        },
        sendChangingIsShowAnotherAnswer: (isShow: boolean) => {
            ipcRenderer.invoke(IpcChannel.SEND_IS_SHOW_ANOTHER_ANSWER, isShow);
        },
        receiveChangingIsShowAnotherAnswer: (callback: (isShow: boolean) => void) => {
            ipcRenderer.on(IpcChannel.SEND_IS_SHOW_ANOTHER_ANSWER, (_, arg: any) => callback(arg));
        },
        receiveOpenProjectionSettingsModal: (callback: () => void) => {
            ipcRenderer.on(IpcChannel.SEND_OPEN_PROJECTION_SETTINGS_MODAL, () => callback());
        },
        requestProjectionSettings: () => {
            ipcRenderer.invoke(IpcChannel.GET_PROJECTION_SETTINGS, null);
        },
        sendProjectionSettings: (projectionSettings: ProjectionSettings) => {
            ipcRenderer.invoke(IpcChannel.SEND_PROJECTION_SETTINGS, projectionSettings);
        },
        receiveProjectionSettings: (callback: (projectionSettings: ProjectionSettings) => void) => {
            ipcRenderer.on(IpcChannel.GET_PROJECTION_SETTINGS, (_, arg) => callback(arg));            
        },
        receiveOpenImportQuizDataModal: (callback: () => void) => {
            ipcRenderer.on(IpcChannel.SEND_OPEN_IMPORT_QUIZ_DATA_MODAL, () => callback());
        },
        sendFileOpenDialog: () => {
            ipcRenderer.invoke(IpcChannel.SEND_FILE_OPEN_DIALOG, null);
        },
        receiveFileOpenDialogResult: (callback: (filePath: string) => void) => {
            ipcRenderer.on(IpcChannel.RECEIVE_FILE_OPEM_DIALOG_RESULT, (_, arg) => callback(arg));
        },
        loadQuizData: (filePath: string, password: string) => {
            ipcRenderer.invoke(IpcChannel.LOAD_QUIZ_DATA, { filePath: filePath, password: password });
        },
        receiveLoadQuizData: (callback: (result: ReceiveLoadQuizDataResult) => void) => {
            ipcRenderer.on(IpcChannel.LOAD_QUIZ_DATA, (_, arg) => callback(arg));
        },
        receiveProjectionWindowClosed: (callback: () => void) => {
            ipcRenderer.on(IpcChannel.RECEIVE_PROJECTION_WINDOW_CLOSED, () => callback());
        }
    }
  );