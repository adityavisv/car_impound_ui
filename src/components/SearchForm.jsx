import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Modal, Row, Form } from 'react-bootstrap';
import { Parser } from 'json2csv';
import LoadingOverlay from 'react-loading-overlay';
import UserService from '../services/user.service';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/searchform.css';
import LoginRedirectModal from './LoginRedirectModal';
import CarRegistrationForm from './CarRegistrationForm';
import ResultsTable from './ResultsTable';
import { makeModelData } from '../newcardb';
import { getAllModelsByMake } from '../helpers/generalhelpers';

export default class SearchForm extends React.Component {

    constructor(props) {
        super(props);

        const allMakes = makeModelData.map((value) => (
            value.brand
        ));

        var slots = []
        for (var i = 1; i <= 88; i++) {
            slots.push(`A${i}`);
        }
        this.state = {
            searchInit: false,
            shouldShowRedirectLoginModal: false,
            makesDropdownValues: [... new Set(allMakes)],
            modelsDropdownValues: [... new Set(getAllModelsByMake('Alfa Romeo'))],
            searchDone: false,
            data: [],
            chassisNumber: '',
            caseNumber: '',
            make: 'Alfa Romeo',
            model: '4C',
            color: '',
            type: '',
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
            slots
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
        const modelsByMake = getAllModelsByMake(make);
        this.setState({
            make,
            modelsDropdownValues: [... new Set(modelsByMake)]
        });
    }

    changeModel = (event) => {
        this.setState({
            model: event.target.value
        });
    }

    changeColor = (event) => {
        this.setState({
            color: event.target.value
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
        } = this.state;

        if (make !== '')
            params.make = make;
        if (model !== '')
            params.model = model;
        if (color !== '')
            params.color = color;
        if (slot !== '')
            params.slot = slot;
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
        const fields = ["id","make","model","type","vehicleStatus","registrationDateTime","estimatedReleaseDate","caseNumber","chassisNumber","color","parkingSlot","isWanted","numberPlate","owner","department","emirate","category","code","releaseIdentity"];
        const opts = { fields };

        try {
            const parser = new Parser(opts);
            const csv = parser.parse(results);

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
        catch (err) {
            console.log(err);
        }


    }

    render = () => {
        const {
            results,  
            showResults, 
            make, 
            model, 
            color, 
            slots, 
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
            remarksKeyword,
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
                                <Form.Text className="search_form_text">Search By:</Form.Text>
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
                                    <Form.Select size="sm" value={make} onChange={this.changeMake}>
                                        {
                                            Array.from(makesDropdownValues).map((item) => (
                                                <option value={item}>{item}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Select size="sm" value={model} onChange={this.changeModel}>
                                        {
                                            Array.from(modelsDropdownValues).map((item) => (
                                                <option value={item}>{item}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Vehicle Type</Form.Label>
                                    <Form.Select value={type} onChange={this.changeType}>
                                        <option value=''>Select an option</option>
                                        <option value="CAR">Car</option>
                                        <option value="TRUCK">Truck</option>
                                        <option value="MOTORCYCLE">Motorcycle</option>
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
                                    <Form.Control type="text" size="sm" value={emirate} onChange={this.changeEmirate} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type="text" size="sm" value={category} onChange={this.changeCategory} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Code</Form.Label>
                                    <Form.Control type="text" size="sm" value={code} onChange={this.changeCode} />
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
                                    <Form.Control type="text" value={ownerFirstname} onChange={this.changeOwnerFirstname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Owner Last Name</Form.Label>
                                    <Form.Control type="text" value={ownerLastname} onChange={this.changeOwnerLastname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Owner Nationality</Form.Label>
                                    <Form.Control type="text" value={ownerNationality} onChange={this.changeOwnerNationality} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Slot Number</Form.Label>
                                    <Form.Select value={slot} size="sm" onChange={this.changeSlot}>
                                        <option value=''>Select an option</option>
                                        {
                                            Array.from(slots).map((element, index) => (
                                            <option value={element}>{element}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Estimated Release Date</Form.Label>
                                    <Form.Control type="date" value={estimatedReleaseDate} onChange={this.changeEstimatedReleaseDate} />
                                </Form.Group>
                            </Row>
                            
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Release Date</Form.Label>
                                    <Form.Control type="date" value={releaseDate} onChange={this.changeReleaseDate} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Release Personnel First Name</Form.Label>
                                    <Form.Control type="text" value={releaseFirstname} onChange={this.changeReleaseFirstname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Release Personnel Last Name</Form.Label>
                                    <Form.Control type="text" value={releaseLastname} onChange={this.changeReleaseLastname} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Keywords in remarks</Form.Label>
                                    <Form.Control type="text" value={remarksKeyword} onChange={this.changeremarksKeyword} />
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
                               
                                <Col id="button_col"><Button variant="secondary" onClick={this.downloadResultsCSV}>Export to CSV</Button></Col>
                            </Row>
                            
                            <ResultsTable results={results} handleRowClick={this.handleRowClick} /> </>: null}
                    </div>
                </div>
            
            <Modal show={showResultModal} onHide={this.closeResultModal} animation={false} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Search Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedResult !== null && selectedResult.owner !== undefined ?
                        <CarRegistrationForm vehicle={selectedResult} /> : <> </>
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