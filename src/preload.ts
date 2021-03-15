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
            ipcRenderer.on(IpcChannel.SEND_OPEN_PROJECTION_SETTINGS_MODAL, () => {
                callback();
            });
        },
        getProjectionSettings: () => {
            ipcRenderer.invoke(IpcChannel.GET_PROJECTION_SETTINGS, null);
        },
        sendProjectionSettings: (val: any) => {
            ipcRenderer.invoke(IpcChannel.SEND_PROJECTION_SETTINGS, val);
        },
        receiveProjectionSettings: (callback: (val: any) => void) => {
            ipcRenderer.on(IpcChannel.GET_PROJECTION_SETTINGS, (_: any, arg: any) => {
                callback(arg);
            });            
        },
        receiveOpenImportQuizDataModal: (callback: () => void) => {
            ipcRenderer.on(IpcChannel.SEND_OPEN_IMPORT_QUIZ_DATA_MODAL, () => {
                callback();
            });
        },
        sendFileOpenDialog: () => {
            ipcRenderer.invoke(IpcChannel.SEND_FILE_OPEN_DIALOG, null);
        },
        receiveFileOpenDialogResult: (callback: (val: any) => void) => {
            ipcRenderer.on(IpcChannel.RECEIVE_FILE_OPEM_DIALOG_RESULT, (_: any, arg: any) => {
                callback(arg);
            });
        },
        loadQuizData: (val1: string, val2: string) => {
            ipcRenderer.invoke(IpcChannel.LOAD_QUIZ_DATA, { filePath: val1, password: val2 });
        },
        receiveLoadQuizData: (callback: (val: any) => void) => {
            ipcRenderer.on(IpcChannel.LOAD_QUIZ_DATA, (_: any, arg: any) => {
                callback(arg);
            });
        }
    }
  );