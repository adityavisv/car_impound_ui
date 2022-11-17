import React from 'react';
import { Form, Col, Row, Button, Alert, Carousel } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import '../styles/carregistrationcomponent.css';
import UserService from '../services/user.service';
import LoginRedirectModal from './LoginRedirectModal';
import 'bootstrap/dist/css/bootstrap.css';

class CarRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        var { selectedSlot = [], vehicle = {} } = this.props;
        
        var parkingSlot = '';
        
        const readOnly = vehicle && Object.keys(vehicle).length > 0;
        if (readOnly) {
            if (vehicle.releaseIdentity === null) {
                vehicle = {...vehicle, releaseIdentity: {}}
            }
        }
        else  {
            if (selectedSlot.length === 1) {
                parkingSlot = selectedSlot[0].zoneLabel + selectedSlot[0].slotNumber;
            }
            else if (selectedSlot.length === 2) {
                parkingSlot = `${selectedSlot[0].zoneLabel}${selectedSlot[0].slotNumber},${selectedSlot[1].zoneLabel}${selectedSlot[1].slotNumber}`;
            }
        }
            

        const { 
                make = '',
                model = '',
                registrationDateTime = new Date(),
                estimatedReleaseDate = '',
                caseNumber = '', 
                mulkiaNumber = '',
                color = '',
                parkingSlot: parkingSlotPreFill = '', 
                images = [],
                isCaseInCourt = false, 
                isCarToBeAuctioned = false, 
                numberPlate = '', 
                department = 'CID', 
                owner: {
                    firstName = '', 
                    lastName = '', 
                    emailAddress = '', 
                    idType = 'Passport', 
                    idNumber = '', 
                    contactNumber = '', 
                    nationality = ''
                } = {},
                releaseIdentity: {
                    firstName: releaseFirstName = '',
                    lastName: releaseLastName = '',
                    idNumber: releaseIdNumber = '',
                    contactNumber: releaseContactNum = '',
                    nationality: releaseNationality = '',
                    idType: releaseIdType = '',
                    emailAddress: releaseEmailAddress = '',
                    releaseDateTime = '',
                } = {}
        } = vehicle;

        // const { 
        //     firstName: releaseFirstName = '', lastName: releaseLastName = '', 
        //     emailAddress: releaseEmailAddress = '', idType: releaseIdType = 'Passport',
        //     idNumber: releaseIdNumber = '', contactNumber: releaseContactNum = '',
        //     nationality: releaseNationality = ''} = vehicle.release !== undefined ? vehicle.release : {};
        
        this.state = {
            selectedSlot,
            shouldShowRedirectLoginModal: false,
            readOnly,
            isVehicleAssignStarted: false,
            isVehicleAssignDone: false,
            newVehiclePayload: {
                make,
                model,
                registrationDateTime,
                registrationDate: readOnly ? registrationDateTime.split(" ")[0] : '',
                registrationTime: readOnly ? registrationDateTime.split(" ")[1]: '',
                caseNumber,
                mulkiaNumber,
                images: readOnly ? images : [],
                color,
                parkingSlot: readOnly ? parkingSlotPreFill : parkingSlot,
                isCaseInCourt,
                isCarToBeAuctioned,
                numberPlate,
                estimatedReleaseDate,
                owner: {
                    firstName,
                    lastName,
                    emailAddress,
                    idType,
                    idNumber,
                    contactNumber,
                    nationality
                },
                releaseIdentity: {
                    firstName: releaseFirstName,
                    lastName: releaseLastName,
                    nationality: releaseNationality,
                    idType: releaseIdType,
                    idNumber: releaseIdNumber,
                    contactNumber: releaseContactNum,
                    emailAddress: releaseEmailAddress,
                    releaseDate: releaseDateTime !== null ? releaseDateTime.split(" ")[0] : '',
                    releaseTime: releaseDateTime !== null ? releaseDateTime.split(" ")[1] : ''
                },
                department: readOnly ? department : 'CID'
            }
        };;
    }

    showRedirectLoginModal = () => {
        this.setState({
            shouldShowRedirectLoginModal: true
        });
    }

    hideRedirectLoginModal = () => {
        this.setState({
            shouldShowRedirectLoginModal: false
        });
        this.props.callLogout();
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

    changeCaseNumber = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                caseNumber: event.target.value
            }
        });
    }

    changeMulkiaNumber = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                mulkiaNumber: event.target.value
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

    changeEstimatedReleaseDate = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                estimatedReleaseDate: event.target.value
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

    changeRegistrationTime = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                registrationTime: event.target.value
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

    changeFirstName = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                owner: {
                    ...newVehiclePayload.owner,
                    firstName: event.target.value
                }
            }
        });
    }

    changeLastName = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                owner: {
                    ...newVehiclePayload.owner,
                    lastName: event.target.value
                }
            }
        });
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

    changeImage = (event) => {
        const fileUpload = event.target.files[0];
        const { newVehiclePayload } = this.state;
        var { images } = newVehiclePayload;
        images.push(fileUpload);
        this.setState({
           newVehiclePayload: {
               ...newVehiclePayload,
               images
           }
        });
    }

    submitVehicle = (event) => {
        event.preventDefault();
        this.setState({
            isVehicleAssignStarted: true
        });

        const { newVehiclePayload: {
            make,
            model,
            registrationDate,
            registrationTime,
            caseNumber,
            mulkiaNumber,
            images,
            color,
            parkingSlot,
            isCaseInCourt,
            isCarToBeAuctioned,
            numberPlate,
            department,
            owner,
            estimatedReleaseDate
        }, selectedSlot } = this.state;
        const finalPayload = {
            make,
            model,
            registrationDateTime: registrationDate + ' ' + registrationTime,
            estimatedReleaseDate,
            caseNumber,
            mulkiaNumber,
            color,
            parkingSlot,
            isCaseInCourt,
            isCarToBeAuctioned,
            numberPlate,
            owner,
            department
        };
        const spotParams = Array.from(selectedSlot).map((item, index) =>(
            `${item.zoneLabel}${item.slotNumber}`
        ));

        UserService.assignCarToSpot(finalPayload, spotParams)
            .then((response) => {
                const { data: {parkingSpots}} = response;
                const { occupiedVehicle: {id: vehicleId}} = parkingSpots[0];
                if (images.length > 0) {
                    UserService.assignImageToVehicle(vehicleId, images)
                    .then((nestedResponse) => {
                        this.setState({
                            isVehicleAssignDone: true,
                            isVehicleAssignStarted: false
                        });
                        this.props.closeForm();
                        this.props.closeGridSvg();
                        this.props.callZoneSummaryService();
                    })
                    .catch((nestedError) => {
                        if (nestedError.response !== undefined && nestedError.response.status === 401) {
                            this.showRedirectLoginModal();
                        }
                        else {
                            this.props.closeForm();
                        }
                    });
                }
                else {
                    this.setState({
                        isVehicleAssignDone: true,
                        isVehicleAssignStarted: false
                    });
                    this.props.closeForm();
                    this.props.closeGridSvg();
                    this.props.callZoneSummaryService();
                }
               
            })
            .catch((error) => {
                if (error.response !== undefined && error.response.status === 401) {
                    this.showRedirectLoginModal();
                }
            });   
        
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
        const { shouldShowRedirectLoginModal, readOnly,
            newVehiclePayload: {
            make, model, registrationDate, registrationTime, caseNumber, mulkiaNumber, color, parkingSlot, isCaseInCourt, isCarToBeAuctioned, estimatedReleaseDate,
            numberPlate, department, remarks, images, owner: { firstName, lastName, emailAddress, idType, idNumber, contactNumber, nationality },
            releaseIdentity: {firstName: releaseFirstName, lastName: releaseLastName, emailAddress: releaseEmailAddress, idType: releaseIdType,
            idNumber: releaseIdNumber, contactNumber: releaseContactNum, nationality: releaseNationality, releaseDate, releaseTime}
        } } = this.state
        return (
            <LoadingOverlay active={this.shouldShowLoadingScreen()} spinner text='Saving vehicle...'>
                {readOnly ? <Alert variant="info">You are viewing a read-only report of this registration</Alert> : null}
                <Form onSubmit={this.submitVehicle}>
                    <Row className="mb-3">
                        <Form.Text className="form_text">Vehicle Information</Form.Text>
                    </Row>
                    { readOnly ?
                    <Row className="mb-3">
                       <Form.Group as={Col}>
                           <Row className="mb-3">
                                <Form.Label className="required_form_label">Make *</Form.Label>
                                <Form.Control type="text"  required={true} value={make} onChange={this.changeMake} disabled={readOnly}/>
                           </Row>
                           <Row className="mb-3">
                                <Form.Label className="required_form_label">Model *</Form.Label>
                                <Form.Control type="text"  required={true} value={model} onChange={this.changeModel} disabled={readOnly}/>
                           </Row>
                           <Row className="mb-3">
                                <Form.Label className="required_form_label">Colour *</Form.Label>
                                <Form.Control type="text"  required={true} value={color} onChange={this.changeColor} disabled={readOnly}/>
                           </Row>
                       </Form.Group>
                      
                        <Form.Group as={Col}>
                            {images.length > 0 ?
                                <Carousel variant="dark">
                                    {Array.from(images).map((image, index) => (
                                        <Carousel.Item>
                                            <img
                                                src={"data:image/png;base64," + image}
                                                width="200"
                                                height="200"
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel> : <></>}
                        </Form.Group>
                    </Row> : 
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Make *</Form.Label>
                            <Form.Control type="text"  required={true} value={make} onChange={this.changeMake} disabled={readOnly}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Model *</Form.Label>
                            <Form.Control type="text"  required={true} value={model} onChange={this.changeModel} disabled={readOnly}/>
                        </Form.Group> 

                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Colour *</Form.Label>
                            <Form.Control type="text"  required={true} value={color} onChange={this.changeColor} disabled={readOnly}/>
                        </Form.Group>
                                    </Row> }
                    
                    <Row className="mb-3">
                        <Form.Text className="form_text">Registration</Form.Text>
                    </Row>
                   
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Department *</Form.Label>
                            <Form.Select required={true} onChange={this.changeDepartment} value={department} disabled={readOnly}>
                                <option value="CID">CID</option>
                                <option value="DRUGS">Drugs</option>
                                <option value="ALCOHOL">Alcohol</option>
                                <option value="TRAFFIC">Traffic</option>
                                <option value="ACCIDENT_AND_OTHER">Accident and other</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Car No. Plate *</Form.Label>
                            <Form.Control type="text" required={true} value={numberPlate} onChange={this.changeNumberPlate} disabled={readOnly}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Registration Date *</Form.Label>
                               <Form.Control type="date" disabled={readOnly} required={true} value={registrationDate} onChange={this.changeRegistrationDate} data-date-format="DD/MM/YYYY" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Registration Time* </Form.Label>
                            <Form.Control type="time" disabled={readOnly} required={true} value={registrationTime} onChange={this.changeRegistrationTime} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Case Number *</Form.Label>
                            <Form.Control type="text"  required={true} value={caseNumber} onChange={this.changeCaseNumber} disabled={readOnly} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Mulkia Number *</Form.Label>
                            <Form.Control type="text"  required={true} value={mulkiaNumber} onChange={this.changeMulkiaNumber} disabled={readOnly} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Parking Slot Num. *</Form.Label>
                            <Form.Control type="text" disabled value={parkingSlot} disabled />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type="date" value={estimatedReleaseDate} onChange={this.changeEstimatedReleaseDate} disabled={readOnly} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Case in Court Status:</Form.Label>
                            <Form.Select onChange={this.changeIsCaseInCourt} value={isCaseInCourt ? 'Yes' : 'No'} disabled={readOnly}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>To Auction?</Form.Label>
                            <Form.Select onChange={this.changeIsCarToBeAuctioned} value={isCarToBeAuctioned ? 'Yes' : 'No'} disabled={readOnly}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    {! readOnly ? 
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Image 1</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage} size="sm"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image 2</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage} size="sm"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image 3</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage} size="sm"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image 4</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage} size="sm"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image 5</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage} size="sm"/>
                        </Form.Group>
                    </Row> : <></>}
                    <Row className="mb-3">
                    
                    </Row>
                    
                    <Row className="mb-3">
                        <Form.Label>Remarks:</Form.Label>
                        <Form.Control as="textarea" rows={3} value={remarks} onChange={this.changeRemarks} disabled={readOnly} />
                    </Row>
                    <Row className="mb-3">
                        <Form.Text className="form_text">
                            Owner Profile
                        </Form.Text>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={this.changeFirstName}  disabled={readOnly} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={this.changeLastName} disabled={readOnly} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group as={Col}>
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="text"  value={nationality} onChange={this.changeNationality} disabled={readOnly} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID Type</Form.Label>
                            <Form.Select onChange={this.changeIdType} value={idType} disabled={readOnly} >
                                <option value="Passport}">Passport</option>
                                <option value="Emirates ID">Emirates ID</option>
                                <option value="National ID">National ID</option>
                                <option value="Driving License">Driving License</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text"  value={idNumber} onChange={this.changeIdNumber} disabled={readOnly} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control type="text"  value={contactNumber} onChange={this.changeContactNumber} disabled={readOnly}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={emailAddress} onChange={this.changeEmailAddress} disabled={readOnly}/>
                        </Form.Group>
                    </Row>
                    {parkingSlot === null ? <>
                    <Row className="mb-3">
                        <Form.Text className="form_text">
                            Release Identity
                        </Form.Text>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={releaseFirstName} disabled={true} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={releaseLastName} disabled />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type="date" value={releaseDate} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Release Time</Form.Label>
                            <Form.Control type="time" value={releaseTime} disabled />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="text" value={releaseNationality} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID Type</Form.Label>
                            <Form.Select  value={releaseIdType} disabled >
                                <option value="Passport}">Passport</option>
                                <option value="Emirates ID">Emirates ID</option>
                                <option value="National ID">National ID</option>
                                <option value="Driving License">Driving License</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control type="text" disabled value={releaseIdNumber} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control type="text" value={releaseContactNum} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" value={releaseEmailAddress} disabled />
                        </Form.Group>
                    </Row></> : <></>}

                   

                    <div id="button_container">
                        {readOnly ? <></> : <Button type="submit" variant="primary">Register</Button>}
                    </div>
                </Form>

               <LoginRedirectModal
                    shouldShowRedirectLoginModal={shouldShowRedirectLoginModal}
                    hideRedirectLoginModal={this.hideRedirectLoginModal}
                />

            </LoadingOverlay>
        )
    };
}

export default CarRegistrationForm;