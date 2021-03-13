'use strict'

import path from 'path'
import { app, protocol, BrowserWindow, Menu, shell, MenuItem, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { DEFAULT_SETTINGS, IpcChannel } from './constants'
import { ProjectionSettings } from './models'
// import openAboutWindow, { AboutWindowInfo } from 'about-window' 

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow: BrowserWindow | null = null
let projectionWindow: BrowserWindow | null = null

let projectionSettings: ProjectionSettings = DEFAULT_SETTINGS;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createToolbarMenu() {
  const toolbarMenu = Menu.buildFromTemplate([
    { 
      label: 'ファイル',
      submenu: [
        {
          label: '問題ファイルを読み込む',
          click: () => {
            if (mainWindow != null) {
              mainWindow.webContents.send(IpcChannel.SEND_OPEN_IMPORT_QUIZ_DATA_MODAL, null);
            }
          }
        },
        { type: 'separator' },
        {
          label: 'アプリを終了する',
          role: 'quit'
        }
      ]
    },
    { 
      label: '設定',
      submenu: [
        {
          label: '投影画面を開く/閉じる',
          click: () => {
            if (projectionWindow == null) {
              createProjectionWindow()
            } else {
              projectionWindow.close()
            }
          }
        },
        {
          label: '投影画面設定',
          click: () => {
            if (mainWindow != null) {
              mainWindow.webContents.send(IpcChannel.SEND_OPEN_PROJECTION_SETTINGS_MODAL, null);
            }
          }
        }
      ]
    },
    { 
      label: 'ヘルプ',
      submenu: [
        // TODO: ライブラリ側の問題なのか、空のウィンドウしか表示されないのでコメントアウト
        // {
        //   label: 'このアプリについて',
        //   click: () => {
        //     const info = {
        //       icon_path: path.join(__static, 'app_icon.png'),
        //     } as AboutWindowInfo
        //     openAboutWindow(info)
        //   }
        // },
        {
          label: 'Wiki',
          click: () => { shell.openExternal('https://github.com/nano-nano/quiz_projection_supporter_advanced/wiki') }
        },
      ]
    },
  ]);
  if (isDevelopment) toolbarMenu.append(new MenuItem({ label: 'Debug', submenu: [{ label: 'リロード', role: 'forceReload' }] }));
  Menu.setApplicationMenu(toolbarMenu)
}

/**
 * メインウィンドウを生成・表示する
 */
async function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__static, 'app_icon.png'),
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html')
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  createToolbarMenu()
}

/**
 * 投影用ウィンドウを生成・表示する
 */
async function createProjectionWindow() {
  projectionWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    parent: mainWindow!,
    title: "",
    icon: path.join(__static, 'app_icon.png'),
    webPreferences: {
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await projectionWindow.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/projection`)
    // if (!process.env.IS_TEST) projectionWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    projectionWindow.loadURL('app://./index.html#/projection')
  }
  projectionWindow.on('closed', () => {
    projectionWindow = null
  })
  projectionWindow!.removeMenu()
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createToolbarMenu()
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.handle(IpcChannel.SEND_QUIZ_DATA, (_, args) => {
  if (projectionWindow != null) {
    projectionWindow.webContents.send(IpcChannel.SEND_QUIZ_DATA, args);
  }
})
ipcMain.handle(IpcChannel.SEND_IS_SHOW_QUESTION_ID, (_, args) => {
  if (projectionWindow != null) {
    projectionWindow.webContents.send(IpcChannel.SEND_IS_SHOW_QUESTION_ID, args);
  }
})
ipcMain.handle(IpcChannel.SEND_IS_SHOW_ANOTHER_ANSWER, (_, args) => {
  if (projectionWindow != null) {
    projectionWindow.webContents.send(IpcChannel.SEND_IS_SHOW_ANOTHER_ANSWER, args);
  }
})
ipcMain.handle(IpcChannel.GET_PROJECTION_SETTINGS, () => {
  if (mainWindow != null) {
    mainWindow.webContents.send(IpcChannel.GET_PROJECTION_SETTINGS, projectionSettings);
  }
  if (projectionWindow != null) {
    projectionWindow.webContents.send(IpcChannel.GET_PROJECTION_SETTINGS, projectionSettings);
  }
})
ipcMain.handle(IpcChannel.SEND_PROJECTION_SETTINGS, (_, args) => {
  projectionSettings = args;
  if (mainWindow != null) {
    mainWindow.webContents.send(IpcChannel.GET_PROJECTION_SETTINGS, projectionSettings);
  }
  if (projectionWindow != null) {
    projectionWindow.webContents.send(IpcChannel.GET_PROJECTION_SETTINGS, projectionSettings);
  }
})