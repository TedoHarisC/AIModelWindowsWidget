import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import Store from 'electron-store'

const store = new Store()

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 500,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Restore position if exists
  const pos = store.get('window-position') as { x: number; y: number } | undefined
  if (pos) {
    mainWindow.setPosition(pos.x, pos.y)
  }

  // Load Vite dev server or production build
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // Save position on close
  mainWindow.on('close', () => {
    if (mainWindow) {
      const [x, y] = mainWindow.getPosition()
      store.set('window-position', { x, y })
    }
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC Handlers
ipcMain.handle('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize()
  }
})

ipcMain.handle('close-window', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})

ipcMain.handle('resize-window', (_event, { width, height }) => {
  if (mainWindow) {
    mainWindow.setSize(width, height, true)
  }
})

ipcMain.handle('store-get', (_event, key) => {
  return store.get(key)
})

ipcMain.handle('store-set', (_event, key, value) => {
  store.set(key, value)
})
