import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Loginpage.css';

class Loginpage extends React.Component {
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
                        Login
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
                            <Form.Check type="checkbox" label="Show password"/>
                        </Form.Group>

                        {/* <Container fluid>
                            <Row> */}
                                {/* <Col xs={6}> */}
                                    <Button classNamevariant="primary" type="submit" className="form_button_login">
                                        Sign in
                                    </Button>
                                {/* </Col>

                                <Col xs={6}> */}
                                    <Button variant="secondary" className="form_button_reset">Reset</Button>
                                {/* </Col>
                            </Row>
                        </Container> */}
                    </Form>
                </div>
            </div>
        )
    }
}

export default Loginpage;