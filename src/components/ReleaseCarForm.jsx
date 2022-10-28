import React from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import UserService from '../services/user.service';

class ReleaseCarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSlot: this.props.selectedSlot,
            isVehicleReleaseStarted: false,
            isVehicleReleaseDone: false
        }
    }

    shouldShowLoadingScreen = () => {
        const { isVehicleReleaseStarted, isVehicleReleaseDone } = this.state;
        if (isVehicleReleaseStarted) {
            if (isVehicleReleaseDone)
                return false;
            return true;
        }
        return false;
    }

    hitRelease = (event) => {
        event.preventDefault();
        this.setState({
            isVehicleReleaseStarted: true
        });
        const { selectedSlot: {zoneLabel, slotNumber} } = this.state;
        UserService.releaseVehicle(zoneLabel, slotNumber)
            .then((response) => {
                this.setState({
                    isVehicleReleaseDone: true
                });
                this.props.closeForm();
                this.props.closeGridSvg();
                this.props.callZoneSummaryService();
            })
            .catch((error) =>{
                window.alert("Release failed");
            });
    }

    render = () => {
        
        return (
            <Container>
                <Form onSubmit={this.hitRelease}>
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
                    <div id="button_container">
                            <Button type="submit">Release</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default ReleaseCarForm;