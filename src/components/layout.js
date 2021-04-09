import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';

import '../scss/style.scss';
import { Helmet } from 'react-helmet';

function Layout({ children }) {
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
        <link
          href="//db.onlinewebfonts.com/c/f98aea1dfb3d1fc460660c5e4e4b9612?family=Saol+Display+Semibold+Italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="https://use.typekit.net/qsp3uel.css" />
      </Helmet>
      <Header siteTitle={data.site.siteMetadata?.title || 'Title'} />
      <div>
        <main className="container-fluid">{children}</main>
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
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
