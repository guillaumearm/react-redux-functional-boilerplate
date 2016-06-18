import './boot' // first side effects

import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import Root from './Root'

const reactContainer = document.getElementById('reactContainer')

ReactDOM.render(
    <AppContainer>
        <Root/>
    </AppContainer>,
    reactContainer
)

if (module.hot) {
    module.hot.accept('./Root', () => {
        const NextRoot = require('./Root').default
        ReactDOM.render(
            <AppContainer>
                <NextRoot/>
            </AppContainer>,
            reactContainer
        )
    })
}
