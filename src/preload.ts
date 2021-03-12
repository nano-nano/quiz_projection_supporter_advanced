import { contextBridge, ipcRenderer } from 'electron';
import { IpcChannel } from './constants'

contextBridge.exposeInMainWorld(
    'ipcApi', {
        sendQuizData: (quiz: any) => {
            ipcRenderer.invoke(IpcChannel.SEND_QUIZ_DATA, quiz);
        },
        receiveQuizData: (callback: (quiz: any) => void) => {
            ipcRenderer.on(IpcChannel.SEND_QUIZ_DATA, (_: any, arg: any) => {
                callback(arg);
            });
        },
        sendChangingIsShowQuestionId: (val: any) => {
            ipcRenderer.invoke(IpcChannel.SEND_IS_SHOW_QUESTION_ID, val);
        },
        receiveChangingIsShowQuestionId: (callback: (val: any) => void) => {
            ipcRenderer.on(IpcChannel.SEND_IS_SHOW_QUESTION_ID, (_: any, arg: any) => {
                callback(arg);
            });
        },
        sendChangingIsShowAnotherAnswer: (val: any) => {
            ipcRenderer.invoke(IpcChannel.SEND_IS_SHOW_ANOTHER_ANSWER, val);
        },
        receiveChangingIsShowAnotherAnswer: (callback: (val: any) => void) => {
            ipcRenderer.on(IpcChannel.SEND_IS_SHOW_ANOTHER_ANSWER, (_: any, arg: any) => {
                callback(arg);
            });
        },
        receiveOpenProjectionSettingsModal: (callback: () => void) => {
            ipcRenderer.on(IpcChannel.SEND_OPEN_PROJECTION_SETTINGS_MODAL, (_1: any, _2: any) => {
                callback();
            });
        },
    }
  );