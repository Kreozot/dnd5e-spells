/* eslint-disable react/jsx-filename-extension */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import { WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from 'gatsby';
import { Provider } from 'react-redux';

import { store } from 'common/store';
import Layout from 'components/Layout';

export const wrapPageElement = ({ element, props }: WrapPageElementBrowserArgs) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Layout {...props}>{element}</Layout>;
};

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => {
  return (
    <Provider store={store}>
      { element }
    </Provider>
  );
};
