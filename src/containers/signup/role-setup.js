/*
 * @file: home.js
 * @description: It is Container home screen .
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LocalForm, Control } from 'react-redux-form';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { roleSetup } from '../../actions/user';


class RoleSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.role = this.role.bind(this);
    }
    role(r) {
        this.props._handleStep(2);
        const { roleSetup } = this.props;
        roleSetup(r);

    };
    render() {
        return (
            <div >
                <div className="heading">
                    <h3>Choose Your Role</h3>

                </div>
                <div className="sub-heading">
                    <h4>( Step 1 )</h4>
                </div>
                <div className="center-div">
                <LocalForm className="term-and-cond">

                        <Row>
                           
                    <Col sm="6">
                        <div className="role-box">
                            <div className="role-img mx-auto"><img src={require('../../assets/images/user-thumb-login.png')} alt="User Image" className="rounded-circle"/></div>
                        <button onClick={() => this.role('user')} className="btn btn-primary btn-block ">User
                            </button>
                            </div>
                    </Col>
                    <Col sm="6">
                      <div className="role-box mb-0">
                          <div className="role-img mx-auto"><img src={require('../../assets/images/user-thumb-login.png')} alt="User Image" className="rounded-circle"/></div>
                        <button onClick={() => this.role('admin')} className="btn btn-primary btn-block ">Admin
                            </button>
                            </div>
                    </Col>
                   
                    </Row>
                    </LocalForm>
                    <Col sm="12" className="bottom-link">
                        <Link to="/login" className="green-font"><i className="fa fa-angle-left mr-1" aria-hidden="true"></i>Login</Link>
                    </Col>
                    </div>
            </div>
        );
    }
}
RoleSetup.propTypes = {
    roleSetup: PropTypes.func.isRequired,
    _handleStep: PropTypes.func.isRequired

};

const mapDispatchToProps = dispatch => ({
    roleSetup: bindActionCreators(roleSetup, dispatch),

});

export default connect(null, mapDispatchToProps)(RoleSetup);

