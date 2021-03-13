interface Window {
    ipcApi: IpcApi;
}
declare module 'semantic-ui-vue';
declare const __static: string;

type IpcApi = {
    sendQuizData: (quiz: any) => void;
    receiveQuizData: (callback: (quiz: any) => void) => void;
    sendChangingIsShowQuestionId: (val: any) => void;
    receiveChangingIsShowQuestionId: (callback: (val: any) => void) => void;
    sendChangingIsShowAnotherAnswer: (val: any) => void;
    receiveChangingIsShowAnotherAnswer: (callback: (val: any) => void) => void;
    receiveOpenProjectionSettingsModal: (callback: () => void) => void;
    getProjectionSettings: () => void;
    sendProjectionSettings: (val: any) => void;
    receiveProjectionSettings: (callback: (val: any) => void) => void;
    receiveOpenImportQuizDataModal: (callback: () => void) => void;
}