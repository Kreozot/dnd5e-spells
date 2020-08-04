/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
const React = require("react");
const { Provider } = require("react-redux");
const { PersistGate } = require('redux-persist/integration/react');

const { store, persistor } = require('./src/common/store');

exports.wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={ persistor }>
        {element}
        </PersistGate>
    </Provider>
  )
};
