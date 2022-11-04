import React from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import UserService from '../services/user.service';

class ReleaseCarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSlot: this.props.selectedSlot,
            isVehicleReleaseStarted: false,
            isVehicleReleaseDone: false,
            releasePayload: {
                firstName: '',
                lastName: '',
                idType: '',
                idNumber: '',
                contactNumber: '',
                emailAddress: '',
                nationality: ''
            }
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
        const { selectedSlot: {zoneLabel, slotNumber}, releasePayload } = this.state;
        UserService.releaseVehicle(zoneLabel, slotNumber, releasePayload)
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

    changeFirstName = (event) => {
        const { releasePayload } = this.state;
        this.setState({
            releasePayload: {
                ...releasePayload,
                firstName: event.target.value
            }
        });
    }

    changeLastName = (event) => {
        const { releasePayload } = this.state;
        this.setState({
            releasePayload: {
                ...releasePayload,
                lastName: event.target.value
            }
        });
    }

    changeNationality = (event) => {
        const { releasePayload } = this.state;
        this.setState({
            releasePayload: {
                ...releasePayload,
                nationality: event.target.value
            }
        });
    }

    changeIdType = (event) => {
        const { releasePayload } = this.state;
        this.setState({
            releasePayload: {
                ...releasePayload,
                idType: event.target.value
            }
        });
    }

    changeIdNumber = (event) => {
        const { releasePayload } = this.state;
        this.setState({
            releasePayload: {
                ...releasePayload,
                idNumber: event.target.value
            }
        });
    }

    changeContactNumber = (event) => {
        const { releasePayload } = this.state;
        this.setState({
            releasePayload: {
                ...releasePayload,
                contactNumber: event.target.value
            }
        });
    }

    changeEmailAddress = (event) => {
        const { releasePayload } = this.state;
        this.setState({
            releasePayload: {
                ...releasePayload,
                emailAddress: event.target.value
            }
        });
    }

    render = () => {
        const { releasePayload: {
            firstName, lastName, emailAddress, idNumber, idType, contactNumber
        }} = this.state;

        return (
            <Container>
                <Form onSubmit={this.hitRelease}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>First Name *</Form.Label>
                            <Form.Control type="text" required={true} value={firstName}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name *</Form.Label>
                            <Form.Control type="text" required={true} value={lastName} />
                        </Form.Group>
                        
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Contact Number *</Form.Label>
                            <Form.Control type="text" required={true} value={contactNumber}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Email Address *</Form.Label>
                            <Form.Control type="email" required={true} value={emailAddress} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>    
                            <Form.Label>ID Type *</Form.Label>
                            <Form.Select required={true} value={idType}>
                                <option value="Passport">Passport</option>
                                <option value="Emirates ID">Emirates ID</option>
                                <option value="National ID">National ID</option>
                                <option value="Driving License">Driving License</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Nationality *</Form.Label>
                            <Form.Control type="text" required={true} value={nationality}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text" required={true} value={idNumber}/>
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