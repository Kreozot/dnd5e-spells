/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC, PropsWithChildren } from 'react';

import SEO from './SEO';

import './Layout.scss';
import 'react-tippy/dist/tippy.css';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SEO />
      { children }
    </>
  )
}

export default Layout;
