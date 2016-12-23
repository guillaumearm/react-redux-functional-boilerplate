/* ---------- Electron init ------------------------------------------------- */
import { app, BrowserWindow } from 'electron'
/* ---------- Requires ------------------------------------------------------ */
import { host, port } from '../scripts/config'
import { isDev } from '../scripts/env'
import path from 'path'
/* ---------- Refs for garbage collection ----------------------------------- */
let window
/* -------------------------------------------------------------------------- */

function createBrowserWindow () {
    // Init Window
    window = new BrowserWindow({
        width:    1024,
        height:   700,
        frame:    true,
    })

    // Load template file
    window.loadURL(`http://${host}:${port}`)

    // Open the DevTools.
    if (isDev())
        window.webContents.openDevTools()

    // Emitted when the window is closed.
    window.on('closed', () => {
        window = null
    })
}

app.on('ready', createBrowserWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (window === null) {
        createBrowserWindow()
    }
})
