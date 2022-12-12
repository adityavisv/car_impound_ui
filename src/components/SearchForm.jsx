import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Modal, Row, Form } from 'react-bootstrap';
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

export default class SearchForm extends React.Component {

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
            startDate: event.target.value
        });
    }

    changeEndDate = (event) => {
        this.setState({
            endDate: event.target.value
        });
    }

    changeMake = (event) => {
        const make = event.target.value;
        const { isMakeOther } = this.state;
        if (isMakeOther) {
            this.setState({
                make
            });
        }
        else {
            const modelsByMake = getAllModelsByMake(make);
            this.setState({
                make,
                isMakeOther: make === 'OTHER',
                isModelOther: model === 'OTHER',
                modelsDropdownValues: [... new Set(modelsByMake)]
            });
        }
    }

    changeModel = (event) => {
        const { isModelOther } = this.state;
        const { value: model } = event.target;
        if (isModelOther) {
            this.setState({
                model
            });
        }
        else {
            this.setState({
                model,
                isModelOther: model === 'OTHER'
            });
        }
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

    closeResultModal = () => {
        this.setState({
            showResultModal: false
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
            status
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

    handleRowClick = (event) => {
        const resultId = event.currentTarget.id;
        const { results } = this.state;
        const selectedResult = results.find(result => result.id === parseInt(resultId));
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
            status: ''
        })
    }

    render = () => {
        const {
            results,  
            showResults, 
            isMakeOther,
            isModelOther,
            make, 
            model, 
            color,
            zoneLabel,
            slot, 
            numberPlate, 
            showResultModal, 
            selectedResult,
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
            status
        } = this.state;

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
                                    <Button onClick={this.clearSearchForm} id="search_btn" variant="secondary">Clear</Button>
                                </Col>
                                    
                                <Col id="search_btn_col">
                                    <Button type="submit" id="search_btn" variant="secondary">Search</Button>
                                </Col>
                            </Row>
                                
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control type="date" size="sm" value={startDate} onChange={this.changeStartDate} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control type="date" size="sm" value={endDate} onChange={this.changeEndDate} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Make</Form.Label>
                                    {

                                        isMakeOther ? <Form.Control type="text" size="sm" onChange={this.changeMake} value={make} /> :
                                        <Form.Select size="sm" value={make} onChange={this.changeMake}>
                                            <option value=''>Select an option</option>
                                            <option value='OTHER'>Other</option>
                                            {
                                                Array.from(makesDropdownValues).map((item) => (
                                                    <option value={item}>{item}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    }
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Model</Form.Label>
                                    {
                                        isModelOther ? <Form.Control type="text" size="sm" onChange={this.changeModel} value={model} /> :
                                        
                                    
                                        <Form.Select size="sm" value={model} onChange={this.changeModel}>
                                            <option value='OTHER'>Other</option>
                                            <option value=''>Select an option</option>
                                            {
                                                Array.from(modelsDropdownValues).map((item) => (
                                                    <option value={item}>{item}</option>
                                                ))
                                            }
                                        </Form.Select>
                                    }
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Vehicle Type</Form.Label>
                                    <Form.Select size="sm" value={type} onChange={this.changeType}>
                                        <option value=''>Select an option</option>
                                        <option value="CAR">Car</option>
                                        <option value="TRUCK">Truck</option>
                                        <option value="MOTORCYCLE">Motorcycle</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select size="sm" value={status} onChange={this.changeStatus}>
                                        <option value=''>Select an option</option>
                                        <option value='REGISTERED'>Registered</option>
                                        <option value='APPROVED_FOR_RELEASE'>Approved for release</option>
                                        <option value='RELEASED'>Released</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Colour</Form.Label>
                                    <Form.Control type="text" size="sm" value={color} onChange={this.changeColor} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Number Plate</Form.Label>
                                    <Form.Control type="text" size="sm" value={numberPlate} onChange={this.changeNumberPlate} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Case Number</Form.Label>
                                    <Form.Control type="text" size="sm" value={caseNumber} onChange={this.changeCaseNumber} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Chassis Number</Form.Label>
                                    <Form.Control type="text" size="sm" value={chassisNumber} onChange={this.changeChassisNumber} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Emirate</Form.Label>
                                    <Form.Select size="sm" value={emirate} onChange={this.changeEmirate}>
                                        <option value=''>Select an option</option>
                                        <option value="ABU_DHABI">Abu Dhabi</option>
                                        <option value="AJMAN">Ajman</option>
                                        <option value="DUBAI">Dubai</option>
                                        <option value="FUJAIRAH">Fujairah</option>
                                        <option value="RAS_AL_KHAYMAH">Ras Al Khaymah</option>
                                        <option value="SHARJAH">Sharjah</option>
                                        <option value="UMM_AL_QUWAIN">Umm Al Quwain</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select size="sm" value={category} onChange={this.changeCategory}>
                                        <option value=''>Select an option</option>
                                        {this.populateCategoryDropdown()}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Code</Form.Label>
                                    <Form.Select size="sm" value={code} onChange={this.changeCode}>
                                        <option value=''>Select an option</option>
                                        {this.populateCodeDropdown()}
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Is Wanted?</Form.Label>
                                    <Form.Select size="sm" value={isWanted} onChange={this.changeIsWanted}>
                                        <option value=''>Select an option</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Form.Select>
                                </Form.Group>    
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Owner First Name</Form.Label>
                                    <Form.Control size="sm" type="text" value={ownerFirstname} onChange={this.changeOwnerFirstname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Owner Last Name</Form.Label>
                                    <Form.Control size="sm" type="text" value={ownerLastname} onChange={this.changeOwnerLastname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Owner Nationality</Form.Label>
                                    <Form.Control size="sm" type="text" value={ownerNationality} onChange={this.changeOwnerNationality} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                <Form.Label>Zone Label</Form.Label>
                                <Form.Select value={zoneLabel} size="sm" onChange={this.changeZoneLabel}>
                                    <option value=''>Select an option</option>
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
                                    <Form.Label>Slot Number</Form.Label>
                                    <Form.Select value={slot} size="sm" onChange={this.changeSlot}>
                                        <option value=''>Select an option</option>
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
                                    <Form.Label>Estimated Release Date</Form.Label>
                                    <Form.Control type="date" size="sm" value={estimatedReleaseDate} onChange={this.changeEstimatedReleaseDate} />
                                </Form.Group>
                            </Row>
                            
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Actual Release Date</Form.Label>
                                    <Form.Control type="date" size="sm" value={releaseDate} onChange={this.changeReleaseDate} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Release Personnel First Name</Form.Label>
                                    <Form.Control type="text" size="sm" value={releaseFirstname} onChange={this.changeReleaseFirstname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Release Personnel Last Name</Form.Label>
                                    <Form.Control type="text" size="sm" value={releaseLastname} onChange={this.changeReleaseLastname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Keywords in remarks</Form.Label>
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
                                    <Form.Text className="result_header_text">Found results: {results.length} </Form.Text>
                                </Col>
                               
                                <Col id="button_col"><Button variant="secondary" disabled={results.length === 0} onClick={this.downloadResultsCSV}>Export to CSV</Button></Col>
                            </Row>
                            <div className="table_overflow">
                                <ResultsTable results={results} handleRowClick={this.handleRowClick} />
                            </div>
                            </>: null}
                    </div>
                </div>
            
            <Modal show={showResultModal} onHide={this.closeResultModal} animation={false} size="xl" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto">Registration Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedResult !== null && selectedResult.owner !== undefined ?
                        <CarRegistrationForm vehicle={selectedResult} callLogout={this.props.callLogout}/> : <> </>
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