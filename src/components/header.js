import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import * as PropTypes from 'prop-types';

function Header(props) {
  const { languages, originalPath, language } = useI18next();
  const { t } = useTranslation();
  const { siteTitle } = props;
  return (
    <header className="container-fluid position-sticky sticky-top bg-white">
      <nav className="navbar navbar-expand px-0 " id="site-nav">
        <div className="container-fluid px-0 text-uppercase">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="navbar-nav px-0">
              <span className="nav-item">
                <Link
                  activeClassName="text-decoration-line-through"
                  className="nav-link"
                  to="/"
                >
                  Home
                </Link>
              </span>
              <span className="nav-item">
                <Link
                  activeClassName="text-decoration-line-through"
                  className="nav-link"
                  to="/alfabeto"
                >
                  {t('26 foto')}
                </Link>
              </span>
            </div>
            <div className="navbar-nav px-0">
              <span className="nav-item">
                <Link
                  activeClassName="text-decoration-line-through"
                  className="nav-link"
                  to="/credits"
                >
                  Credits
                </Link>
              </span>
              <span className="nav-item">
                <span className="nav-link">
                  {languages.map((lng, i) => (
                    <>
                      <Link
                        key={lng}
                        language={lng}
                        className={language !== lng && 'text-black-50'}
                        to={originalPath}
                      >
                        {lng}
                      </Link>
                      {!i && '/'}
                    </>
                  ))}
                </span>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = { siteTitle: PropTypes.any };

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
