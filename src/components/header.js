import { Link } from 'gatsby';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header className="container-fluid position-sticky sticky-top bg-white">
    <nav className="navbar navbar-expand px-0 " id="site-nav">
      <div className="container-fluid px-0 text-uppercase">
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

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
