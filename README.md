# React/Redux functional boilerplate

An electron ready functional React/Redux webpack boilerplate

## Introduction
This is my personal react-redux boilerplate.

#### Features
- ES6
- hybrid app (web/electron)
- hot module reload in electron
- with `electron-packager`
- start electron dev-server in one command
- ramda ready (use `babel-plugin-ramda`)
- unit testing ready with `jest`


#### Dependencies
- `ramda`
- `react`
- `react-dom`
- `redux`
- `react-redux`
- `redux-actions`
- `keymirror`
- `reselect`

## Usage

You can set `NODE_ENV` to `production` or `development`

#### Normal use (web)
###### Build bundle
```bash
npm run build
```
###### Start dev server
```bash
npm run dev
```
#### Use with electron
###### Build main process
```bash
npm run build:main
```
###### Build renderer
```bash
npm run build:renderer
```
###### Build main process + renderer
```bash
npm run build:electron
```
###### Start electron dev server
```bash
npm run dev:electron
```
###### Package osx .app file
```bash
npm run package:electron:osx
```

#### Test
###### Start tests
```bash
npm run test
```
###### Start tests with coverage
```bash
npm run test:coverage
```
###### Start tests in watch mode
```bash
npm run test:watch
```

#### Misc
###### Remove dist/ and clean/ folder
```bash
npm run clean
```
###### Open browser
```bash
npm run open
```

## What next ?
- Installable : boilerplate will be installable in one command
- More configurable : more configurations
- Auto updates
- package in `.exe`
