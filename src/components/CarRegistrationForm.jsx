import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';


class CarRegistrationForm extends React.Component {

    render = () => {
        return (
            <>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Reg Date</Form.Label>
                            <Form.Control type="date" placeholder="text" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="text"></Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Car No. Plate</Form.Label>
                            <Form.Control type="text" placeholder="text"></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Reg Time</Form.Label>
                            <TimePicker />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="text" placeholder="text"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Vehcile Model</Form.Label>
                            <Form.Control type="text" placeholder="text" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Department</Form.Label>
                            <Form.Select>
                                <option>Country 1</option>
                                <option>Country 2</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>ID Type</Form.Label>
                            <Form.Select>
                                <option>Passport</option>
                                <option>Something else</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Vehicle Color</Form.Label>
                            <Form.Control type="text" placeholder="color" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Case Number</Form.Label>
                            <Form.Control type="text" placeholder="text" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text" placeholder="text" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Mulkia Number</Form.Label>
                            <Form.Control type="text" placeholder="text" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control type="text" placeholder="text" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Case in Court Status:</Form.Label>
                            <Form.Select>
                                <option>Yes</option>
                                <option>No</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>To Auction?</Form.Label>
                            <Form.Select>
                                <option>Yes</option>
                                <option>No</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label>Remarks:</Form.Label>
                        <Form.Control as="textarea" rows={3}/>
                    </Row>
                </Form>

            </>
        )
    };
}

export default CarRegistrationForm;