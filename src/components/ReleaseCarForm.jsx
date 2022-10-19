import React from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

class ReleaseCarForm extends React.Component {
    render = () => {
        return (
            <Container>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" required={true}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Nationality *</Form.Label>
                            <Form.Control type="text" required={true} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>    
                            <Form.Label>ID Type *</Form.Label>
                            <Form.Select required={true}>
                                <option>Passport</option>
                                <option>Emirates ID</option>
                                <option>National ID</option>
                                <option>Driving License</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text" required={true} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Contact Number *</Form.Label>
                            <Form.Control type="text" required={true}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Email Address *</Form.Label>
                            <Form.Control type="email" required={true} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Button type="submit">Submit</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
        );
    }
}

export default ReleaseCarForm;