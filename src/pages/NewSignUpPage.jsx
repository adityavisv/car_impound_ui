import NavbarComponent from '../components/NavbarComponent';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/newsignuppage.css';
import{ Button, Form, Row }from 'react-bootstrap';
import { connect } from 'react-redux';
import AuthService from '../services/auth.service';
import { Alert } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import SignOutConfirmModal from '../components/GridSVG/SignOutConfirmModal';
import { logout } from '../actions/auth';
import InsufficientPrivModal from '../components/InsufficientPrivModal';

class NewSignUpPage extends React.Component {
    constructor(props) {
        super(props);
        const { user, isLoggedIn } = this.props;
        this.state = {
            username: '',
            password: '',
            passwordRep: '',
            showFailureAlert: false,
            showPasswordMismatchAlert: false,
            showSuccessAlert: false,
            isLoggedIn,
            user,
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
        }else {
            this.showPasswordMismatch();
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

    
    callLogout = () => {
        this.props.dispatch(logout());
    }

    render = () => {
        const { showFailureAlert, showSuccessAlert, showPasswordMismatchAlert, username, password, passwordRep, shouldShowSignoutConfirm, isLoggedIn, user, hasClickedOkInsufficientPriv } = this.state;
        if (! isLoggedIn ) {
            return <Navigate to="/login" replace />
        }
        else {
            if (user.roles.includes("ROLE_ADMIN")) {
                return (
                    <div> 
                        <NavbarComponent currentUser={user} callLogout={this.callLogout} />
                        <div className="form_box">
                            <Alert variant="danger" show={showFailureAlert}>A user with this username already exists! Please pick a different username.</Alert>
                            <Alert variant="success" show={showSuccessAlert}>Account created</Alert>
                            <Alert variant="danger" show={showPasswordMismatchAlert}>Make sure passwords match!</Alert>
                            <Form className="actual_form" onSubmit={this.hitSignUp}>
                                <Row className="mb-3">
                                    <Form.Text className="form_text">Sign up new operator</Form.Text>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label className="login_field_label">Username (*)</Form.Label>
                                    <Form.Control
                                        type="text" 
                                        required={true} 
                                        className="form_control" 
                                        onChange={this.changeUsername} 
                                        value={username}    
                                    />
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label className="login_field_label">Password (*)</Form.Label>
                                    <Form.Control
                                        type="password"
                                        required={true}  
                                        className="form_control" 
                                        onChange={this.changePassword}
                                        value={password}
                                    />
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label className="login_field_label">Confirm password (*)</Form.Label>
                                    <Form.Control type="password" 
                                        required={true} className="form_control" 
                                        onChange={this.changePasswordRep} 
                                        value={passwordRep}/>
                                    <Form.Check type="checkbox" label="Show password"/>
                                </Row>
                               
                                    <div id="button_container_signup">
                                        <Button variant="outline-primary" type="submit" className="form_button_login" >
                                            Sign Up
                                        </Button>
                                    </div>
                               
                            </Form>
                        </div>
                    </div>
                );
            }
            else {
                return hasClickedOkInsufficientPriv ? <Navigate to="/" replace /> : <InsufficientPrivModal onHide={this.onClickOkInsufficentPriv} />
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

export default connect(mapStateToProps)(NewSignUpPage);