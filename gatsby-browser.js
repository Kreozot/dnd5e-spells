/* eslint-disable react/jsx-filename-extension */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
const React = require('react');
const { Provider } = require('react-redux');
const { PersistGate } = require('redux-persist/integration/react');
// const Sentry = require('@sentry/react');
// const { Integrations } = require('@sentry/apm');

const { store, persistor } = require('./src/common/store');

// Sentry.init({
//   dsn: '',
//   integrations: [
//     new Integrations.Tracing(),
//   ],
//   tracesSampleRate: 1.0,
// });

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        { element }
      </PersistGate>
    </Provider>
  );
};
