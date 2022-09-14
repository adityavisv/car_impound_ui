import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Loginpage.css';

class Registerpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render = () => {
        return (
            <div>
                <div className="login_form_box">
                    <div className="logo_icon">
                        <img src={require("../logo-social.png")} height="150" width="150" alt="logo"/>
                    </div>
                    <div className="login_box_header">
                        Register
                    </div>
                    
                    <Form className="actual_form">
                        <Form.Group className="mb-3">
                            <Form.Label className="login_field_label">Username (*)</Form.Label>
                            <Form.Control type="text" placeholder="Username" required="true" className="form_control" />
                            {/* <Form.Text className="text-muted">
                                Some placeholder text below form controls
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3 password_form_group">
                            <Form.Label className="login_field_label">Password (*)</Form.Label>
                            <Form.Control type="password" placeholder="Password" required="true"  className="form_control"/>
                        </Form.Group>

                        <Form.Group className="mb-3 password_form_group">
                            <Form.Label className="login_field_label">Confirm password (*)</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" required="true" className="form_control" />
                            <Form.Check type="checkbox" label="Show password"/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3 button_form_group">
                            <Button className="signup_btn" variant="primary" type="submit">
                                Register
                            </Button>
                        </Form.Group>
                           
                    </Form>
                </div>
            </div>
        )
    }
}
export default Registerpage;