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

#### Additional stuffs
- `redux-actions`
- `keymirror`
- `reselect`

## Usage

#### Normal use
###### in development
- `npm run build:dev` : build bundle in development mode
- `npm run dev` : start dev-server
###### in production
- `npm run build`: build bundle in production mode
- `npm run dev:prod` : start dev-server in production mode

#### Use with electron
###### in development
- `npm run build:dev:main` : build electron main app in development mode
- `npm run dev:electron` : start electron dev-server
###### in production
- `npm run build:main` : build electron main app in production mode
- `npm run package:electron:osx` : package electron application in a `.app` file

## What next ?
- Installable : boilerplate will be installable in one command
- More configurable : more configurations
- Auto updates
- package in `.exe`
