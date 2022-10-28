import React from 'react';
import { Form, Col, Row, Button, ProgressBar } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';
import LoadingOverlay from 'react-loading-overlay';
import '../styles/carregistrationcomponent.css';
import UserService from '../services/user.service';


class CarRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSlot: this.props.selectedSlot,
            newVehiclePayload: {
                make: '',
                model: '',
                registrationDateTime: '',
                registrationDate: '',
                registrationTime: '',
                caseNumber: '',
                mulkiaNumber: '',
                color: '',
                parkingSlot: this.props.selectedSlot.zoneLabel + this.props.selectedSlot.slotNumber,
                isCaseInCourt: false,
                isCarToBeAuctioned: false,
                numberPlate: '',
                owner: {
                    firstName: '',
                    lastName: '',
                    emailAddress: '',
                    idType: '',
                    idNumber: '',
                    contactNumber: '',
                    nationality: ''
                },
                department: ''

            },
            isVehicleAssignStarted: false,
            isVehicleAssignDone: false,
        };;
    }

    changeMake = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                make: event.target.value
            }
        })
    }

    changeModel = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                model: event.target.value
            }
        });
    }


    changeRegistrationDate = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                registrationDate: event.target.value
            }
        });
    }

    changeCaseNumber = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                caseNumber: parseInt(event.target.value)
            }
        });
    }

    changeMulkiaNumber = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                mulkiaNumber: parseInt(event.target.value)
            }
        });
    }


    changeColor = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                color: event.target.value
            }
        });
    }

    changeIsCaseInCourt = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                isCaseInCourt: event.target.value === 'Yes'
            }
        });
    }

    changeIsCarToBeAuctioned = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                isCarToBeAuctioned: event.target.value === 'Yes'
            }
        });
    }

    changeReleaseDate = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                releasedate: event.target.value
            }
        });
    }

    changeRegistrationTime = (value) => {
        var hours = parseInt(value / 3600);
        var minutes = (value % 3600) / 60;
        var hoursStr = ''
        if (hours < 10) {
            hoursStr = `0${hours}`;
        }
        else {
            hoursStr = `${hours}`;
        }

        var timeStr = `${hours}`
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                registrationTime: `${hoursStr}:${minutes}`
            }
        });
    }

    changeNumberPlate = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                numberPlate: event.target.value
            }
        });
    }

    changeDepartment = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                department: event.target.value
            }
        });
    }

    changeRemarks = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                remarks: event.target.value
            }
        });
    }

    changeIdType = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                owner: {
                    ...newVehiclePayload.owner,
                    idType: event.target.value
                }
            }
        });
    }

    changeIdNumber = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                owner: {
                    ...newVehiclePayload.owner,
                    idNumber: event.target.value
                }
            }
        })
    }

    changeContactNumber = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                owner: {
                    ...newVehiclePayload.owner,
                    contactNumber: event.target.value
                }
            }
        });
    }

    changeNationality = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                owner: {
                    ...newVehiclePayload.owner,
                    nationality: event.target.value
                }
            }
        })
    }

    changeName = (event) => {
        const { newVehiclePayload } = this.state;
        const names = event.target.value.split(" ");
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                owner: {
                    ...newVehiclePayload.owner,
                    firstName: names[0],
                    lastName: names[1],
                    name: event.target.value,
                }
            }
        });
    }

    changeEmailAddress = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                owner: {
                    ...newVehiclePayload.owner,
                    emailAddress: event.target.value
                }
            }
        });
    }

    submitVehicle = (event) => {
        event.preventDefault();
        this.setState({
            isVehicleAssignStarted: true
        });
        var { newVehiclePayload, selectedSlot: {zoneLabel, slotNumber } } = this.state;
        const { registrationTime, registrationDate } = newVehiclePayload;
        newVehiclePayload = {
            ...newVehiclePayload,
            registrationDateTime: registrationDate + ' ' + registrationTime
        }
        UserService.assignCarToSpot(newVehiclePayload, zoneLabel, slotNumber)
            .then((response) => {
                this.setState({
                    isVehicleAssignDone: true
                });
                this.props.closeForm();
                this.props.closeGridSvg();
                this.props.callZoneSummaryService();
                
            })
            .catch((error) => {
                
            })
    }

    shouldShowLoadingScreen = () => {
        const {isVehicleAssignStarted, isVehicleAssignDone} = this.state;
        if (isVehicleAssignStarted) {
            if (isVehicleAssignDone)
                return false;
            else
                return true;
        }
        return false;
    }

    render = () => {
        const { newVehiclePayload: {
            make, model, registrationDate, registrationTime, caseNumber, mulkiaNumber, color, parkingSlot, isCaseInCourt, isCarToBeAuctioned, releaseDate,
            numberPlate, department, remarks, owner: { name, emailAddress, idType, idNumber, contactNumber, nationality }
        } } = this.state
        return (
            <LoadingOverlay active={this.shouldShowLoadingScreen()} spinner text='Saving vehicle...'>
                <Form onSubmit={this.submitVehicle}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Vehicle Make *</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true} value={make} onChange={this.changeMake}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Vehicle Model *</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true} value={model} onChange={this.changeModel}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Vehicle Colour *</Form.Label>
                            <Form.Control type="text" placeholder="color" required={true} value={color} onChange={this.changeColor}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Department *</Form.Label>
                            <Form.Select required={true} onChange={this.changeDepartment} value={department}>
                                <option value="Country 1">Country 1</option>
                                <option value="Country 2">Country 2</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Car No. Plate</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true} value={numberPlate} onChange={this.changeNumberPlate}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Reg Date *</Form.Label>
                            <Form.Control type="date" placeholder="text" required={true} value={registrationDate} onChange={this.changeRegistrationDate}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Reg Time *</Form.Label>
                            <TimePicker required={true} value={registrationTime} onChange={this.changeRegistrationTime} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Case Number *</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true} value={caseNumber} onChange={this.changeCaseNumber} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Mulkia Number *</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true} value={mulkiaNumber} onChange={this.changeMulkiaNumber} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Parking Slot Num. *</Form.Label>
                            <Form.Control type="text" disabled={true} value={parkingSlot} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>ID Type</Form.Label>
                            <Form.Select required={true} onChange={this.changeIdType} value={idType}>
                                <option value="Passport}">Passport</option>
                                <option value="Emirates ID">Emirates ID</option>
                                <option value="National ID">National ID</option>
                                <option value="Driving License">Driving License</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text" placeholder="text" value={idNumber} onChange={this.changeIdNumber}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true} value={name} onChange={this.changeName} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true} value={nationality} onChange={this.changeNationality}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control type="text" placeholder="text" required={true} value={contactNumber} onChange={this.changeContactNumber}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required={true} value={emailAddress} onChange={this.changeEmailAddress}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type="date" required={true} value={releaseDate} onChange={this.changeReleaseDate}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Case in Court Status:</Form.Label>
                            <Form.Select required={true} onChange={this.changeIsCaseInCourt} value={isCaseInCourt ? 'Yes' : 'No'}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>To Auction?</Form.Label>
                            <Form.Select required={true} onChange={this.changeIsCarToBeAuctioned} value={isCarToBeAuctioned ? 'Yes' : 'No'}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Label>Remarks:</Form.Label>
                        <Form.Control as="textarea" rows={3} required={true} value={remarks} onChange={this.changeRemarks}/>
                    </Row>

                    <div id="button_container">
                        <Button type="submit" variant="primary">Register</Button>
                    </div>
                </Form>

            </LoadingOverlay>
        )
    };
}

export default CarRegistrationForm;