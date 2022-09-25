/* eslint-disable react/jsx-filename-extension */
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import { WrapRootElementNodeArgs, WrapPageElementNodeArgs } from 'gatsby';
import React from 'react';
import { Provider } from 'react-redux';

import Layout from 'components/Layout';
import { store } from 'common/store';

export const wrapPageElement = ({ element, props }: WrapPageElementNodeArgs) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }: WrapRootElementNodeArgs) => {
  return (
    <Provider store={store}>
      { element }
    </Provider>
  );
};
