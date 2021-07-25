import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import React, { useState } from 'react';
import * as PropTypes from 'prop-types';

function Header(props) {
  const { languages, originalPath, language } = useI18next();

  const [mobileNav, setMobileNav] = useState(false);
  const { t } = useTranslation();
  const { siteTitle } = props;
  return (
    <header
      className="container-fluid position-fixed overflow-hidden"
      style={{ position: 'relative', zIndex: 9999 }}
    >
      <nav
        id="mobile-nav"
        className="d-md-none"
        style={{ position: 'relative', zIndex: 9999 }}

      >
        <div className="row small gx-0 py-2 text-uppercase">
          <div className="col px-0">
            <span
              className="nav-link  px-0 navbar-light"
              id="toggle-navbar-button"
              onClick={() => setMobileNav(!mobileNav)}
            >
              {mobileNav
                ? (
                  <button
                    className="btn-close"
                  />
                )
                : <span className="navbar-toggler-icon" />}
            </span>
          </div>
          <div className="col text-end ">
            <span className="nav-link  px-0">
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
          </div>
        </div>
      </nav>
      <nav
        className={`navbar navbar-expand px-0 align-items-end align-items-md-center ${mobileNav
          ? 'active'
          : ''}`}
        id="site-nav"
      >
        <div id="nav-container" className="container-fluid px-0 text-uppercase">
          <div
            className="collapse navbar-collapse  justify-content-md-between align-items-start align-items-md-center flex-column flex-md-row"
          >
            <div className="navbar-nav px-0 flex-column flex-md-row">
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
            <div className="navbar-nav px-0 flex-column flex-md-row">
              <span className="nav-item">
                <Link
                  activeClassName="text-decoration-line-through"
                  className="nav-link"
                  to="/credits"
                >
                  {t('Crediti')}
                </Link>
              </span>
              <span className="nav-item d-none d-md-block">
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
