import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import UserService from '../services/user.service';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/searchform.css';
import LoginRedirectModal from './LoginRedirectModal';
import CarRegistrationForm from './CarRegistrationForm';
import ResultsTable from './ResultsTable';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        var slots = []
        for (var i = 1; i <= 88; i++) {
            slots.push(`A${i}`);
        }
        this.state = {
            searchInit: false,
            shouldShowRedirectLoginModal: false,
            searchDone: false,
            data: [],
            chassisNumber: '',
            caseNumber: '',
            make: '',
            model: '',
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
        this.setState({
            make: event.target.value
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

    c

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
            releaseDate,
            releaseFirstname,
            releaseLastname,
            ownerNationality,
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
            releaseDate,
            releaseFirstname,
            releaseLastname,
            ownerNationality,
            shouldShowRedirectLoginModal
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
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Text><h5>Search By:</h5></Form.Text>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Button type="submit" variant="secondary">Search</Button>
                                </Form.Group>
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
                                    <Form.Control type="text"  size="sm" value={make} onChange={this.changeMake}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control type="text" size="sm" value={model} onChange={this.changeModel} />
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
                        </Form>
                    </div>
                    <div className="results_div">
                        { showResults ? 
                            <>
                            Found results: {results.length}
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