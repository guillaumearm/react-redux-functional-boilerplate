/* ---------- Electron init ------------------------------------------------- */
import { app, BrowserWindow } from 'electron'
/* ---------- Requires ------------------------------------------------------ */
import { host, port } from '../scripts/config'
import { isDev } from '../scripts/env'
import path from 'path'
/* ----------- Devtools ------------------------------------------------------ */
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';
/* ---------- Refs for garbage collection ----------------------------------- */
let window
let firstTime = true;
/* -------------------------------------------------------------------------- */

const installDevTools = () => Promise.all([
    installExtension(REACT_DEVELOPER_TOOLS),
    installExtension(REDUX_DEVTOOLS),
])

const openDevTools = () => {
    setTimeout(() => {
        window.webContents.openDevTools();
        firstTime = false;
    }, firstTime ? 3000 : 0)
};

function setDevelopmentMode() {
    installDevTools()
        .then((names) => {
            console.log(`Added Extension: ${names}`);
            openDevTools();
        })
        .catch((err) => console.log('An error occurred: ', err));
}

function createBrowserWindow () {
    if (isDev()) setDevelopmentMode();

    // Init Window
    window = new BrowserWindow({
        width:    1024,
        height:   700,
        frame:    true,
    })

    // Load template file
    window.loadURL(`http://${host}:${port}`)

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
