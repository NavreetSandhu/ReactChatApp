/*
 * @file: Login.js
 * @description: It is Container file .
 * @author: smartData
 */

import React from 'react';
import PropTypes from 'prop-types';
import { LocalForm, Control } from 'react-redux-form';
import Errors from '../../components/common/errors';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import Match from '../../utilities/validation';
import { Link } from 'react-router-dom';
import { invalidEmail, invalidPass ,required} from '../../utilities/message';
import GoogleLogin from 'react-google-login';

const loginForm = ({ _handleLogin,responseGoogle }) => {
  return (
    <LocalForm
      model="user"
      onSubmit={(values) => _handleLogin(values)}
     
    >
    <Row>
      <Col sm="12">
        <FormGroup>
          <Label htmlFor="user.email">Email</Label>
          <Control.text
            model="user.email"
            className="form-control"
            id="user.username"
            placeholder="Enter email"
            errors={{
              invalidEmail: (val) => !Match.validateEmail(val)
            }}
          />
          <Errors
            model="user.email"
            errors={{
              invalidEmail
            }}
          />
        </FormGroup>
      </Col>
      <Col sm="12">
        <FormGroup>
          <Label htmlFor="user.password">Password</Label>
          <Control.text
            model="user.password"
            className="form-control"
            id="user.password"
            type="password"
            placeholder="Password"
            errors={{
              required: (val) => !val || !val.length,
              //invalidPass: (val) => !Match.validatePassword(val)
            }}
          />
          <Errors
            model="user.password"
            errors={{
              required
            }}
          />
        </FormGroup>
      </Col>
     
      <Col sm="12 form-button-spacing">
        <button type="submit" className="btn btn-primary btn-block ">Login
        </button>
              </Col>
              <Col className="text-center mt-2">
                oR
                  <GoogleLogin
                clientId="422152009047-b30ul4pt9u2ah5gqfbiui98oraskg73v.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />    



                      <Link to="signup">Signup</Link>
      </Col>
      </Row>
    </LocalForm>
  );
};

loginForm.propTypes = {
  _handleLogin: PropTypes.func.isRequired
};
export default loginForm;