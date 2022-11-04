import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';
import '../styles/Loginpage.css';
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import { login } from '../actions/auth';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

class Loginpage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            isLoggedIn: this.props.isLoggedIn,
            isPasswordVisible: false,
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn
            });
        }
    }
    
    // const { t, i18n } = useTranslation();
    // const changeLanguage = lng => {
    //     i18n.changeLanguage(lng);
    // };

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

    render = () => {
        const {username, password, isLoggedIn, isPasswordVisible} = this.state;
        if (isLoggedIn) {
            return <Navigate replace to="/"/>;
        }
        return (
            <div>
                <div className="login_form_box">
                    <div className="logo_icon">
                        <img src={require("../sp-meta-logo.png")} height="120" width="120" alt="logo" />
                    </div>
                    <div className="login_box_header">
                        {/* {t("login")} */}
                        Login
                    </div>

                    <Form className="actual_form" onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="login_field_label">Username (*)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                required={true}
                                className="form_control"
                                value={username}
                                onChange={this.onChangeUsername}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 password_form_group">
                            <Form.Label className="login_field_label">Password (*)</Form.Label>
                            <Form.Control
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Password"
                                required={true}
                                className="form_control"
                                value={password}
                                onChange={this.onChangePassword}
                            />
                            <Form.Check type="checkbox" label="Show password" onChange={this.togglePasswordView} />
                        </Form.Group>
                        <div id="button_container">
                            <Button variant="outline-primary" type="submit" className="form_button_login">
                                {/* onClick={() => changeLanguage("arab")}> */}
                                Sign in
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
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Loginpage);