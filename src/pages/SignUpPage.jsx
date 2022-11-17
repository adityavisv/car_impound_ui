import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/Loginpage.css';
import { connect } from 'react-redux';
import AuthService from '../services/auth.service';
import { Alert } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import SignOutConfirmModal from '../components/GridSVG/SignOutConfirmModal';
import { logout } from '../actions/auth';
import InsufficientPrivModal from '../components/InsufficientPrivModal';

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordRep: '',
            showFailureAlert: false,
            showSuccessAlert: false,
            showPasswordMismatchAlert: false,
            isLoggedIn: this.props.isLoggedIn,
            user: this.props.user,
            hasClickedOkInsufficientPriv: false
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn ||
            prevProps.user !== this.props.user) {
            this.setState({
                user: this.props.user,
                isLoggedIn: this.props.isLoggedIn
            });
        }
    }

    showSignUpFail = () => {
        this.setState({
            showFailureAlert: true
        });
    }

    hideSignUpFail = () => {
        this.setState({
            showFailureAlert: false
        });
    }


    showSignUpSuccess = () => {
        this.setState({
            showSuccessAlert: true
        });
    }

    hideSignupSuccess = () => {
        this.setState({
            showSuccessAlert: false
        });
    }

    showPasswordMismatch = () => {
        this.setState({
            showPasswordMismatchAlert: true
        });
    }

    hidePasswordMismatch = () => {
        this.setState({
            showPasswordMismatchAlert: false
        });
    }

    changeUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    changePasswordRep = (event) => {
        this.setState({
            passwordRep: event.target.value
        });
    }

    hitSignUp = (event) => {
        event.preventDefault();
        const { username, password, passwordRep } = this.state;
        const email = `${username}@foobar.com`;
        if (password === passwordRep) {
            this.hidePasswordMismatch();
            AuthService.register(username, email, password)
                .then((response) => {
                    this.hideSignUpFail();
                    this.showSignUpSuccess();
                    this.showSignoutConfirmation();
                })
                .catch((err) => {
                    this.hideSignupSuccess();
                    this.showSignUpFail();
                })
        }
        
    }

    showSignoutConfirmation = () => {
        this.setState({
            shouldShowSignoutConfirm: true
        });
    }

    hideSignoutConfirmation = () => {
        this.setState({
            shouldShowSignoutConfirm: false
        });
        this.props.dispatch(logout());
    }

    onClickSignIn = () => {
        this.showSignoutConfirmation();
    }

    onClickOkInsufficentPriv = () => {
        this.setState({
            hasClickedOkInsufficientPriv: true
        });
    }

    render = () => {
        const { showFailureAlert, showSuccessAlert, showPasswordMismatchAlert, username, password, passwordRep, shouldShowSignoutConfirm, isLoggedIn, user, hasClickedOkInsufficientPriv } = this.state;
        if (! isLoggedIn) {
            return <Navigate to="/login" replace />
        }
        else {
            if (user.roles.includes("ROLE_ADMIN")) {
                return (
                    <div>
                        <SignOutConfirmModal
                            show={shouldShowSignoutConfirm}
                            onHide={this.hideSignoutConfirmation} 
                        />
                        <div className="login_form_box">
                            <Alert variant="danger" show={showFailureAlert}>A user with this username already exists! Please pick a different username.</Alert>
                            <Alert variant="success" show={showSuccessAlert}>Account created</Alert>
                            <Alert variant="danger" show={showPasswordMismatchAlert}>Make sure passwords match!</Alert>
                            <div className="logo_icon">
                                <Link to="/"><img src={require("../SharjahPoliceLogo.png")} height="150" width="150" alt="logo"/></Link>
                                
                            </div>
                            <div className="login_box_header">
                                SIGN UP
                            </div>
                            
                            <Form className="actual_form" onSubmit={this.hitSignUp}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="login_field_label">Username (*)</Form.Label>
                                    <Form.Control
                                        type="text" 
                                        placeholder="Username"
                                        required={true} 
                                        className="form_control" 
                                        onChange={this.changeUsername} 
                                        value={username}    
                                    />
                                </Form.Group>
        
                                <Form.Group className="mb-3 password_form_group">
                                    <Form.Label className="login_field_label">Password (*)</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password" 
                                        required={true}  
                                        className="form_control" 
                                        onChange={this.changePassword}
                                        value={password}
                                        />
                                </Form.Group>
        
                                <Form.Group className="mb-3 password_form_group">
                                    <Form.Label className="login_field_label">Confirm password (*)</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm password" required={true} className="form_control" onChange={this.changePasswordRep} value={passwordRep}/>
                                    <Form.Check type="checkbox" label="Show password"/>
                                </Form.Group>
                                <div id="button_container">
                                            <Button variant="outline-primary" type="submit" className="form_button_login" >
                                                Sign Up
                                            </Button>
                                            
                                            {/* <Button variant="outline-secondary" className="form_button_reset" onClick={this.onClickSignIn}>Sign In</Button> */}
                                </div>
                                   
                            </Form>
                        </div>
                    </div>
                );
            }
            else {
                console.log("INSUFFICIENT PRIV");
                return hasClickedOkInsufficientPriv  ? <Navigate to="/" replace /> : <InsufficientPrivModal onHide={this.onClickOkInsufficentPriv} />
            }
        }
        
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, user } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        user,
        message
    };
}

export default connect(mapStateToProps)(SignUpPage);