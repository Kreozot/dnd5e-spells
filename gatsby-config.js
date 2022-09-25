module.exports = {
  siteMetadata: {
    title: 'D&D 5e Interactive Spell List',
    description: 'Interactive Spell List for "Dungeons & Dragons 5th edition" game',
    author: 'Sergey Sharov',
  },
  flags: {
    DEV_SSR: true
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/
        }
      }
    },
    {
      resolve: 'gatsby-plugin-emotion',
      options: {
        // Accepts the following options, all of which are defined by `@emotion/babel-plugin` plugin.
        // The values for each key in this example are the defaults the plugin uses.
        sourceMap: true,
        autoLabel: 'dev-only',
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    },
    'gatsby-plugin-material-ui',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-minify-classnames',
      options: {
        enableOnDevelopment: false,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/logo.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://bc375a8023dd4fdaaa8f917e9f8019ab@o94217.ingest.sentry.io/5400964',
        // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
        environment: process.env.NODE_ENV,
        enabled: (() => ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // TODO: Doesn't invalidate cache properly
    // 'gatsby-plugin-offline',
    // 'gatsby-plugin-netlify',
  ],
};
