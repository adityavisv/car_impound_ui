import React from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import UserService from '../services/user.service';
import LoginRedirectModal from './LoginRedirectModal';
import '../styles/releasecarform.css';

class ReleaseCarForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSlot: this.props.selectedSlot,
            isVehicleReleaseStarted: false,
            isVehicleReleaseDone: false,
            fileSelected: false,
            isIdTypeOther: false,
            shouldShowLoginRedirectModal: false,
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
        const { selectedSlot: {zoneLabel, slotNumber}, fileSelected, releasePayload: {
            firstName,
            lastName,
            idType,
            idNumber,
            contactNumber,
            emailAddress,
            nationality,
            releaseDocument,
            releaseDocumentNumber,
        } } = this.state;

        const releasePayload = {
            firstName,
            lastName,
            idType,
            idNumber,
            contactNumber,
            emailAddress,
            nationality,
            releaseDocumentNumber
        };

        UserService.releaseVehicle(zoneLabel, slotNumber, releasePayload)
            .then((response) => {
                const { id: vehicleId } = response.data;
                if (fileSelected) {
                    UserService.uploadReleaseDocument(vehicleId, releaseDocument)
                    .then((response) => {
                        this.setState({
                            isVehicleReleaseDone: true
                        });        
                        this.props.closeForm();
                        if (this.props.closeGridSvg !== undefined && this.props.callZoneSummaryService !== undefined) {
                            this.props.closeGridSvg();
                            this.props.callZoneSummaryService();
                        }
                        if (this.props.callUpcomgingReleasesService !== undefined && this.props.closeResultModal !== undefined) {
                            this.props.closeResultModal();
                            this.props.callUpcomgingReleasesService();
                        }
                        
                        
                    })
                    .catch((error) => {
                        if (error.response !== undefined && error.response.status !== undefined) {
                            if (error.response.status === 401)
                                this.setState({
                                    shouldShowRedirectLoginModal: true
                                });
                        }
                        
                    });
                }
                else {
                    this.setState({
                        isVehicleReleaseDone: true
                    });        
                    this.props.closeForm();
                    if (this.props.closeGridSvg !== undefined && this.props.callZoneSummaryService !== undefined) {
                        this.props.closeGridSvg();
                        this.props.callZoneSummaryService();
                    }
                    if (this.props.callUpcomgingReleasesService !== undefined && this.props.closeResultModal !== undefined) {
                        this.props.closeResultModal();
                        this.props.callUpcomgingReleasesService();
                    }
                }

                
            })
            .catch((error) =>{
                if (error.response !== undefined && error.response.status !== undefined) {
                    if (error.response.status === 401) {
                        this.setState({
                            shouldShowRedirectLoginModal: true
                        });
                    }
                }
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
            fileSelected: true,
            releasePayload: {
                ...releasePayload,
                releaseDocument: fileUpload
            }
        });
    }

    changeReleaseDocumentNumber = (event) => {
        const { releasePayload } = this.state;
        this.setState({
            releasePayload: {
                ...releasePayload,
                releaseDocumentNumber: event.target.value
            }
        });
    }

    toggleIdTypeInputMode = (event) => {
        const { isIdTypeOther } = this.state;
        this.setState({
            isIdTypeOther: ! isIdTypeOther
        });
    }

    hideRedirectLoginModal = () => {
        this.setState({
            shouldShowRedirectLoginModal: false
        });
        this.props.callLogout();
    }

    render = () => {
        const { shouldShowRedirectLoginModal, isIdTypeOther, releasePayload: {
            firstName, lastName, emailAddress, idNumber, idType, contactNumber, nationality, releaseDocumentNumber,
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
                            {
                                isIdTypeOther ? <Form.Control type="text" value={idType} onChange={this.changeIdType} />
                                :
                                <Form.Select required={true} value={idType} onChange={this.changeIdType}>
                                    <option value="Passport">Passport</option>
                                    <option value="Emirates ID">Emirates ID</option>
                                    <option value="National ID">National ID</option>
                                    <option value="Driving License">Driving License</option>
                                </Form.Select>
                            }
                            <Form.Check type="switch" label="Select other ID type" onChange={this.toggleIdTypeInputMode}/>
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
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Release Document Number</Form.Label>
                            <Form.Control type="text" value={releaseDocumentNumber} onChange={this.changeReleaseDocumentNumber} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Release Document</Form.Label> 
                            <Form.Control type="file"  onChange={this.changeReleaseDocument} />
                        </Form.Group>
                    </Row>
                   
                    <div id="button_container">
                            <Button type="submit" variant="secondary">Approve Release</Button>
                    </div>
                </Form>
                <LoginRedirectModal
                    shouldShowRedirectLoginModal={shouldShowRedirectLoginModal}
                    hideRedirectLoginModal={this.hideRedirectLoginModal}
                />
            </Container>
        );
    }
}

export default ReleaseCarForm;