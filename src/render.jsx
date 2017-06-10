/* eslint-disable global-require */

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import Root from './Root';

const reactContainer = document.getElementById('reactContainer');

ReactDOM.render(
  <Root />,
  reactContainer,
);

if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      reactContainer,
    );
  });
}
