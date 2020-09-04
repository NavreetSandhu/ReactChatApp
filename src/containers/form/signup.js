/*
 * @file: signup.js
 * @description: It is Container file .
 * @author: smartData
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { LocalForm, Control } from 'react-redux-form';
import Errors from '../../components/common/errors';
import { Row, Col, Button, FormGroup, Label } from 'reactstrap';
import Match from '../../utilities/validation';
import { invalidEmail, invalidPass, requiredName, required } from '../../utilities/message';
import DatePicker from "react-datepicker";
import ReactTooltip from "react-tooltip";
import "react-datepicker/dist/react-datepicker.css";
import GoogleLogin from 'react-google-login';
import { withRouter } from 'react-router-dom';

const SignupForm = ({ _handleRegistration, hidden, confirm_error ,history}) => {

  const [date, setDate] = useState(new Date());
  const user = useSelector(state => state.user);
console.log(user);
  const responseGoogle = (response) => {
  
};

  const handleChange = date => {
    history.push('/chat');
  };

  return (
    <div >
      <div className="heading">
        <h3>Registration</h3>
      </div>
      <div className="sub-heading">
        <h4>( Step 2 )</h4>
      </div>
      <div className="center-div">
        <LocalForm
          model="user"
          onSubmit={(values) => _handleRegistration(values, date)}
        >
          <Row>
          {user.role == 'admin' ?
          <React.Fragment>
            <Col sm="6" >
              <FormGroup>
                <Label htmlFor="user.name">Organization Name</Label>
                <Control.text
                  model="user.organizationName"
                  className="form-control"
                  id="user.organizationName"
                  placeholder="Enter Organization name"
                  errors={{
                    required: (val) => !val || !val.length,
                  }}
                />
                <Errors
                  model="user.organizationName"
                  errors={{
                    required

                  }}
                />
              </FormGroup>
            </Col>
            <Col sm="6" >
              <FormGroup>
                <Label htmlFor="user.name">Primary Email</Label>
                <Control.text
                  model="user.PrimaryEmail"
                  className="form-control"
                  id="user.PrimaryEmail"
                  placeholder="Enter Primary email"
                  errors={{
                    required: (val) => !val || !val.length,
                  }}
                />
                <Errors
                  model="user.PrimaryEmail"
                  errors={{
                    required

                  }}
                />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label htmlFor="user.website">Website Url</Label>
                <Control.text
                  model="user.website"
                  className="form-control"
                  id="user.website"
                  placeholder="Enter last Name"
                  errors={{
                    required: (val) => !val || !val.length,
                  }}
                />
                <Errors
                  model="user.website"
                  errors={{
                    required

                  }}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="user.email">Email Domain</Label>
                <Control.text
                  model="user.email"
                  className="form-control"
                  id="user.email"
                  placeholder="Enter email domain"
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
                  type={hidden ? "text" : "password"}
                  placeholder="Enter password"
                  max="8"
                  errors={{
                    invalidPass: (val) => !Match.validatePassword(val)
                  }}
                />
                <Errors
                  model="user.password"
                  errors={{
                    invalidPass

                  }}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label htmlFor="user.confirmpassword">Confirm Password</Label>
                <Control.text
                  model="user.confirmpassword"
                  className="form-control"
                  id="user.confirmpassword"
                  type={hidden ? "text" : "password"}
                  placeholder="Confirm password"
                  errors={{
                    required: (val) => !val || !val.length,
                  }}
                />
                <Errors
                  model="user.confirmpassword"
                  errors={{
                    required

                  }}
                />
                {confirm_error &&
                  <p className="error">Confirm password and password doesn't match</p>}</FormGroup></Col></React.Fragment>:
             <React.Fragment>


             <GoogleLogin
                clientId="422152009047-b30ul4pt9u2ah5gqfbiui98oraskg73v.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />  

              </React.Fragment>
          }
            
       
            <Col sm="12 form-button-spacing">
              <button type="submit" className="btn btn-primary btn-block">Next</button>

            </Col>
          </Row>
        </LocalForm>
      </div>
    </div>
  );
};

SignupForm.propTypes = {
  _handleRegistration: PropTypes.func.isRequired
};
export default withRouter(SignupForm);