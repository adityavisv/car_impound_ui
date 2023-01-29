import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Alert } from 'react-bootstrap';
import '../styles/Loginpage.css';
import { withTranslation } from 'react-i18next';
import "../translations/i18n";
import { login, logout } from '../actions/auth';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

class Loginpage extends React.Component {

    constructor(props) {
        super(props);
        const { isLoggedIn, message, statusCode, loginFail } = this.props;
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            isLoggedIn,
            isPasswordVisible: false,
            message,
            shouldShowNetworkErrAlert: false,
            shouldShowInvalidLoginAlert: loginFail,
            statusCode
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn
            });
        }
        if (prevProps.message !== this.props.message) {
            this.setState({
                message: this.props.message
            });
        }
        if (prevProps.statusCode !== this.props.statusCode) {
            this.setState({
                statusCode: this.props.statusCode
            });
        }
        if (prevProps.loginFail !== this.props.loginFail) {
            this.setState({
                shouldShowInvalidLoginAlert: this.props.loginFail
            });
        }
    }
    
    

    handleSubmit = (event) => {
        event.preventDefault();
        const { dispatch  } = this.props;
        const { username, password } = this.state;
        dispatch(login(username, password))
    }

    onChangeUsername = (event) => {
        this.setState({ username: event.target.value });
    }

    onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    }

    togglePasswordView = () => {
        const { isPasswordVisible } = this.state;
        this.setState({
            isPasswordVisible: ! isPasswordVisible
        });
    }

    showErrorBanner = () => {
        const { message } = this.state;
        return message !== '' && message !== undefined;
    }

    render = () => {
        const {t, i18n} = this.props;
        const {username, password, isLoggedIn, isPasswordVisible, shouldShowInvalidLoginAlert, shouldShowNetworkErrAlert} = this.state;
        if (isLoggedIn) {
            return <Navigate to="/" replace />
        }
        return (
            <div>
                <div className="login_form_box">
                    {shouldShowInvalidLoginAlert ? <Alert variant="danger">
                        <Alert.Heading>
                            Sign-in failed!
                        </Alert.Heading>
                    </Alert> : <></>}
                    {
                        shouldShowNetworkErrAlert ? <Alert variant="danger" dismissible>
                            <Alert.Heading>Sign-in failed!</Alert.Heading>
                            Network Error, Please try again.
                        </Alert> : <></>}
                    <div className="logo_icon">
                        <img src={require("../SharjahPoliceLogo.png")} height="120" width="120" alt="logo" />
                    </div>
                    <div className="login_box_header">
                        {t("login_page_box_header")}
                        {/* Login */}
                    </div>

                    <Form className="actual_form" onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="login_field_label">{t("login_page_username_label")}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={t("login_page_username_placeholder")}
                                required={true}
                                className="form_control"
                                value={username}
                                onChange={this.onChangeUsername}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 password_form_group">
                            <Form.Label className="login_field_label">{t("login_page_password_label")}</Form.Label>
                            <Form.Control
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder={t("login_page_password_placeholder")}
                                required={true}
                                className="form_control"
                                value={password}
                                onChange={this.onChangePassword}
                            />
                            <Form.Check type="checkbox" label={t("login_page_show_password_label")} onChange={this.togglePasswordView} />
                        </Form.Group>
                        <div id="button_container">
                            <Button variant="outline-primary" type="submit" className="form_button_login">
                                {/* onClick={() => changeLanguage("arab")}> */}
                                {t("login_page_sign_in_btn")}
                                    </Button>
                            {/* <Button variant="outline-secondary" className="form_button_reset">Sign Up</Button> */}
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, loginFail } = state.auth;
    const { message, statusCode } = state.message;
    return {
        isLoggedIn,
        message,
        statusCode,
        loginFail
    };
}

export default connect(mapStateToProps)(withTranslation()(Loginpage));