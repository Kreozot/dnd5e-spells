/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC, PropsWithChildren } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import SEO from './SEO';

import './Layout.scss';

const theme = createTheme({
  palette: {
    mode: 'light',
    secondary: {
      main: '#b9b9b9',
    },
  },
  components: {
    MuiFormControl: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SEO />
      { children }
    </ThemeProvider>
  );
};

export default Layout;
