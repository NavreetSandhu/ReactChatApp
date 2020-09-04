/*
 * @file: login.js
 * @description: It is Container login screen .
 * @author: smartData
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupForm from '../form/signup';
import { signup, resendEmailLink, signupData } from '../../actions/user';
import SignupSuccess from './signup-success';
import RoleSetup from './role-setup';
import { uploadFile } from '../../actions/file';
import * as moment from 'moment';
import Loader from '../../components/Loader';
import Logo from '../../components/logo/logo';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            step: 1,
            selectedSkills: null,
            address: '',
            lat_lng: null,
            locationModal: false,
            radius: 0,
            ImageCropModal: false,
            imageToCrop: '',
            skill_error: false,
            location_error: false,
            price: [0, 500],
            activity: false,
            confirm_error: false,
            priceSet:true,

        };
        this.handleStep = this.handleStep.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
       
    }

    //handle activity change
    handleActivity() {
        this.setState({ activity: !this.state.activity });
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

 handleStep(v) {
        this.setState({ step: v });
    }
   

    handleRegistration(e, date) {
        const { signupData } = this.props;
        this.setState({ confirm_error: false });
        if (e.password != e.confirmpassword) {
            this.setState({ confirm_error: true });
            console.log(this.state.confirm_error);
        }
        else {

            signupData({ ...e, ...{ "dob": date } });
            this.props.history.push('/chat');
        }
    }

   



    render() {
        return (
          
                <div className="login-form" >

                        <div className="steps">
                            <span className={this.state.step === 1 ? "step active" : "step"}></span>
                            <span className={this.state.step === 2 ? "step active" : "step"}></span>

                        </div>
                    

                    {this.state.step === 1 &&
                        <RoleSetup _handleStep={(e) => this.handleStep(e)} />
                    }
                    {
                        this.state.step === 2
                        &&
                        <SignupForm _handleRegistration={(e, date) => this.handleRegistration(e, date)} confirm_error={this.state.confirm_error} />
                    }
                    
                    
                     <Loader loading={this.props.loader.isFetching} />
                </div>
                



        );
    }

}
SignUp.propTypes = {
    signup: PropTypes.func.isRequired,
    resendEmailLink: PropTypes.func.isRequired,
    loader: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
    user: state.user,
    skills: state.skill,
    loader: state.loader,
});

const mapDispatchToProps = dispatch => ({
    signup: bindActionCreators(signup, dispatch),
    resendEmailLink: bindActionCreators(resendEmailLink, dispatch),
    signupData: bindActionCreators(signupData, dispatch),
    uploadOperatorImage: bindActionCreators(uploadFile, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
