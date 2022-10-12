import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button} from 'react-bootstrap';
import '../styles/Loginpage.css';
import { useTranslation } from "react-i18next";
import "../translations/i18n";

export const  Loginpage = () => {
    
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    // render = () => {
        const {t, i18n} = useTranslation();
        const changeLanguage = lng => {
            i18n.changeLanguage(lng);
        };

        return (
            <div>
                {/* <div className="color_bar">
                    &nbsp;
                </div> */}
                <div className="login_form_box">
                    <div className="logo_icon">
                        <img src={require("../logo-social.png")} height="150" width="150" alt="logo"/>
                    </div>
                    <div className="login_box_header">
                        {t("login")}
                    </div>
                    
                    <Form className="actual_form">
                        <Form.Group className="mb-3">
                            <Form.Label className="login_field_label">Username (*)</Form.Label>
                            <Form.Control type="text" placeholder="Username" required={true} className="form_control" />
                            {/* <Form.Text className="text-muted">
                                Some placeholder text below form controls
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3 password_form_group">
                            <Form.Label className="login_field_label">Password (*)</Form.Label>
                            <Form.Control type="password" placeholder="Password" required={true}  className="form_control"/>
                            <Form.Check type="checkbox" label="Show password"/>
                        </Form.Group>
                            <div id="button_container">
                                    <Button variant="outline-primary" type="submit" className="form_button_login" onClick={() => changeLanguage("arab")}>
                                        Sign in
                                    </Button>
                                    <Button variant="outline-secondary" className="form_button_reset">Sign Up</Button>
                            </div>
                    </Form>
                </div>
            </div>
        )
    // }
}

// export default Loginpage;