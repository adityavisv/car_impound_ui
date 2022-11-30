import React from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import UserService from '../services/user.service';
import '../styles/releasecarform.css';

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
                idType: 'Passport',
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
        const { selectedSlot: {zoneLabel, slotNumber}, releasePayload: {
            firstName,
            lastName,
            idType,
            idNumber,
            contactNumber,
            emailAddress,
            nationality,
            releaseDocument
        } } = this.state;

        const releasePayload = {
            firstName,
            lastName,
            idType,
            idNumber,
            contactNumber,
            emailAddress,
            nationality
        };

        UserService.releaseVehicle(zoneLabel, slotNumber, releasePayload)
            .then((response) => {
                const { id: vehicleId } = response.data;
                UserService.uploadReleaseDocument(vehicleId, releaseDocument)
                    .then((response) => {
                        this.setState({
                            isVehicleReleaseDone: true
                        });        
                        this.props.closeForm();
                        this.props.closeGridSvg();
                        this.props.callZoneSummaryService();
                        
                    })
                    .catch((error) => {
                        window.alert("document upload failed");
                    });
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

    changeReleaseDocument = (event) => {
        const fileUpload = event.target.files[0];
        const { releasePayload } = this.state;
        this.setState({
            releasePayload: {
                ...releasePayload,
                releaseDocument: fileUpload
            }
        });
    }

    render = () => {
        const { releasePayload: {
            firstName, lastName, emailAddress, idNumber, idType, contactNumber, nationality
        }} = this.state;

        return (
            <Container>
                <Form onSubmit={this.hitRelease}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">First Name *</Form.Label>
                            <Form.Control type="text" required={true} value={firstName} onChange={this.changeFirstName}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Last Name *</Form.Label>
                            <Form.Control type="text" required={true} value={lastName} onChange={this.changeLastName}/>
                        </Form.Group>
                        
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Contact Number *</Form.Label>
                            <Form.Control type="text" required={true} value={contactNumber} onChange={this.changeContactNumber}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Email Address *</Form.Label>
                            <Form.Control type="email" required={true} value={emailAddress} onChange={this.changeEmailAddress}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>    
                            <Form.Label className="required_form_label">ID Type *</Form.Label>
                            <Form.Select required={true} value={idType} onChange={this.changeIdType}>
                                <option value="Passport">Passport</option>
                                <option value="Emirates ID">Emirates ID</option>
                                <option value="National ID">National ID</option>
                                <option value="Driving License">Driving License</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Nationality *</Form.Label>
                            <Form.Control type="text" required={true} value={nationality} onChange={this.changeNationality}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">ID Number *</Form.Label>
                            <Form.Control type="text" required={true} value={idNumber} onChange={this.changeIdNumber} />
                        </Form.Group>
                    </Row>
                    <Row classname="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Release Document *</Form.Label>
                            <Form.Control type="file" required onChange={this.changeReleaseDocument} />
                        </Form.Group>
                    </Row>
                   
                    <div id="button_container">
                            <Button type="submit" variant="secondary">Release</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default ReleaseCarForm;