import React from 'react';
import { hydrate, render } from 'react-dom';
// @ts-ignore
import { Router } from '@atlaskit/router';
import { createBrowserHistory } from 'history';

import { Layout } from './layout';
import { routes } from './routes';

import LooselyLazy from '../atlassian-lazy';

// LooselyLazy.mode('RENDER');

hydrate(
  <Router
    // @ts-ignore
    routes={routes}
    history={createBrowserHistory()}
    resourceContext={{ baseUrl: '' }}
    // @ts-ignore
    resourceData={window.__INITIAL_STATE__}
  >
    <Layout />
  </Router>,
  document.getElementById('root')
);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
