import React from 'react';
import { Form, Col, Row, Button, Alert, Carousel } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import '../styles/carregistrationcomponent.css';
import UserService from '../services/user.service';
import LoginRedirectModal from './LoginRedirectModal';
import 'bootstrap/dist/css/bootstrap.css';
import { makeModelData } from '../newcardb';
import { getAllModelsByMake, generateFileObjectsFromData } from '../helpers/generalhelpers';
import { EMIRATES_CATEGORY_CODE_MAP } from '../constants/constants';

class CarRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        var { selectedSlot = [], vehicle = {}, updateMode } = this.props;
        
        var parkingSlot = '';
        
        const readOnly = vehicle && Object.keys(vehicle).length > 0 && (! updateMode);
        if (readOnly || updateMode) {
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
            

        const allMakes = makeModelData.map((value) => (
            value.brand
        ));

        const {
                id: vehicleId = '', 
                make = '',
                model = '',
                type = '',
                registrationDateTime = new Date(),
                estimatedReleaseDate = '',
                caseNumber = '',
                chassisNumber = '',
                color = '',
                parkingSlot: parkingSlotPreFill = '', 
                images,
                isWanted = false,
                numberPlate = '', 
                department = '',
                category = '',
                emirate = '',
                code = '',
                remarks = '',
                owner: {
                    firstName = '', 
                    lastName = '', 
                    emailAddress = '', 
                    idType = '', 
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
            makesDropDownValues: [... new Set(allMakes)],
            modelsDropDownValues: [... new Set(getAllModelsByMake(readOnly || updateMode ? make : 'Alfa Romeo'))],
            shouldShowRedirectLoginModal: false,
            readOnly,
            updateMode,
            isVehicleAssignStarted: false,
            isVehicleAssignDone: false,
            isMakeOther: false,
            isModelOther: false,
            isTypeOther: false,
            isColorOther: false,
            isEmirateOther: false,
            isCategoryOther: false,
            isCodeOther: false,
            newVehiclePayload: {
                vehicleId,
                make,
                model,
                type,
                registrationDateTime,
                registrationDate: readOnly || updateMode ? registrationDateTime.split(" ")[0] : '',
                registrationTime: readOnly || updateMode ? registrationDateTime.split(" ")[1]: '',
                caseNumber,
                chassisNumber,
                images: readOnly && (!updateMode) ? images : [],
                imagesInput: generateFileObjectsFromData(updateMode ? images : []),
                color,
                parkingSlot: readOnly || updateMode ? parkingSlotPreFill : parkingSlot,
                isWanted,
                numberPlate,
                estimatedReleaseDate: readOnly || updateMode ? (estimatedReleaseDate !== null ? estimatedReleaseDate.split(" ")[0] : '') : '',
                category,
                code,
                emirate,
                remarks,
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
                department: readOnly || updateMode ? department : ''
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
        const { newVehiclePayload, isMakeOther } = this.state;
        const make = event.target.value;
        const getNewModelsByMake = getAllModelsByMake(make);
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                make,      
            },
            modelsDropDownValues: [... new Set(getNewModelsByMake)]
        });
    }

    changeModel = (event) => {
        const { newVehiclePayload, isModelOther } = this.state;
        const { value: model } = event.target;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                model
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

    changeChassisNumber = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                chassisNumber: event.target.value
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

    changeType = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                type: event.target.value
            }
        });
    }

    changeIsWanted = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                isWanted: event.target.value === 'Yes'
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

    changeEmirate = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                emirate: event.target.value
            }
        });
    }

    changeCategory = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                category: event.target.value
            }
        });
    }

    changeCode = (event) => {
        const { newVehiclePayload } = this.state;
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                code: event.target.value
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

    changeImage1 = (event) => {
        const fileUpload = event.target.files[0];
        const { newVehiclePayload } = this.state;
        var { imagesInput } = newVehiclePayload;
        if (imagesInput.size < 1) {
            imagesInput.push(fileUpload);
        }
        else {
            imagesInput[0] = fileUpload;
        }
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                imagesInput
            }
        });
    }

    changeImage2 = (event) => {
        const fileUpload = event.target.files[0];
        const { newVehiclePayload } = this.state;
        var { imagesInput } = newVehiclePayload;
        if (imagesInput.size < 2) {
            imagesInput.push(fileUpload);
        }
        else {
            imagesInput[1] = fileUpload;
        }
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                imagesInput
            }
        });
    }

    changeImage3 = (event) => {
        const fileUpload = event.target.files[0];
        const { newVehiclePayload } = this.state;
        var { imagesInput } = newVehiclePayload;
        if (imagesInput.size < 3) {
            imagesInput.push(fileUpload);
        }
        else {
            imagesInput[2] = fileUpload;
        }
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                imagesInput
            }
        });
    }

    changeImage4 = (event) => {
        const fileUpload = event.target.files[0];
        const { newVehiclePayload } = this.state;
        var { imagesInput } = newVehiclePayload;
        if (imagesInput.size < 4) {
            imagesInput.push(fileUpload);
        }
        else {
            imagesInput[3] = fileUpload;
        }
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                imagesInput
            }
        });
    }

    changeImage5 = (event) => {
        const fileUpload = event.target.files[0];
        const { newVehiclePayload } = this.state;
        var { imagesInput } = newVehiclePayload;
        if (imagesInput.size < 5) {
            imagesInput.push(fileUpload);
        }
        else {
            imagesInput[4] = fileUpload;
        }
        this.setState({
            newVehiclePayload: {
                ...newVehiclePayload,
                imagesInput
            }
        });
    }

    


    toggleCategoryInputMode = (event) => {
        const { isCategoryOther } = this.state;
        this.setState({
            isCategoryOther: !isCategoryOther
        });
    }

    toggleColorInputMode = (event) => {
        const { isColorOther } = this.state;
        this.setState({
            isColorOther: ! isColorOther
        });
    }

    toggleCodeInputMode = (event) => {
        const { isCodeOther } = this.state;
        this.setState({
            isCodeOther: ! isCodeOther
        });
    }

    toggleMakeInputMode = (event) => {
        const { isMakeOther } = this.state;
        this.setState({
            isMakeOther: ! isMakeOther
        });
    }

    toggleModelInputMode = (event) => {
        const { isModelOther } = this.state;
        this.setState({
            isModelOther: ! isModelOther
        });
    }

    toggleTypeInputMode = (event) => {
        const { isTypeOther } = this.state;
        this.setState({
            isTypeOther: ! isTypeOther
        });
    }

    toggleEmirateInputMode = (event) => {
        const { isEmirateOther } = this.state;
        this.setState({
            isEmirateOther: ! isEmirateOther
        });
    }

    submitVehicle = (event) => {
        event.preventDefault();
        this.setState({
            isVehicleAssignStarted: true
        });

        const { updateMode, newVehiclePayload: {
            vehicleId = '',
            make,
            model,
            type,
            color,
            department,
            numberPlate,
            chassisNumber,
            registrationDate,
            registrationTime,
            isWanted,
            caseNumber,
            estimatedReleaseDate,
            parkingSlot,
            emirate,
            category,
            code,
            imagesInput,
            remarks,
            owner,
        }, selectedSlot } = this.state;
        const finalPayload = {
            make,
            model,
            type,
            color,
            department,
            numberPlate,
            chassisNumber,
            registrationDateTime: registrationDate + ' ' + registrationTime,
            isWanted,
            caseNumber,
            estimatedReleaseDate,
            parkingSlot,
            emirate,
            category,
            code,
            remarks,
            owner
        };
        const spotParams = Array.from(selectedSlot).map((item, index) =>(
            `${item.zoneLabel}${item.slotNumber}`
        ));

        if (updateMode) {
            UserService.updateVehicleDetails(vehicleId, finalPayload)
                .then((response) => {
                    if (imagesInput.length > 0) {
                        UserService.assignImageToVehicle(vehicleId, imagesInput)
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
                })
        }
        else {
            UserService.assignCarToSpot(finalPayload, spotParams)
                .then((response) => {
                    const { data: {parkingSpots}} = response;
                    const { occupiedVehicle: {id: vehicleId}} = parkingSpots[0];
                    if (imagesInput.length > 0) {
                        UserService.assignImageToVehicle(vehicleId, imagesInput)
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

    populateCategoryDropdown = () => {
        const { newVehiclePayload: {emirate}} = this.state;
        const emirateMapData = EMIRATES_CATEGORY_CODE_MAP.filter((element) => (
            element.emirate === emirate
        ));
        if (emirateMapData !== undefined && emirateMapData.length > 0) {
            const options = Array.from(emirateMapData[0].categories).map((item) => (
                <option value={item.display}>{item.display}</option>
            ));
            return (
                <>
                    {options}
                </>
            );
        }
        return null;
       
    }

    populateCodeDropdown = () => {
        const { newVehiclePayload: {emirate, category}} = this.state;
        const emirateMapData = EMIRATES_CATEGORY_CODE_MAP.filter((element) => (
            element.emirate === emirate
        ));
        if (emirateMapData.length > 0) {
            const categoryObject = emirateMapData[0].categories.filter((element) => (element.value === category));
            if (categoryObject.length > 0) {
                const codeOptions = Array.from(categoryObject[0].codes).map((item) => (
                    <option value={item.display}>{item.display}</option>
                ));
                return (
                    <>
                        {codeOptions}
                    </>
                );
            }
            else {
                return (
                    <>
                    </>
                );
            }
        }
        return null;
    }

    render = () => {
        const { 
            shouldShowRedirectLoginModal,
            isMakeOther,
            isModelOther,
            isTypeOther,
            isColorOther,
            isEmirateOther,
            isCategoryOther,
            isCodeOther,
            readOnly,
            updateMode,
            makesDropDownValues,
            modelsDropDownValues,
            newVehiclePayload: {
            make,
            model,
            type,
            color,
            department,
            numberPlate,
            chassisNumber,
            registrationDate,
            registrationTime,
            isWanted,
            caseNumber,
            estimatedReleaseDate,
            parkingSlot,
            emirate,
            category,
            code,
            images,
            imagesInput,
            remarks,
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
                emailAddress: releaseEmailAddress,
                idType: releaseIdType,
                idNumber: releaseIdNumber,
                contactNumber: releaseContactNumber,
                nationality: releaseNationality,
                releaseDate,
                releaseTime
            }
        }, selectedSlot } = this.state;
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
                               <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">Make *</Form.Label>
                                    <Form.Control type="text" readOnly disabled value={make} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">Model *</Form.Label>
                                    <Form.Control type="text" readOnly disabled value={model} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">Vehicle Type *</Form.Label>
                                    <Form.Control type="text" readOnly disabled value={type} />
                                </Form.Group>
                                
                           </Row>
                           <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">Colour *</Form.Label>
                                    <Form.Control type="text"  required={true} value={color} disabled={readOnly} readOnly={true}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">Chassis Number *</Form.Label>
                                    <Form.Control type="text" value={chassisNumber} disabled={readOnly} readOnly={true} />
                                </Form.Group>
                           </Row>
                           <Row className="mb-3">
                               <Form.Group as={Col}>
                                   <Form.Label className="required_form_label">Emirate/Country</Form.Label>
                                   <Form.Control type="text" value={emirate} disabled={readOnly} readOnly={true} />
                               </Form.Group>
                               <Form.Group as={Col}>
                                   <Form.Label className="required_form_label">Category</Form.Label>
                                   <Form.Control type="text" value={category} disabled={readOnly} readOnly={true} />
                               </Form.Group>
                               
                           </Row>
                           <Row className="mb-3">
                           <Form.Group as={Col}>
                                   <Form.Label className="required_form_label">Code</Form.Label>
                                   <Form.Control type="text" value={code} disabled={readOnly} readOnly={true} />
                               </Form.Group>
                               <Form.Group as={Col}>
                                   <Form.Label className="required_form_label">Number Plate</Form.Label>
                                   <Form.Control type="text" value={numberPlate} disabled={readOnly} readOnly={true} />
                               </Form.Group>
                           </Row>
                       </Form.Group>
                        <Form.Group as={Col}>
                            {images.length > 0 ?
                                <Carousel variant="dark">
                                    {Array.from(images).map((image, index) => (
                                        <Carousel.Item>
                                            <img
                                                src={`data:${image.contentType};base64,` + image.base64EncodedBlob}
                                                width="300"
                                                height="300"
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel> : <><h3>No Images Available</h3></>}
                        </Form.Group>
                    </Row> : 
                    <>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <span><Form.Label className="required_form_label">Make *</Form.Label> <Form.Check reverse inline type="switch"  onChange={this.toggleMakeInputMode}/> </span>
                                
                                
                                {
                                    isMakeOther ? <Form.Control type="text" value={make} onChange={this.changeMake} />
                                    : <Form.Select value={make} onChange={this.changeMake}>
                                        <option value=''>Select an option</option>
                                        {
                                            Array.from(makesDropDownValues).map((value) => (
                                                <option value={value}>{value}</option>
                                            ))
                                        }
                                    </Form.Select>

                                }
                                
                                {/* <Form.Control type="text"  required={true} value={make} onChange={this.changeMake} disabled={readOnly}/> */}
                            </Form.Group>

                            <Form.Group as={Col}>
                                <span><Form.Label className="required_form_label">Model *</Form.Label> <Form.Check inline type="switch" disabled={isMakeOther} onChange={this.toggleModelInputMode}/> </span>
                                {
                                    isModelOther || isMakeOther ? <Form.Control type="text" value={model} onChange={this.changeModel} />
                                    : <Form.Select value={model} onChange={this.changeModel}>
                                        <option value=''>Select an option</option>
                                        {
                                            Array.from(modelsDropDownValues).map((value) => (
                                                <option value={value}>{value}</option>
                                            ))
                                        }
                                    </Form.Select>
                                    
                                }
                                
                                {/* <Form.Control type="text"  required={true} value={model} onChange={this.changeModel} disabled={readOnly}/> */}
                            </Form.Group> 

                            <Form.Group as={Col}>
                                <span><Form.Label className="required_form_label">Type *</Form.Label> <Form.Check inline type="switch" onChange={this.toggleTypeInputMode} /></span>
                                {
                                    isTypeOther ? <Form.Control type="text" required={true} onChange={this.changeType} /> : 
                                
                                    <Form.Select value={type} required={true} disabled={readOnly} onChange={this.changeType}>
                                        <option value=''>Select an option</option>
                                        {
                                            parkingSlot.startsWith('T') ? <option value='TRUCK'>Truck</option>
                                            : <>
                                            <option value='CAR'>Car</option>
                                            <option value='MOTORCYCLE'>Motorcycle</option>
                                            </>
                                        }
                                    </Form.Select>
                                }
                                
                                
                            </Form.Group>

                            <Form.Group as={Col}>
                                <span>
                                    <Form.Label className="required_form_label">Colour *</Form.Label> 
                                    <Form.Check type="switch" inline onChange={this.toggleColorInputMode} />
                                </span>
                                {
                                    isColorOther ? <Form.Control type="text"  required={true} value={color} onChange={this.changeColor} disabled={readOnly}/>
                                    :
                                    <Form.Select value={color} required={true} onChange={this.changeColor}>
                                        <option value=''>Select an option</option>
                                        <option value='RED'> Red</option>
                                        <option value='YELLOW'>Yellow</option>
                                        <option value='GREEN'>Green</option>
                                        <option value='BLUE'>Blue</option>
                                        <option value='BLACK'>Black</option>
                                        <option value='WHITE'>White</option>
                                        <option value='PINK'>Pink</option>
                                        <option value='GREY'>Grey</option>
                                        <option value='SILVER'>Silver</option>
                                        <option value='BROWN'>Brown</option>
                                    </Form.Select>
                                }
                                
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <span><Form.Label >Emirate/Country</Form.Label> <Form.Check inline type="switch" onChange={this.toggleEmirateInputMode} /></span>
                                {
                                    isEmirateOther ?
                                    <Form.Control type="text" required onChange={this.changeEmirate} value={emirate} />
                                    :
                                    <Form.Select disabled={readOnly} value={emirate} onChange={this.changeEmirate}>
                                        <option value=''>Select Emirate/Country</option>
                                    <option value="ABU_DHABI">Abu Dhabi</option>
                                    <option value="AJMAN">Ajman</option>
                                    <option value="DUBAI">Dubai</option>
                                    <option value="FUJAIRAH">Fujairah</option>
                                    <option value="RAS_AL_KHAYMAH">Ras Al Khaymah</option>
                                    <option value="SHARJAH">Sharjah</option>
                                    <option value="UMM_AL_QUWAIN">Umm Al Quwain</option>
                                </Form.Select>
                                }
                            </Form.Group>

                            <Form.Group as={Col}>
                                <span>
                                    <Form.Label>Category</Form.Label> 
                                    <Form.Check type="switch" inline disabled={isEmirateOther} onChange={this.toggleCategoryInputMode} />
                                </span>
                                {
                                    isCategoryOther || isEmirateOther ? <Form.Control type="text" required onChange={this.changeCategory} value={category} />
                                    :
                                    <Form.Select disabled={readOnly} onChange={this.changeCategory} value={category}>
                                    <option value=''>Select a category</option>
                                    {
                                        this.populateCategoryDropdown()
                                    }
                                    </Form.Select>
                                }
                            </Form.Group>

                            <Form.Group as={Col}>
                                <span>
                                    <Form.Label>Code</Form.Label>
                                    <Form.Check type="switch" inline disabled={isEmirateOther || isCategoryOther} onChange={this.toggleCodeInputMode} />
                                </span>
                                {
                                    isCodeOther || isEmirateOther || isCategoryOther ? <Form.Control type="text" required onChange={this.changeCode} value={code} />
                                    :
                                    <Form.Select disabled={readOnly} onChange={this.changeCode} value={code}>
                                    <option value=''>Select Code</option>
                                    {this.populateCodeDropdown()}
                                    </Form.Select>
                                }
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Car No. Plate</Form.Label>
                                <Form.Control type="text" value={numberPlate} onChange={this.changeNumberPlate} disabled={readOnly}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Chassis Number </Form.Label>
                                <Form.Control type="text" value={chassisNumber} onChange={this.changeChassisNumber} disabled={readOnly} />
                            </Form.Group>
                    
                        </Row>
                    </>
                        
                    }
                    
                    <Row className="mb-3">
                        <Form.Text className="form_text">Registration</Form.Text>
                    </Row>
                   
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Department *</Form.Label>
                            <Form.Control type="text" value={department} required onChange={this.changeDepartment} disabled={readOnly} />
                        </Form.Group>
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
                            <Form.Label className="required_form_label">Wanted * (Yes/No)</Form.Label>
                            <Form.Select required={true} value={isWanted ? "Yes" : "No"} onChange={this.changeIsWanted} disabled={readOnly}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                                </Form.Select>
                        </Form.Group>
                        {isWanted ?
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Case Number *</Form.Label>
                            <Form.Control type="text"  required={true} value={caseNumber} onChange={this.changeCaseNumber} disabled={readOnly} />
                        </Form.Group> : <></>}
                        <Form.Group as={Col}>
                            <Form.Label>Estimated Release Date</Form.Label>
                            <Form.Control type="date" value={estimatedReleaseDate} onChange={this.changeEstimatedReleaseDate} disabled={readOnly} />
                        </Form.Group>
                        
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">Parking Slot Number *</Form.Label>
                            <Form.Control type="text" disabled value={parkingSlot} disabled />
                        </Form.Group>
                    </Row>
                    
                    {! readOnly ? 
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Image 1</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage1} size="sm"/>
                            { updateMode && imagesInput.length > 0 ? <Form.Text className="text-muted">Replace</Form.Text> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image 2</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage2} size="sm"/>
                            { updateMode && imagesInput.length > 1 ? <Form.Text className="text-muted">Replace</Form.Text> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image 3</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage3} size="sm"/>
                            { updateMode && imagesInput.length > 2 ? <Form.Text className="text-muted">Replace</Form.Text> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image 4</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage4} size="sm"/>
                            { updateMode && imagesInput.length > 3 ? <Form.Text className="text-muted">Replace</Form.Text> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Image 5</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage5} size="sm"/>
                            { updateMode && imagesInput.length > 4 ?  <Form.Text className="text-muted">Replace</Form.Text> : null}
                        </Form.Group>
                    </Row> : <></>}
                    
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
                        <Form.Group as={Col}>
                            <Form.Label>Contact No.</Form.Label>
                            <Form.Control type="text"  value={contactNumber} onChange={this.changeContactNumber} disabled={readOnly}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={emailAddress} onChange={this.changeEmailAddress} disabled={readOnly}/>
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
                                <option value="">Select an option</option>
                                <option value="Passport">Passport</option>
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
                                <option value=''>Select an option</option>
                                <option value="Passport">Passport</option>
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
                            <Form.Control type="text" value={releaseContactNumber} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" value={releaseEmailAddress} disabled />
                        </Form.Group>
                    </Row></> : <></>}

                   

                    <div id="button_container">
                        {!readOnly ?  <Button type="submit" variant="secondary">{updateMode ? 'Update' : 'Register'}</Button> : <></>}
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