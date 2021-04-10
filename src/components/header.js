import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header className="container-fluid">
    <nav className="navbar navbar-expand-md px-0">
      <div className="container-fluid px-0">
        <div className="collapse navbar-collapse justify-content-between">
          <div className="navbar-nav px-0">
            <span className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </span>
            <span className="nav-item">
              <Link className="nav-link" to="/alfabeto">26 foto</Link>
            </span>
          </div>
          <div className="navbar-nav px-0">
            <span className="nav-item">
              <Link className="nav-link" to="/credits">Credits</Link>
            </span>
            <span className="nav-item">
              <Link className="nav-link" to="/">EN/IT</Link>
            </span>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
