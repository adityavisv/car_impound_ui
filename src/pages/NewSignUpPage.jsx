import NavbarComponent from '../components/NavbarComponent';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/newsignuppage.css';
import{ Button, Form, Row }from 'react-bootstrap';
import { connect } from 'react-redux';
import AuthService from '../services/auth.service';
import { Alert } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';
import { logout } from '../actions/auth';
import { fetchUpcomingReleases } from '../actions/upcomingrelease';
import InsufficientPrivModal from '../components/InsufficientPrivModal';

class NewSignUpPage extends React.Component {
    constructor(props) {
        super(props);
        const { user, isLoggedIn, upcomingReleases,
        upcomingReleasesReqInit, upcomingReleasesReqFail,
    upcomingReleasesStatusCode } = this.props;
        this.state = {
            username: '',
            password: '',
            passwordRep: '',
            upcomingReleases,
            upcomingReleasesReqInit,
            upcomingReleasesReqFail,
            upcomingReleasesStatusCode,
            role: 'admin',
            showFailureAlert: false,
            showPasswordMismatchAlert: false,
            showSuccessAlert: false,
            isLoggedIn,
            user,
            hasClickedOkInsufficientPriv: false
        };
    }

    componentDidMount = () => {
        this.callUpcomgingReleasesService();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn
            });
        }
        if (prevProps.user !== this.props.user) {
            this.setState({
                user: this.props.user
            });
        }
        if (prevProps.upcomingReleases !== this.props.upcomingReleases) {
            this.setState({
                upcomingReleases: this.props.upcomingReleases
            });
        }
        if (prevProps.upcomingReleasesReqInit !== this.props.upcomingReleasesReqInit) {
            this.setState({
                upcomingReleasesReqInit: this.props.upcomingReleasesReqInit
            });
        }
        if (prevProps.upcomingReleasesReqFail !== this.props.upcomingReleasesReqFail) {
            this.setState({
                upcomingReleasesReqFail: this.props.upcomingReleasesReqFail
            });
        }
        if (prevProps.upcomingReleasesStatusCode !== this.props.upcomingReleasesStatusCode) {
            this.setState({
                upcomingReleasesStatusCode: this.props.upcomingReleasesStatusCode
            });
        }
    }

    callUpcomgingReleasesService = () => {
        const { dispatch } = this.props;
        dispatch(fetchUpcomingReleases());
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

    changeRole = (event) => {
        this.setState({
            role: event.target.value
        });
    }

    hitSignUp = (event) => {
        event.preventDefault();
        const { username, password, passwordRep, role } = this.state;
        const email = `${username}@foobar.com`;
        if (password === passwordRep) {
            AuthService.register(username, email, password, role)
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
        const { showFailureAlert, showSuccessAlert, showPasswordMismatchAlert, username, password, passwordRep, shouldShowSignoutConfirm, role, isLoggedIn, user, hasClickedOkInsufficientPriv, upcomingReleases } = this.state;
        if (! isLoggedIn ) {
            return <Navigate to="/login" replace />
        }
        else {
            if (user.roles.includes("ROLE_SUPERUSER")) {
                if (showSuccessAlert) {
                    return (
                        <Navigate to="/" replace />
                    );
                }
                return (
                    <div> 
                        <NavbarComponent currentUser={user} callLogout={this.callLogout} highlight={upcomingReleases.length > 0} />
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
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label className="login_field_label">Role (*)</Form.Label>
                                    <Form.Select value={role} onChange={this.changeRole}>
                                        <option value="admin">ADMIN</option>
                                        <option value="exit_operator">EXIT OPERATOR</option>
                                        <option value="superuser">SUPERUSER</option>
                                    </Form.Select>
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
    const { upcomingReleases, statusCode: upcomingReleasesStatusCode, upcomingReleasesReqInit, upcomingReleasesReqFail } = state.upcomingreleases;
    return {
        isLoggedIn,
        user,
        message,
        upcomingReleases,
        upcomingReleasesReqInit,
        upcomingReleasesReqFail,
        upcomingReleasesStatusCode
    };
}

export default connect(mapStateToProps)(NewSignUpPage);