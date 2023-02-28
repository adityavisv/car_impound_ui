import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Modal, Row, Form } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { parkingSlotNumberMap } from '../parkingSlotMap';
import LoadingOverlay from 'react-loading-overlay';
import UserService from '../services/user.service';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/searchform.css';
import LoginRedirectModal from './LoginRedirectModal';
import CarRegistrationForm from './CarRegistrationForm';
import ResultsTable from './ResultsTable';
import { makeModelData } from '../newcardb';
import { convertResultsToCsv, getAllModelsByMake, getSlotsByZone } from '../helpers/generalhelpers';
import { EMIRATES_CATEGORY_CODE_MAP } from '../constants/constants';

class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        const allMakes = makeModelData.map((value) => (
            value.brand
        ));

        
        this.state = {
            searchInit: false,
            shouldShowRedirectLoginModal: false,
            isMakeOther: false,
            isModelOther: false,
            isTypeOther: false,
            isColorOther: false,
            isEmirateOther: false,
            isCategoryOther: false,
            isCodeOther: false,
            makesDropdownValues: [... new Set(allMakes)],
            modelsDropdownValues: [],
            slotNumberDropdownValues: [],
            searchDone: false,
            data: [],
            chassisNumber: '',
            caseNumber: '',
            make: '',
            model: '',
            color: '',
            type: '',
            zoneLabel: '',
            slot: '',
            startDate: '',
            endDate: '',
            numberPlate: '',
            ownerFirstname : '',
            ownerLastname: '',
            category: '',
            emirate: '',
            code: '',
            isWanted: '',
            ownerNationality: '',
            emirate: '',
            releaseDate: '',
            estimatedReleaseDate: '',
            remarksKeyword: '',
            statusAction: '',
            statusActionRequired: false,
            showResultModal: false,
            selectedResult: {},
            images: [],
            showResults: false,
            results: [],
            status: ''
        }
    }

    hideRedirectLoginModal = () => {
        this.setState({
            shouldShowRedirectLoginModal: false
        });
        this.props.callLogout();
    }

    onClickSearch = (event) => {
        event.preventDefault();
        this.setState ({
            showResults: true
        });
    }

    changeStartDate = (event) => {
        this.setState({
            startDate: event.target.value,
            statusActionRequired: event.target.value !== '',
        });
    }

    changeEndDate = (event) => {
        this.setState({
            endDate: event.target.value,
            statusActionRequired: event.target.value !== '',
        });
    }

    changeMake = (event) => {
        const make = event.target.value;
        const { isMakeOther } = this.state;
        if ( ! isMakeOther ) {
            this.setState({
                make,
                modelsDropdownValues: [... new Set(getAllModelsByMake(make))]
            })
        } else {
            this.setState({
                make
            })
        }
    }

    changeModel = (event) => {
        const { value: model } = event.target;
        this.setState({
            model
        });
    }

    changeColor = (event) => {
        this.setState({
            color: event.target.value
        });
    }

    changeZoneLabel = (event) => {
        const zoneLabel = event.target.value;
        var slotNumberDropdownValues = [];
        if (zoneLabel !== '')
            slotNumberDropdownValues = getSlotsByZone(zoneLabel);
        this.setState({
            zoneLabel,
            slotNumberDropdownValues
        });
    }

    changeSlot = (event) => {
        this.setState({
            slot: event.target.value
        });
    }

    changeNumberPlate = (event) => {
        this.setState({
            numberPlate: event.target.value
        });
    }

    changeCaseNumber = (event) => {
        this.setState({
            caseNumber: event.target.value
        });
    }

    changeChassisNumber = (event) => {
        this.setState({
            chassisNumber: event.target.value
        });
    }

    changeOwnerNationality = (event) => {
        this.setState({
            ownerNationality: event.target.value
        });
    }

    changeEmirate = (event) => {
        this.setState({
            emirate: event.target.value
        });
    }

    changeCategory = (event) => {
        this.setState({
            category: event.target.value
        });
    }

    changeCode = (event) => {
        this.setState({
            code: event.target.value
        });
    }

    changeReleaseDate = (event) => {
        this.setState({
            releaseDate: event.target.value
        });
    }

    changeReleaseFirstname = (event) => {
        this.setState({
            releaseFirstname: event.target.value
        });
    }

    changeReleaseLastname = (event) => {
        this.setState({
            releaseLastname: event.target.value
        });
    }

    changeType = (event) => {
        this.setState({
            type: event.target.value
        });
    }

    changeStatus = (event) => {
        this.setState({
            status: event.target.value
        });
    }

    changeIsWanted = (event) => {
        this.setState({
            isWanted: event.target.value
        });
    }

    changeOwnerFirstname = (event) => {
        this.setState({
            ownerFirstname: event.target.value
        });
    }

    changeOwnerLastname = (event) => {
        this.setState({
            ownerLastname: event.target.value
        });
    }

    changeEstimatedReleaseDate = (event) => {
        this.setState({
            estimatedReleaseDate: event.target.value
        });
    }

    changeremarksKeyword = (event) => {
        this.setState({
            remarksKeyword: event.target.value
        });
    }

    changeStatusAction = (event) => {
        const { value } = event.target;
        if (value === '') {
            this.setState({
                statusActionRequired :false,
                statusAction :value
            });
        } else {
            this.setState({
                statusActionRequired: true,
                statusAction: value
            });
        }
    }

    closeResultModal = () => {
        this.setState({
            showResultModal: false
        });
    }

    toggleMakeInputMode = () => {
        const { isMakeOther } = this.state;
        this.setState({
            isMakeOther: ! isMakeOther
        });
    }

    toggleModelInputMode = () => {
        const { isModelOther } = this.state;
        this.setState({
            isModelOther: ! isModelOther
        });
    }

    toggleTypeInputMode = () => {
        const { isTypeOther }  = this.state;
        this.setState({
            isTypeOther: ! isTypeOther
        });
    }

    toggleColorInputMode = () => {
        const { isColorOther } = this.state;
        this.setState({
            isColorOther: ! isColorOther
        });
    }

    toggleEmirateInputMode = () => {
        const { isEmirateOther } = this.state;
        this.setState({
            isEmirateOther: ! isEmirateOther
        });
    }

    toggleCategoryInputMode = () => {
        const { isCategoryOther } = this.state;
        this.setState({
            isCategoryOther: ! isCategoryOther
        });
    }

    toggleCodeInputMode = () => {
        const { isCodeOther } = this.state;
        this.setState({
            isCodeOther: ! isCodeOther
        });
    }

    hitSearch = (event) => {
        event.preventDefault();
        this.setState({
            searchInit: true
        });
        var params = {};
        const {
            make, 
            model, 
            color, 
            slot,
            zoneLabel,
            numberPlate,
            startDate,
            endDate,
            ownerFirstname,
            ownerLastname,
            caseNumber,
            isWanted,
            chassisNumber,
            type,
            emirate,
            category,
            code,
            estimatedReleaseDate,
            releaseDate,
            releaseFirstname,
            releaseLastname,
            ownerNationality,
            remarksKeyword,
            status,
            statusAction,
        } = this.state;

        if (make !== '')
            params.make = make;
        if (model !== '')
            params.model = model;
        if (color !== '')
            params.color = color;
        if (slot !== '')
            params.slot = slot;
        if (zoneLabel !== '')
            params.zoneLabel = zoneLabel;
        if (numberPlate !== '')
            params.numberPlate = numberPlate;
        if (startDate !== '')
            params.startDate = startDate;
        if (endDate !== '')
            params.endDate = endDate;
        if (ownerFirstname !== '')
            params.ownerFirstname = ownerFirstname;
        if (ownerLastname !== '')
            params.ownerLastname = ownerLastname;
        if (caseNumber !== '')
            params.caseNumber = caseNumber;
        if (isWanted !== '')
            params.isWanted = isWanted === 'Yes';
        if (chassisNumber !== '')
            params.chassisNumber = chassisNumber;
        if (type !== '')
            params.type = type;
        if (emirate !== '')
            params.emirate = emirate;
        if (category !== '')
            params.category = category;
        if (code !== '')
            params.code = code;
        if (releaseDate !== '')
            params.releaseDate = releaseDate;
        if (releaseFirstname !== '')
            params.releaseFirstname = releaseFirstname;
        if (releaseLastname !== '')
            params.releaseLastname = releaseLastname;
        if (ownerNationality !== '')
            params.ownerNationality = ownerNationality;
        if (estimatedReleaseDate !== '')
            params.estimatedReleaseDate = estimatedReleaseDate;
        if (remarksKeyword !== '')
            params.remarksKeyword = remarksKeyword;
        if (status !== '')
            params.status = status;
        if (statusAction !== '')
            params.statusAction = statusAction;

        UserService.searchVehicles(params)
            .then((response) => {
                this.setState({
                    results: response.data.vehicles,
                    showResults: true,
                    searchInit: false,
                    searchDone: true
                })
            })
            .catch((error) => {
                if (error.response !== undefined && error.response.status === 401) {
                    this.setState({
                        shouldShowRedirectLoginModal: true,
                        searchInit: false,
                        searchDone: true
                    });
                }
                else {
                    this.setState({
                        searchInit: false,
                        searchDone: true
                    });
                }
            })
    }

    loadingOverlayController = () => {
        const {searchInit, searchDone} = this.state;
        if (searchInit) {
            if (searchDone) {
                return false;
            }
            else
                return true;
        }
        return false;
    }

    generateVehicleInfoTable = () => {
        const { selectedResult } = this.state;
        const rows = Array.from(Object.keys(selectedResult)).map((key, index) => (
            <tr>
                <td>{key}</td>
                <td>{selectedResult[key]}</td>
            </tr>
        ));
        return rows;
    }

    handleRowClick = (id) => {
        const resultId = id;
        const { results } = this.state;
        const selectedResult = results.find(result => result.id === parseInt(resultId));
        UserService.getImagesOfVehicle(selectedResult.id)
            .then((response) => {
                this.setState({
                    selectedResult,
                    images : response.data.images
                })
            })
            .catch((error) => {
                if (error.response !== undefined && error.response.status === 401) {
                    this.setState({
                        shouldShowRedirectLoginModal: true,
                        
                    });
                }
            })
        this.setState({
            selectedResult,
            showResultModal: true,
        })
    }

    downloadResultsCSV = () => {
        const { results } = this.state;
        
            const csv = convertResultsToCsv(results);

            // convert raw csv string to byte array
            let utf8encode = new TextEncoder();
            const bytes = utf8encode.encode(csv);

            // push the byte array into a singleton array
            const bytearr = [];
            bytearr.push(bytes);

            // pass singleton array to create blob
            const blob = new Blob(bytearr, {type: 'application/csv'});

            // create an achor tag and trigger it to downlad
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'search-results.csv';
            a.click();
    }

    populateCategoryDropdown = () => {
        const { emirate } = this.state;
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
        const { emirate, category} = this.state;
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
    }

    clearSearchForm = () => {
        const allMakes = makeModelData.map((value) => (
            value.brand
        ));

        this.setState({
            searchInit: false,
            shouldShowRedirectLoginModal: false,
            makesDropdownValues: [... new Set(allMakes)],
            modelsDropdownValues: [... new Set(getAllModelsByMake('Alfa Romeo'))],
            slotNumberDropdownValues: [],
            searchDone: false,
            data: [],
            chassisNumber: '',
            caseNumber: '',
            make: '',
            model: '',
            color: '',
            type: '',
            zoneLabel: '',
            slot: '',
            startDate: '',
            endDate: '',
            numberPlate: '',
            ownerFirstname : '',
            ownerLastname: '',
            releaseFirstname: '',
            releaseLastname: '',
            category: '',
            emirate: '',
            code: '',
            isWanted: '',
            ownerNationality: '',
            emirate: '',
            releaseDate: '',
            estimatedReleaseDate: '',
            remarksKeyword: '',

            showResultModal: false,
            selectedResult: {},
            showResults: false,
            results: [],
            status: '',
            statusAction: '',
            statusActionRequired: false
        })
    }

    render = () => {
        const {
            results,  
            showResults, 
            isMakeOther,
            isModelOther,
            isTypeOther,
            isColorOther,
            isEmirateOther,
            isCategoryOther,
            isCodeOther,
            statusActionRequired,
            make, 
            model, 
            color,
            zoneLabel,
            slot, 
            numberPlate, 
            showResultModal, 
            selectedResult,
            images,
            startDate,
            endDate,
            ownerFirstname,
            ownerLastname,
            caseNumber,
            isWanted,
            chassisNumber,
            type,
            emirate,
            category,
            code,
            estimatedReleaseDate,
            releaseDate,
            releaseFirstname,
            releaseLastname,
            ownerNationality,
            shouldShowRedirectLoginModal,
            makesDropdownValues,
            modelsDropdownValues,
            slotNumberDropdownValues,
            remarksKeyword,
            status,
            statusAction
        } = this.state;

        const { t } = this.props;

        return (
            <LoadingOverlay
                active={this.loadingOverlayController()}
                spinner
                text='Loading results...'
            >
                <div>
                    <div className="search_form">
                        <Form onSubmit={this.hitSearch}>
                            <Row id="searchform_topbar" className="mb-3">
                                <Col>
                                    <Button onClick={this.clearSearchForm} id="search_btn" variant="secondary">{t("search_page_form_btn_clear")}</Button>
                                </Col>
                                    
                                <Col id="search_btn_col">
                                    <Button type="submit" id="search_btn" variant="secondary">{t("search_page_form_btn_search")}</Button>
                                </Col>
                            </Row>
                                
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                <Form.Label>{t("search_page_form_label_status_action")}</Form.Label>
                                    <Form.Select value={statusAction} onChange={this.changeStatusAction} required={statusActionRequired}>
                                        <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                        <option value='REGISTERED'>{t("search_page_form_status_dropdown_registered")}</option>
                                        <option value='APPROVED_FOR_RELEASE'>{t("search_page_form_status_dropdown_approved_for_release")}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_start_date")}</Form.Label>
                                    <Form.Control type="date" size="sm" value={startDate} onChange={this.changeStartDate} required={statusActionRequired} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_end_date")}</Form.Label>
                                    <Form.Control type="date" size="sm" value={endDate} onChange={this.changeEndDate} required={statusActionRequired} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_make")}</Form.Label>
                                    {

                                        isMakeOther ? <Form.Control type="text" size="sm" onChange={this.changeMake} value={make} /> :
                                        <Form.Select size="sm" value={make} onChange={this.changeMake}>
                                            <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                            <option value='OTHER'>{t("search_page_form_dropdown_other")}</option>
                                            {
                                                Array.from(makesDropdownValues).map((item) => (
                                                    <option value={item}>{item}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    }
                                    <Form.Check size="xs" type="switch" label={t("search_page_form_check_label_other_make")} onChange={this.toggleMakeInputMode} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_model")}</Form.Label>
                                    {
                                        isModelOther || isMakeOther ? <Form.Control type="text" size="sm" onChange={this.changeModel} value={model} /> :
                                        
                                    
                                        <Form.Select size="sm" value={model} onChange={this.changeModel}>
                                            <option value='OTHER'>{t("search_page_form_dropdown_other")}</option>
                                            <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                            {
                                                Array.from(modelsDropdownValues).map((item) => (
                                                    <option value={item}>{item}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    }
                                    <Form.Check size="xs" type="switch" label={t("search_page_form_check_label_other_model")} onChange={this.toggleModelInputMode} disabled={isMakeOther} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_vehicle_type")}</Form.Label>
                                    {
                                        isTypeOther ? <Form.Control type="text" size="sm" onChange={this.changeType} value={type} />
                                        :
                                        <Form.Select size="sm" value={type} onChange={this.changeType}>
                                        <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                        <option value="CAR">{t("search_page_form_type_dropdown_car")}</option>
                                        <option value="TRUCK">{t("search_page_form_type_dropdown_truck")}</option>
                                        <option value="MOTORCYCLE">{t( "search_page_form_type_dropdown_motorcycle")}</option>
                                        </Form.Select>
                                    }
                                    <Form.Check size="xs" type="switch" label={t("search_page_form_check_label_other_vehicle_type")} onChange={this.toggleTypeInputMode} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_status")}</Form.Label>
                                    <Form.Select size="sm" value={status} onChange={this.changeStatus}>
                                        <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                        <option value='REGISTERED'>{t("search_page_form_status_dropdown_registered")}</option>
                                        <option value='APPROVED_FOR_RELEASE'>{t("search_page_form_status_dropdown_approved_for_release")}</option>
                                        <option value='RELEASED'>{t("search_page_form_status_dropdown_released")}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_color")}</Form.Label>
                                    {
                                        isColorOther ? <Form.Control type="text" size="sm" value={color} onChange={this.changeColor} />
                                        :
                                        <Form.Select size="sm" value={color} onChange={this.changeColor}>
                                            <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                            <option value='RED'>{t("search_page_form_color_dropdown_red")}</option>
                                            <option value='YELLOW'>{t("search_page_form_color_dropdown_yellow")}</option>
                                            <option value='GREEN'>{t("search_page_form_color_dropdown_green")}</option>
                                            <option value='BLUE'>{t("search_page_form_color_dropdown_blue")}</option>
                                            <option value='BLACK'>{t("search_page_form_color_dropdown_black")}</option>
                                            <option value='WHITE'>{t("search_page_form_color_dropdown_white")}</option>
                                            <option value='PINK'>{t("search_page_form_color_dropdown_pink")}</option>
                                            <option value='GREY'>{t("search_page_form_color_dropdown_grey")}</option>
                                            <option value='SILVER'>{t("search_page_form_color_dropdown_silver")}</option>
                                            <option value='BROWN'>{t("search_page_form_color_dropdown_brown")}</option>
                                        </Form.Select>
                                    }
                                    <Form.Check size="xs" type="switch" label={t("search_page_form_check_label_other_color")} onChange={this.toggleColorInputMode} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_number_plate")}</Form.Label>
                                    <Form.Control type="text" size="sm" value={numberPlate} onChange={this.changeNumberPlate} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_case_number")}</Form.Label>
                                    <Form.Control type="text" size="sm" value={caseNumber} onChange={this.changeCaseNumber} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_chassis_number")}</Form.Label>
                                    <Form.Control type="text" size="sm" value={chassisNumber} onChange={this.changeChassisNumber} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_emirate")}</Form.Label>
                                    {
                                        isEmirateOther ? <Form.Control type="text"  size="sm" onChange={this.changeEmirate} value={emirate} />
                                        :
                                        <Form.Select size="sm" value={emirate} onChange={this.changeEmirate}>
                                        <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                        <option value="ABU_DHABI">{t( "search_page_form_emirate_dropdown_abu_dhabi")}</option>
                                        <option value="AJMAN">{t("search_page_form_emirate_dropdown_ajman")}</option>
                                        <option value="DUBAI">{t("search_page_form_emirate_dropdown_dubai")}</option>
                                        <option value="FUJAIRAH">{t( "search_page_form_emirate_dropdown_fujairah")}</option>
                                        <option value="RAS_AL_KHAYMAH">{t("search_page_form_emirate_dropdown_ras_al_khaymah")}</option>
                                        <option value="SHARJAH">{t("search_page_form_emirate_dropdown_sharjah")}</option>
                                        <option value="UMM_AL_QUWAIN">{t("search_page_form_emirate_dropdown_umm_al_quwain")}</option>
                                        </Form.Select>
                                    }
                                    <Form.Check size="xs" type="switch" label={t("search_page_form_check_label_other_emirate")} onChange={this.toggleEmirateInputMode} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_category")}</Form.Label>
                                    {
                                        isCategoryOther || isEmirateOther ? <Form.Control type="text" size="sm" value={category} onChange={this.changeCategory} />
                                        :
                                        <Form.Select size="sm" value={category} onChange={this.changeCategory}>
                                            <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                            {this.populateCategoryDropdown()}
                                        </Form.Select>
                                    }
                                    <Form.Check size="xs" type="switch" label={t("search_page_form_check_label_other_category")} onChange={this.toggleCategoryInputMode} disabled={isEmirateOther}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_code")}</Form.Label>
                                    {
                                        isEmirateOther || isCategoryOther || isCodeOther ? <Form.Control type="text" size="sm" value={code} onChange={this.changeCode} />
                                        :
                                        <Form.Select size="sm" value={code} onChange={this.changeCode}>
                                            <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                            {this.populateCodeDropdown()}
                                        </Form.Select>
                                    }
                                    <Form.Check size="xs" type="switch" label={t( "search_page_form_check_label_other_code")} onChange={this.toggleCodeInputMode} disabled={isCategoryOther || isEmirateOther} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_is_wanted")}</Form.Label>
                                    <Form.Select size="sm" value={isWanted} onChange={this.changeIsWanted}>
                                        <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                        <option value="Yes">{t("search_page_form_wanted_dropdown_yes")}</option>
                                        <option value="No">{t("search_page_form_wanted_dropdown_no")}</option>
                                    </Form.Select>
                                </Form.Group>    
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_owner_firstname")}</Form.Label>
                                    <Form.Control size="sm" type="text" value={ownerFirstname} onChange={this.changeOwnerFirstname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_owner_lastname")}</Form.Label>
                                    <Form.Control size="sm" type="text" value={ownerLastname} onChange={this.changeOwnerLastname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_owner_nationality")}</Form.Label>
                                    <Form.Control size="sm" type="text" value={ownerNationality} onChange={this.changeOwnerNationality} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                <Form.Label>{t("search_page_form_label_zone_label")}</Form.Label>
                                <Form.Select value={zoneLabel} size="sm" onChange={this.changeZoneLabel}>
                                    <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                    {
                                        Array.from(parkingSlotNumberMap).map((element, index) => (
                                            <option value={element.zoneLabel}>{element.zoneLabel}</option>
                                        ))
                                    }
                                </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_slot_number")}</Form.Label>
                                    <Form.Select value={slot} size="sm" onChange={this.changeSlot}>
                                        <option value=''>{t("search_page_form_dropdown_select_an_option")}</option>
                                        {
                                            Array.from(slotNumberDropdownValues).map((element, index) => (
                                            <option value={element}>{element}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_estimated_release_date")}</Form.Label>
                                    <Form.Control type="date" size="sm" value={estimatedReleaseDate} onChange={this.changeEstimatedReleaseDate} />
                                </Form.Group>
                            </Row>
                            
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_actual_release_date")}</Form.Label>
                                    <Form.Control type="date" size="sm" value={releaseDate} onChange={this.changeReleaseDate} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_release_personnel_first_name")}</Form.Label>
                                    <Form.Control type="text" size="sm" value={releaseFirstname} onChange={this.changeReleaseFirstname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_release_personnel_last_name")}</Form.Label>
                                    <Form.Control type="text" size="sm" value={releaseLastname} onChange={this.changeReleaseLastname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>{t("search_page_form_label_keywords_in_remarks")}</Form.Label>
                                    <Form.Control type="text" size="sm" value={remarksKeyword} onChange={this.changeremarksKeyword} />
                                </Form.Group>
                            </Row>
                        </Form>
                    </div>
                    <div className="results_div">
                        { showResults ? 
                            <>
                            <Row className="result_header">
                                <Col xs={10}>
                                    <Form.Text className="result_header_text">{t("search_page_form_text_found_results")} {results.length} </Form.Text>
                                </Col>
                               
                                <Col id="button_col"><Button variant="secondary" disabled={results.length === 0} onClick={this.downloadResultsCSV}>{t("search_page_form_btn_export_to_csv")}</Button></Col>
                            </Row>
                            <div className="table_overflow">
                                <ResultsTable results={results} handleRowClick={this.handleRowClick} />
                            </div>
                            </>: null}
                    </div>
                </div>
            
            <Modal show={showResultModal} onHide={this.closeResultModal} animation={false} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto">{t("search_page_modal_title_registration_information")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedResult !== null && selectedResult.owner !== undefined ?
                        <CarRegistrationForm vehicle={selectedResult} images={images} callLogout={this.props.callLogout} updateMode={false}/> : <> </>
                    }
                </Modal.Body>
            </Modal>
            <LoginRedirectModal
                shouldShowRedirectLoginModal={shouldShowRedirectLoginModal}
                hideRedirectLoginModal={this.hideRedirectLoginModal}
            />
            </LoadingOverlay>
        )
    }
}

export default withTranslation()(SearchForm);