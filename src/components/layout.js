import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Header from './header';

import '../scss/style.scss';

function Layout({ children, hideFooter, containerClass }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://use.typekit.net/qsp3uel.css" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap" rel="stylesheet" />
      </Helmet>
      <Header siteTitle={data.site.siteMetadata?.title || 'Title'} />
      <div>
        <main className={containerClass || 'container-fluid'}>{children}</main>
        {!hideFooter && (
        <footer
          style={{
            marginTop: '2rem',
          }}
        >
          {process.env.ENABLE_GATSBY_REFRESH_ENDPOINT && (
          <button
            type="button"
            onClick={() => {
              fetch('/__refresh', { method: 'POST' });
            }}
          >
            Refresh
          </button>
          )}
        </footer>
        )}
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
