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
        }
    }
  );