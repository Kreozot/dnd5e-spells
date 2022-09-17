/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO: FC = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  return (
    <Helmet
      meta={[
        {
          name: 'description',
          content: site.siteMetadata.description,
        },
        {
          property: 'og:title',
          content: site.siteMetadata.title,
        },
        {
          property: 'og:description',
          content: site.siteMetadata.description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: site.siteMetadata.title,
        },
        {
          name: 'twitter:description',
          content: site.siteMetadata.description,
        },
      ]}
    >
      <html lang="en" />
      <title itemProp="name" lang="en">{ site.siteMetadata.title }</title>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-148393017-1" />
      <script>
        { `
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'UA-148393017-1');
        ` }
      </script>
    </Helmet>
  );
};

export default SEO;
