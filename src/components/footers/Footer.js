
import React from 'react';
export default ({ props }) => {
  const login = () => {
    props.history.push('/login');
  };
  return (
    <div className="nudgit-login-section">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="sign-up-buttons">
              <div className="heading">
                <span>My nudgits</span>
              </div>
              <div className="button">
                <button type="submit" onClick={() => login()}>I’m a customer <img className="black-arrow" src={require('../../assets/images/black-arrow.png')} alt="find" /></button>
              </div>
              <div className="button">
                <button type="submit" onClick={() => login()}>I’m an operator <img className="" src={require('../../assets/images/black-arrow.png')} alt="find" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};