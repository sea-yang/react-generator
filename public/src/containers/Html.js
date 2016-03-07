import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';

export default class Html extends Component {
  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';

    return (
      <html>
      <head>
        <title>demo</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {Object.keys(assets.styles).map((style, key) =>
          <link href={assets.styles[style]} key={key} rel="stylesheet" type="text/css" charSet="UTF-8" />
        )}
      </head>
      <body>
      <div id="root" dangerouslySetInnerHTML={{__html: content}} />
      <script id="initialState" type="text/json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(store.getState())}} charSet="UTF-8" />
      <script src={assets.javascript.vendor} charSet="UTF-8" />
      <script src={assets.javascript.main} charSet="UTF-8" />
      </body>
      </html>
    );
  }
}

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object
};
