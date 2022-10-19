import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import '../styles/carregistrationcomponent.css';


class CarRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        const zoneLabels = "ABCDEFGHIJKLMNOT".split("");
        var zoneLabelSlotNums = []
        for (const label of zoneLabels) {
            for (let i = 1; i <= 80; i++) {
                zoneLabelSlotNums.push(label + i);
            }
        }
        this.state = {
            parkingSlots: zoneLabelSlotNums
        };;
    }

    render = () => {
        const {parkingSlots} = this.state;
        return (
            <>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Reg Date *</Form.Label>
                            <Form.Control type="date" placeholder="text" required={true}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true}></Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Car No. Plate</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true}></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Reg Time *</Form.Label>
                            <TimePicker required={true}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Vehicle Model *</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Department *</Form.Label>
                            <Form.Select required={true}>
                                <option>Country 1</option>
                                <option>Country 2</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>ID Type</Form.Label>
                            <Form.Select required={true}>
                                <option>Passport</option>
                                <option>Something else</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Vehicle Colour *</Form.Label>
                            <Form.Control type="text" placeholder="color" required={true}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Case Number *</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text" placeholder="text"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Parking Slot Num. *</Form.Label>
                            <Form.Select required={true}>
                                {
                                    Array.from(parkingSlots).map((element, index) => (
                                        <option key={element}>{element}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Mulkia Number *</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required={true} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type="date" required={true}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Case in Court Status:</Form.Label>
                            <Form.Select required={true}>
                                <option>Yes</option>
                                <option>No</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>To Auction?</Form.Label>
                            <Form.Select required={true}>
                                <option>Yes</option>
                                <option>No</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label>Remarks:</Form.Label>
                        <Form.Control as="textarea" rows={3} required={true}/>
                    </Row>

                    <div id="button_container">
                        <Button type="submit" variant="primary">Register</Button>
                    </div>
                </Form>

            </>
        )
    };
}

export default CarRegistrationForm;