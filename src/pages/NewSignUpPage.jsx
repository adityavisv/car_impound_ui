import NavbarComponent from '../components/NavbarComponent';
import React from 'react';
import { withTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/newsignuppage.css';
import{ Button, Form, Modal, Row }from 'react-bootstrap';
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
        const { 
            user, 
            isLoggedIn,
            missedReleases,
            upcomingReleases,
            upcomingReleasesReqInit, 
            upcomingReleasesReqFail,
            upcomingReleasesStatusCode 
        } = this.props;
        this.state = {
            username: '',
            password: '',
            passwordRep: '',
            missedReleases,
            upcomingReleases,
            upcomingReleasesReqInit,
            upcomingReleasesReqFail,
            upcomingReleasesStatusCode,
            role: 'admin',
            showFailureAlert: false,
            showPasswordMismatchAlert: false,
            showSuccessModal: false,
            shouldRedirectHome: false,
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
                missedReleases: this.props.missedReleases
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
                    this.displaySuccessModal();
                })
                .catch((err) => {
                    this.hideSignupSuccess();
                    this.showSignUpFail();
                })
        }else {
            this.showPasswordMismatch();
        }
    }


    onClickOkInsufficentPriv = () => {
        this.setState({
            hasClickedOkInsufficientPriv: true
        });
    }

    displaySuccessModal = () => {
        this.setState({
            showSuccessModal: true
        });
    }

    redirectToHome = () => {
        this.setState({
            shouldRedirectHome: true
        });
    }
    
    callLogout = () => {
        this.props.dispatch(logout());
    }

    getHighlightColor = () => {
        const { upcomingReleases, missedReleases } = this.state;
        if (missedReleases.length > 0) {
            return 'RED';
        } 
        else if (upcomingReleases.length > 0)
            return 'YELLOW';
        return null;
    }

    render = () => {
        const { showFailureAlert, showSuccessModal, shouldRedirectHome, showPasswordMismatchAlert, username, password, passwordRep, role, isLoggedIn, user, hasClickedOkInsufficientPriv, upcomingReleases } = this.state;
        const { t } = this.props;
        if (! isLoggedIn ) {
            return <Navigate to="/login" replace />
        }
        else {
            if (user.roles.includes("ROLE_SUPERUSER")) {
                if (shouldRedirectHome) {
                    return (
                        <Navigate to="/" replace />
                    );
                }
                return (
                    <div>
                        <Modal centered onHide={this.redirectToHome} show={showSuccessModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{t("signup_page_modal_header_signup_confirmation")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {t("signup_page_modal_body_new_user_has_been_created")}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.redirectToHome}>
                                    {t("signup_page_modal_footer_btn_ok")}
                                </Button>
                                <Button variant="secondary" onClick={this.callLogout}>
                                    {t("signup_page_modal_footer_btn_sign_out")}
                                </Button>                            
                            </Modal.Footer>
                        </Modal>
                        <NavbarComponent currentUser={user} callLogout={this.callLogout} highlight={this.getHighlightColor()} />
                        <div className="form_box">
                            <Alert variant="danger" show={showFailureAlert}>{t("signup_page_alert_user_exists")}</Alert>
                            <Alert variant="danger" show={showPasswordMismatchAlert}>{t("signup_page_alert_password_mismatch")}</Alert>
                            <Form className="actual_form" onSubmit={this.hitSignUp}>
                                <Row className="mb-3">
                                    <Form.Text className="form_text">{t("signup_page_form_text_sign_up_new_operator")}</Form.Text>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label className="login_field_label">{t("signup_page_form_label_username")}</Form.Label>
                                    <Form.Control
                                        type="text" 
                                        required={true} 
                                        className="form_control" 
                                        onChange={this.changeUsername} 
                                        value={username}    
                                    />
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label className="login_field_label">{t("signup_page_form_label_password")}</Form.Label>
                                    <Form.Control
                                        type="password"
                                        required={true}  
                                        className="form_control" 
                                        onChange={this.changePassword}
                                        value={password}
                                    />
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label className="login_field_label">{t("signup_page_form_label_confirm_password")}</Form.Label>
                                    <Form.Control type="password" 
                                        required={true} className="form_control" 
                                        onChange={this.changePasswordRep} 
                                        value={passwordRep}/>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Label className="login_field_label">{t("signup_page_form_label_role")}</Form.Label>
                                    <Form.Select value={role} onChange={this.changeRole}>
                                        <option value="admin">{t("signup_page_form_role_dropdown_admin")}</option>
                                        <option value="exit_operator">{t("signup_page_form_role_dropdown_user")}</option>
                                        <option value="superuser">{t("signup_page_form_role_dropdown_super_admin")}</option>
                                    </Form.Select>
                                </Row>
                               
                                    <div id="button_container_signup">
                                        <Button variant="outline-primary" type="submit" className="form_button_login" >
                                            {t("signup_page_form_btn_sign_up")}
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
    const { missedReleases, upcomingReleases, statusCode: upcomingReleasesStatusCode, upcomingReleasesReqInit, upcomingReleasesReqFail } = state.upcomingreleases;
    return {
        isLoggedIn,
        user,
        message,
        missedReleases,
        upcomingReleases,
        upcomingReleasesReqInit,
        upcomingReleasesReqFail,
        upcomingReleasesStatusCode
    };
}

export default connect(mapStateToProps)(withTranslation()(NewSignUpPage));