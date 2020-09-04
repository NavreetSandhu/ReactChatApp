/*
 * @file: login.js
 * @description: It is Container login screen .
 */
import React from 'react';
import { Link } from 'react-router-dom';

export default ({email,_resendLink}) => {
    return (  
        <div>
        <div className="heading">
          <h3>Verify</h3>
          <p>We’ve sent you an email to:</p>
          <p className="green-font">{email}</p>
          <p className="mt-4">Please press on the link provided in your email from us to verify your account.</p>
            </div>
          
            <div className="text-center">
                <Link to="/" className="green-font"><i className="fa fa-angle-left mr-1" aria-hidden="true"></i>Login</Link>
            </div>
            </div>
    );
  };
