interface Window {
    ipcApi: IpcApi;
}
declare module 'semantic-ui-vue';
declare module 'xlsx-populate';
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
    sendFileOpenDialog: () => void;
    receiveFileOpenDialogResult: (callback: (val: any) => void) => void;
    loadQuizData: (val1: any, val2: any) => void;
    receiveLoadQuizData: (callback: (val: any) => void) => void;
}