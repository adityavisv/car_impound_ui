import React from 'react';
import { Form, Col, Row, Button, Alert, Carousel } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import LoadingOverlay from 'react-loading-overlay';
import '../styles/carregistrationcomponent.css';
import UserService from '../services/user.service';
import LoginRedirectModal from './LoginRedirectModal';
import 'bootstrap/dist/css/bootstrap.css';
import { makeModelData } from '../newcardb';
import { getAllModelsByMake, generateFileObjectsFromData, translateVehicleType, translateEmirate, translateColor, translateIsWanted } from '../helpers/generalhelpers';
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
        
        const isMakeInDropdownList = allMakes.includes(make);
        var isModelInDropdownList = false;
        if (isMakeInDropdownList) {
            isModelInDropdownList = getAllModelsByMake(make).includes(model);
        }

        const defaultVehiclesTypes = ['CAR', 'MOTORCYCLE', 'TRUCK'];
        const defaultColors  = ['RED', 'YELLOW', 'GREEN', 'BLUE', 'BLACK', 'WHITE', 'PINK', 'GREY', 'SILVER', 'BROWN'];
        const defaultEmirates = ['DUBAI', 'FUJAIRAH', 'AJMAN', 'SHARJAH', 'ABU_DHABI', 'RAS_AL_KHAYMAH', 'UMM_AL_QUWAIN'];

        const isTypeInDropdownList = defaultVehiclesTypes.includes(type);
        const isColorInDropdownList = defaultColors.includes(color);
        const isEmirateInDropdownList = defaultEmirates.includes(emirate);

        const isEmirateOther = updateMode ? (! isEmirateInDropdownList) : false;
        const isCategoryOther  = updateMode ? isEmirateOther : false;

        this.state = {
            selectedSlot,
            makesDropDownValues: [... new Set(allMakes)],
            modelsDropDownValues: [... new Set(getAllModelsByMake(readOnly || updateMode ? make : 'Alfa Romeo'))],
            shouldShowRedirectLoginModal: false,
            readOnly,
            updateMode,
            isVehicleAssignStarted: false,
            isVehicleAssignDone: false,
            isMakeOther: updateMode ? (! isMakeInDropdownList) : false,
            isModelOther: updateMode ? (! isMakeInDropdownList) : false,
            isTypeOther: updateMode ? (! isTypeInDropdownList) : false,
            isColorOther: updateMode ? (! isColorInDropdownList) : false,
            isEmirateOther,
            isCategoryOther,
            isCodeOther: updateMode ? (isEmirateOther || isCategoryOther) : false,
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
        const { t } = this.props;
        return (
            <LoadingOverlay active={this.shouldShowLoadingScreen()} spinner text='Saving vehicle...'>
                {/* {readOnly ? <Alert variant="info">{t("car_registration_form_alert_readonly_header")}</Alert> : null} */}
                <Form onSubmit={this.submitVehicle}>
                    <Row className="mb-3">
                        <Form.Text className="form_text">{t("car_registration_form_subheader_vehicle_information")}</Form.Text>
                    </Row>
                    { readOnly ?
                    <Row className="mb-3">
                       <Form.Group as={Col}>
                           <Row className="mb-3">
                               <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">{t("car_registration_form_label_make")}</Form.Label>
                                    <Form.Control type="text" readOnly disabled value={make} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">{t("car_registration_form_label_model")}</Form.Label>
                                    <Form.Control type="text" readOnly disabled value={model} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">{t("car_registration_form_label_type")}</Form.Label>
                                    <Form.Control type="text" readOnly disabled value={translateVehicleType(t, type)} />
                                </Form.Group>
                                
                           </Row>
                           <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">{t("car_registration_form_label_color")}</Form.Label>
                                    <Form.Control type="text"  required={true} value={translateColor(t, color)} disabled={readOnly} readOnly={true}/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="required_form_label">{t("car_registration_form_label_chassis_number")}</Form.Label>
                                    <Form.Control type="text" value={chassisNumber} disabled={readOnly} readOnly={true} />
                                </Form.Group>
                           </Row>
                           <Row className="mb-3">
                               <Form.Group as={Col}>
                                   <Form.Label className="required_form_label">{t("car_registration_form_label_emirate")}</Form.Label>
                                   <Form.Control type="text" value={translateEmirate(t, emirate)} disabled={readOnly} readOnly={true} />
                               </Form.Group>
                               <Form.Group as={Col}>
                                   <Form.Label className="required_form_label">{t("car_registration_form_label_category")}</Form.Label>
                                   <Form.Control type="text" value={category} disabled={readOnly} readOnly={true} />
                               </Form.Group>
                               
                           </Row>
                           <Row className="mb-3">
                           <Form.Group as={Col}>
                                   <Form.Label className="required_form_label">{t("car_registration_form_label_code")}</Form.Label>
                                   <Form.Control type="text" value={code} disabled={readOnly} readOnly={true} />
                               </Form.Group>
                               <Form.Group as={Col}>
                                   <Form.Label className="required_form_label">{t("car_registration_form_label_car_num_plate")}</Form.Label>
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
                                </Carousel> : <><h3>{t("car_registration_form_text_no_images_available")}</h3></>}
                        </Form.Group>
                    </Row> : 
                    <>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <span><Form.Label className="required_form_label">{t("car_registration_form_label_make")}</Form.Label> <Form.Check reverse inline type="switch"  checked={isMakeOther} onChange={this.toggleMakeInputMode}/> </span>
                                
                                
                                {
                                    isMakeOther ? <Form.Control type="text" value={make} onChange={this.changeMake} />
                                    : <Form.Select value={make} onChange={this.changeMake}>
                                        <option value=''>{t("car_registration_form_dropdown_select_an_option")}</option>
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
                                <span><Form.Label className="required_form_label">{t("car_registration_form_label_model")}</Form.Label> <Form.Check inline type="switch" disabled={isMakeOther} checked={isModelOther} onChange={this.toggleModelInputMode}/> </span>
                                {
                                    isModelOther || isMakeOther ? <Form.Control type="text" value={model} onChange={this.changeModel} />
                                    : <Form.Select value={model} onChange={this.changeModel}>
                                        <option value=''>{t("car_registration_form_dropdown_select_an_option")}</option>
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
                                <span><Form.Label className="required_form_label">{t("car_registration_form_label_type")}</Form.Label> <Form.Check inline type="switch" checked={isTypeOther} onChange={this.toggleTypeInputMode} /></span>
                                {
                                    isTypeOther ? <Form.Control type="text" value={type} required={true} onChange={this.changeType} /> : 
                                
                                    <Form.Select value={type} required={true} disabled={readOnly} onChange={this.changeType}>
                                        <option value=''>{t("car_registration_form_dropdown_select_an_option")}</option>
                                        {
                                            parkingSlot.startsWith('T') ? <option value='TRUCK'>{t("car_registration_form_type_dropdown_truck")}</option>
                                            : <>
                                            <option value='CAR'>{t("car_registration_form_type_dropdown_car")}</option>
                                            <option value='MOTORCYCLE'>{t( "car_registration_form_type_dropdown_motorcycle")}</option>
                                            </>
                                        }
                                    </Form.Select>
                                }
                                
                                
                            </Form.Group>

                            <Form.Group as={Col}>
                                <span>
                                    <Form.Label className="required_form_label">{t("car_registration_form_label_color")}</Form.Label> 
                                    <Form.Check type="switch" inline checked={isColorOther} onChange={this.toggleColorInputMode} />
                                </span>
                                {
                                    isColorOther ? <Form.Control type="text"  required={true} value={color} onChange={this.changeColor} disabled={readOnly}/>
                                    :
                                    <Form.Select value={color} required={true} onChange={this.changeColor}>
                                        <option value=''>{t("car_registration_form_dropdown_select_an_option")}</option>
                                        <option value='RED'> {t("car_registration_form_color_dropdown_red")}</option>
                                        <option value='YELLOW'>{t("car_registration_form_color_dropdown_yellow")}</option>
                                        <option value='GREEN'>{t("car_registration_form_color_dropdown_green")}</option>
                                        <option value='BLUE'>{t("car_registration_form_color_dropdown_blue")}</option>
                                        <option value='BLACK'>{t("car_registration_form_color_dropdown_black")}</option>
                                        <option value='WHITE'>{t("car_registration_form_color_dropdown_white")}</option>
                                        <option value='PINK'>{t("car_registration_form_color_dropdown_pink")}</option>
                                        <option value='GREY'>{t("car_registration_form_color_dropdown_grey")}</option>
                                        <option value='SILVER'>{t("car_registration_form_color_dropdown_silver")}</option>
                                        <option value='BROWN'>{t("car_registration_form_color_dropdown_brown")}</option>
                                    </Form.Select>
                                }
                                
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <span><Form.Label >{t("car_registration_form_label_emirate")}</Form.Label> <Form.Check inline type="switch" checked={isEmirateOther} onChange={this.toggleEmirateInputMode} /></span>
                                {
                                    isEmirateOther ?
                                    <Form.Control type="text" required onChange={this.changeEmirate} value={emirate} />
                                    :
                                    <Form.Select disabled={readOnly} value={emirate} onChange={this.changeEmirate}>
                                        <option value=''>{t("car_registration_form_dropdown_select_an_option")}</option>
                                    <option value="ABU_DHABI">{t("car_registration_form_emirate_dropdown_abu_dhabi")}</option>
                                    <option value="AJMAN">{t("car_registration_form_emirate_dropdown_ajman")}</option>
                                    <option value="DUBAI">{t("car_registration_form_emirate_dropdown_dubai")}</option>
                                    <option value="FUJAIRAH">{t("car_registration_form_emirate_dropdown_fujairah")}</option>
                                    <option value="RAS_AL_KHAYMAH">{t("car_registration_form_emirate_dropdown_ras_al_khaymah")}</option>
                                    <option value="SHARJAH">{t("car_registration_form_emirate_dropdown_sharjah")}</option>
                                    <option value="UMM_AL_QUWAIN">{t("car_registration_form_emirate_dropdown_umm_al_quwain")}</option>
                                </Form.Select>
                                }
                            </Form.Group>

                            <Form.Group as={Col}>
                                <span>
                                    <Form.Label>{t("car_registration_form_label_category")}</Form.Label> 
                                    <Form.Check type="switch" inline disabled={isEmirateOther} checked={isCategoryOther} onChange={this.toggleCategoryInputMode} />
                                </span>
                                {
                                    isCategoryOther || isEmirateOther ? <Form.Control type="text"  onChange={this.changeCategory} value={category} />
                                    :
                                    <Form.Select disabled={readOnly} onChange={this.changeCategory} value={category}>
                                    <option value=''>{t("car_registration_form_dropdown_select_an_option")}</option>
                                    {
                                        this.populateCategoryDropdown()
                                    }
                                    </Form.Select>
                                }
                            </Form.Group>

                            <Form.Group as={Col}>
                                <span>
                                    <Form.Label>{t("car_registration_form_label_code")}</Form.Label>
                                    <Form.Check type="switch" inline disabled={isEmirateOther || isCategoryOther} checked={isCodeOther} onChange={this.toggleCodeInputMode} />
                                </span>
                                {
                                    isCodeOther || isEmirateOther || isCategoryOther ? <Form.Control type="text"  onChange={this.changeCode} value={code} />
                                    :
                                    <Form.Select disabled={readOnly} onChange={this.changeCode} value={code}>
                                    <option value=''>{t("car_registration_form_dropdown_select_an_option")}</option>
                                    {this.populateCodeDropdown()}
                                    </Form.Select>
                                }
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>{t("car_registration_form_label_car_num_plate")}</Form.Label>
                                <Form.Control type="text" value={numberPlate} onChange={this.changeNumberPlate} disabled={readOnly}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>{t("car_registration_form_label_chassis_number")}</Form.Label>
                                <Form.Control type="text" value={chassisNumber} onChange={this.changeChassisNumber} disabled={readOnly} />
                            </Form.Group>
                    
                        </Row>
                    </>
                        
                    }
                    
                    <Row className="mb-3">
                        <Form.Text className="form_text">{t("car_registration_form_subheader_registration")}</Form.Text>
                    </Row>
                   
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">{t("car_registration_form_label_department")}</Form.Label>
                            <Form.Control type="text" value={department} required onChange={this.changeDepartment} disabled={readOnly} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">{t("car_registration_form_label_registration_date")}</Form.Label>
                               <Form.Control type="date" disabled={readOnly} required={true} value={registrationDate} onChange={this.changeRegistrationDate} data-date-format="DD/MM/YYYY" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">{t("car_registration_form_label_registration_time")} </Form.Label>
                            <Form.Control type="time" disabled={readOnly} required={true} value={registrationTime} onChange={this.changeRegistrationTime} />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">{t("car_registration_form_label_wanted")}</Form.Label>
                            <Form.Select required={true} value={isWanted ? "Yes" : "No"} onChange={this.changeIsWanted} disabled={readOnly}>
                                <option value="Yes">{t("car_registration_form_wanted_dropdown_yes")}</option>
                                <option value="No">{t("car_registration_form_wanted_dropdown_no")}</option>
                                </Form.Select>
                        </Form.Group>
                        {isWanted ?
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">{t("car_registration_form_label_case_number")}</Form.Label>
                            <Form.Control type="text"  required={true} value={caseNumber} onChange={this.changeCaseNumber} disabled={readOnly} />
                        </Form.Group> : <></>}
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_estimated_release_date")}</Form.Label>
                            <Form.Control type="date" value={estimatedReleaseDate} onChange={this.changeEstimatedReleaseDate} disabled={readOnly} />
                        </Form.Group>
                        
                        <Form.Group as={Col}>
                            <Form.Label className="required_form_label">{t("car_registration_form_label_parking_slot_number")}</Form.Label>
                            <Form.Control type="text" disabled value={parkingSlot} />
                        </Form.Group>
                    </Row>
                    
                    {! readOnly ? 
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_image_1")}</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage1} size="sm"/>
                            { updateMode && imagesInput.length > 0 ? <Form.Text className="text-muted">{t("car_registration_form_label_replace")}</Form.Text> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_image_2")}</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage2} size="sm"/>
                            { updateMode && imagesInput.length > 1 ? <Form.Text className="text-muted">{t("car_registration_form_label_replace")}</Form.Text> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_image_3")}</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage3} size="sm"/>
                            { updateMode && imagesInput.length > 2 ? <Form.Text className="text-muted">{t("car_registration_form_label_replace")}</Form.Text> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_image_4")}</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage4} size="sm"/>
                            { updateMode && imagesInput.length > 3 ? <Form.Text className="text-muted">{t("car_registration_form_label_replace")}</Form.Text> : null}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_image_5")}</Form.Label>
                            <Form.Control type="file" onChange={this.changeImage5} size="sm"/>
                            { updateMode && imagesInput.length > 4 ?  <Form.Text className="text-muted">{t("car_registration_form_label_replace")}</Form.Text> : null}
                        </Form.Group>
                    </Row> : <></>}
                    
                    <Row className="mb-3">
                        <Form.Label>{t("car_registration_form_label_remarks")}</Form.Label>
                        <Form.Control as="textarea" rows={3} value={remarks} onChange={this.changeRemarks} disabled={readOnly} />
                    </Row>
                    <Row className="mb-3">
                        <Form.Text className="form_text">
                            {t("car_registration_form_subheader_owner_profile")}
                        </Form.Text>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_firstname")}</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={this.changeFirstName}  disabled={readOnly} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_lastname")}</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={this.changeLastName} disabled={readOnly} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_contact_no")}</Form.Label>
                            <Form.Control type="text"  value={contactNumber} onChange={this.changeContactNumber} disabled={readOnly}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_email")}</Form.Label>
                            <Form.Control type="email" value={emailAddress} onChange={this.changeEmailAddress} disabled={readOnly}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_nationality")}</Form.Label>
                            <Form.Control type="text"  value={nationality} onChange={this.changeNationality} disabled={readOnly} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_id_type")}</Form.Label>
                            <Form.Select onChange={this.changeIdType} value={idType} disabled={readOnly} >
                                <option value="">{t("car_registration_form_dropdown_select_an_option")}</option>
                                <option value="Passport">{t( "car_registration_form_id_type_dropdown_passport")}</option>
                                <option value="Emirates ID">{t("car_registration_form_id_type_dropdown_emirates_id")}</option>
                                <option value="National ID">{t("car_registration_form_id_type_dropdown_national_id")}</option>
                                <option value="Driving License">{t("car_registration_form_id_type_dropdown_driving_license")}</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_id_number")}</Form.Label>
                            <Form.Control type="text"  value={idNumber} onChange={this.changeIdNumber} disabled={readOnly} />
                        </Form.Group>
                    </Row>
                    {parkingSlot === null ? <>
                    <Row className="mb-3">
                        <Form.Text className="form_text">
                            {t("car_registration_form_subheader_release_identity")}
                        </Form.Text>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_firstname")}</Form.Label>
                            <Form.Control type="text" value={releaseFirstName} disabled={true} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_lastname")}</Form.Label>
                            <Form.Control type="text" value={releaseLastName} disabled />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_release_date")}</Form.Label>
                            <Form.Control type="date" value={releaseDate} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_release_time")}</Form.Label>
                            <Form.Control type="time" value={releaseTime} disabled />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_nationality")}</Form.Label>
                            <Form.Control type="text" value={releaseNationality} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_id_type")}</Form.Label>
                            <Form.Select  value={releaseIdType} disabled >
                                <option value=''>{t("car_registration_form_dropdown_select_an_option")}</option>
                                <option value="Passport">{t("car_registration_form_id_type_dropdown_passport")}</option>
                                <option value="Emirates ID">{t("car_registration_form_id_type_dropdown_emirates_id")}</option>
                                <option value="National ID">{t("car_registration_form_id_type_dropdown_national_id")}</option>
                                <option value="Driving License">{t("car_registration_form_id_type_dropdown_driving_license")}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_id_number")}</Form.Label>
                            <Form.Control type="text" disabled value={releaseIdNumber} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_contact_no")}</Form.Label>
                            <Form.Control type="text" value={releaseContactNumber} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>{t("car_registration_form_label_email")}</Form.Label>
                            <Form.Control type="email" value={releaseEmailAddress} disabled />
                        </Form.Group>
                    </Row></> : <></>}

                   

                    <div id="button_container">
                        {!readOnly ?  <Button type="submit" variant="secondary">{updateMode ? t("car_registration_form_btn_update") : t("car_registration_form_btn_register")}</Button> : <></>}
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

export default withTranslation()(CarRegistrationForm);