/*
 * @file: login.js
 * @description: It is Container login screen .
 * @author: smartData
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from './form/login';
import { login } from '../actions/user';
import Loader from '../components/Loader';
import Logo from '../components/logo/logo';

class Login extends Component {
  constructor(props) {
    super(props);
      this.state = {
    };
    this.handleLogin = this.handleLogin.bind(this);
    
        this.responseGoogle = this.responseGoogle.bind(this);

  }
  // Handle user login
  handleLogin(values) {
    const { login, history } = this.props;
    login(values, res => {
      if (res) {
        history.push('/chat');
      }
    });
  };

    responseGoogle(response){
  this.props.history.push('/chat');
};

  render() {
    return (
      <div className="login-form">
        <div className="heading">
       <Logo />
        </div>
        <div className="sub-heading d-flex justify-content-center">
          <div className="col-sm-8 col-12">
        Welcome to athleqe. The global network of sports coaches and fitness professionals.
        </div>
        </div>
        <div className="center-div">
          <LoginForm
            _handleLogin={this.handleLogin}
            responseGoogle={this.responseGoogle}
          />
            </div>
            <Loader loading={this.props.loader.isFetching} />
        </div>
        
    );
  }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    loader: PropTypes.object.isRequired,

};

const mapDispatchToProps = dispatch => ({
  login: bindActionCreators(login, dispatch)
});


const mapStateToProps = state => ({
    loader: state.loader
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
