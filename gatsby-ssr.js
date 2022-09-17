/* eslint-disable react/jsx-filename-extension */
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require('react');
const { Provider } = require('react-redux');

const { store } = require('./src/common/store');

exports.wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      { element }
    </Provider>
  );
};
