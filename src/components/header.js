import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const Header = ({ siteTitle }) => (
  <header className="container-fluid">
    <nav className="d-flex justify-content-between">
      <div>
        <Link to="/" className="align-self-start">Home</Link>
        <Link to="/" className="align-self-start">26 foto</Link>
      </div>
      <div>
        <Link to="/" className="align-self-start">Credits</Link>
        <Link to="/" className="align-self-start">EN/IT</Link>
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
