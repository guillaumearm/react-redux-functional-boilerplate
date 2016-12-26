/* ---------- Electron init ------------------------------------------------- */
import { always } from 'ramda';
import { app, BrowserWindow } from 'electron'
/* ---------- Requires ------------------------------------------------------ */
const { devConfig } = __PACKAGEJSON__;
const isDev = always(__DEVELOPMENT__);
const { host = '0.0.0.0', port = 8080 } = devConfig;
/* ----------- Devtools ------------------------------------------------------ */
let installDevTools = () => Promise.resolve();
if (isDev()) {
    const electronDevtoolsInstaller = require('electron-devtools-installer');
    const installExtension = electronDevtoolsInstaller.default;
    const { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = electronDevtoolsInstaller;
    installDevTools = () => Promise.all([
        installExtension(REACT_DEVELOPER_TOOLS),
        installExtension(REDUX_DEVTOOLS),
    ])
}
/* ---------- Refs for garbage collection ----------------------------------- */
let window
/* -------------------------------------------------------------------------- */

function setDevelopmentMode() {
    installDevTools()
        .then((names) => {
            console.log(`Added Extension: ${names}`);
            window.webContents.openDevTools();
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