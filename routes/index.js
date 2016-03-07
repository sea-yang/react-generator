import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from '../public/src/store/configureStore';
import Html from '../public/src/containers/Html';
import routes from '../public/src/routes';

const router = express.Router();


router.use((req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = createStore(memoryHistory, undefined);
  const history = syncHistoryWithStore(memoryHistory, store);

  const hydrateOnClient = (status = 200) => {
    const html = ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} store={store} />
    );
    res.status(status).send(`<!doctype html>\n${html}`);
  };

  if (__DISABLE_SSR__) {
    return hydrateOnClient();
  }

  function render(renderProps) {
    const component = (
      <Provider store={store} key="provider">
      <div><RouterContext {...renderProps} /></div>
      </Provider>
    );
    const html = ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
    );
    return res.status(200).send(`<!doctype html>\n${html}`);
  }

  match({ history, routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return res.redirect(redirectLocation.pathname + redirectLocation.search);
    }

    if (error) {
      console.error('ROUTER ERROR:', error);
      return hydrateOnClient(500);
    }

    if (renderProps) {
      return Promise.resolve()
        .then(() => render(renderProps))
        .catch((e) => {
          console.error(e);
          hydrateOnClient();
        });
    }

    return hydrateOnClient(404);
  });
});

export default router;
