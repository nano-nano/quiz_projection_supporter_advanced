import { QuizData, ProjectionSettings, ReceiveLoadQuizDataResult } from '../models';

declare global {
    interface Window {
        ipcApi: IpcApi;
    }
    const __static: string;
}

type IpcApi = {
    /**
     * クイズデータをIPCへ送信する
     * @param quizData 1問分のクイズデータモデル
     */
    sendQuizData: (quizData: QuizData) => void;
    /**
     * IPCに送信されたクイズデータを受け取る
     * @param callback 1問分のクイズデータを受け取るコールバック
     */
    receiveQuizData: (callback: (quizData: QuizData) => void) => void;
    /**
     * 問題ID表示フラグ変更通知をIPCへ送信する
     * @param isShow 表示フラグの変更結果（true: 表示する）
     */
    sendChangingIsShowQuestionId: (isShow: boolean) => void;
    /**
     * IPCに送信された問題ID表示フラグ変更通知を受け取る
     * @param callback 表示フラグの変更結果を受け取るコールバック
     */
    receiveChangingIsShowQuestionId: (callback: (isShow: boolean) => void) => void;
    /**
     * 別解表示フラグ変更通知をIPCへ送信する
     * @param isShow 表示フラグの変更結果（true: 表示する）
     */
    sendChangingIsShowAnotherAnswer: (isShow: boolean) => void;
    /**
     * IPCに送信された別解表示フラグ変更通知を受け取る
     * @param callback 表示フラグの変更結果を受け取るコールバック
     */
    receiveChangingIsShowAnotherAnswer: (callback: (isShow: boolean) => void) => void;
    /**
     * IPCから送信された投影設定モーダル表示通知を受け取る
     * @param callback 表示通知を受け取るコールバック
     */
    receiveOpenProjectionSettingsModal: (callback: () => void) => void;
    /**
     * 現在の投影設定データをリクエストする
     */
    requestProjectionSettings: () => void;
    /**
     * 投影設定データをIPCへ送信する
     * @param projectionSettings 投影設定データ
     */
    sendProjectionSettings: (projectionSettings: ProjectionSettings) => void;
    /**
     * IPCから送信された投影設定データを受け取る
     * @param callback 投影設定データを受け取るコールバック
     */
    receiveProjectionSettings: (callback: (projectionSettings: ProjectionSettings) => void) => void;
    /**
     * IPCから送信された問題インポートモーダル表示通知を受け取る
     * @param callback 表示通知を受け取るコールバック
     */
    receiveOpenImportQuizDataModal: (callback: () => void) => void;
    /**
     * OSのファイル選択ダイアログ表示をリクエストする
     */
    sendFileOpenDialog: () => void;
    /**
     * IPCから送信されたOSのファイル選択ダイアログ操作結果を受け取る
     * @param callback 操作結果を受け取るコールバック（filePath: 選択されたファイルのフルパス。未選択の場合は空文字）
     */
    receiveFileOpenDialogResult: (callback: (filePath: string) => void) => void;
    /**
     * 問題データファイルの読み込みをリクエストする
     * @param filePath 問題データファイルのフルパス
     * @param password 問題データファイル（Excelファイル）に設定されているパスワード。未設定時は空文字。
     */
    loadQuizData: (filePath: string, password: string) => void;
    /**
     * IPCから送信された問題データファイルの読み込み結果を受け取る
     * @param result 問題データファイルの読み込み結果
     */
    receiveLoadQuizData: (callback: (result: ReceiveLoadQuizDataResult) => void) => void;
    /**
     * IPCから送信された投影画面クローズ通知を受け取る
     * @param callback クローズ通知を受け取るコールバック
     */
    receiveProjectionWindowClosed: (callback: () => void) => void;
}

