
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from '../Loader';

const Header = ({ loader }) => {
  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="header">
          <div className="logo">
            <img src={require('../../assets/images/logo.png')} alt="logo" />
          </div>
          <div className="menu">
            <div className="menu-icon">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        </div>
      </div>
      <Loader loading={loader.isFetching} />
    </React.Fragment>
  );
};

Header.propTypes = {
  loader: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  loader: state.loader
});

export default connect(mapStateToProps)(Header);