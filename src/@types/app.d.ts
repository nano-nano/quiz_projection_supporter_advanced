interface Window {
    ipcApi: IpcApi;
}
declare module 'semantic-ui-vue';
declare const __static: string;

type IpcApi = {
    sendQuizData: (quiz: any) => void
    receiveQuizData: (callback: (quiz: any) => void) => void
}