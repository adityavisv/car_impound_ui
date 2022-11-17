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
            make: '',
            model: '',
            color: '',
            slot: '',
            numberPlate: '',
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
        const { make, model, color, slot, numberPlate } = this.state;
        if (make !== '')
            params.make = make;
        if (model !== '')
            params.model = model;
        if (slot !== '')
            params.slot = slot;
        if (numberPlate !== '')
            params.numberPlate = numberPlate;
        if (color !== '')
            params.color = color;

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
        const {results,  showResults, make, model, color, slots, 
            slot, numberPlate, showResultModal, selectedResult, shouldShowRedirectLoginModal} = this.state;
        return (
            <LoadingOverlay
                active={this.loadingOverlayController()}
                spinner
                text='Loading results...'
            >
            <div className="search_form">
               
                    <Form onSubmit={this.hitSearch}>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Make</Form.Label>
                                <Form.Control type="text"  value={make} onChange={this.changeMake}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Model</Form.Label>
                                <Form.Control type="text" value={model} onChange={this.changeModel} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Colour</Form.Label>
                                <Form.Control type="text" value={color} onChange={this.changeColor} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Number Plate</Form.Label>
                                <Form.Control type="text" value={numberPlate} onChange={this.changeNumberPlate} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Slot Number</Form.Label>
                                <Form.Select value={slot} onChange={this.changeSlot}>
                                    <option value=''>Select an option</option>
                                    {
                                        Array.from(slots).map((element, index) => (
                                            <option value={element}>{element}</option>
                                        ))
                                        }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <div id="button_container">
                        <Button type="submit" variant="primary">Search</Button>
                    </div>
                    </Form>
            </div>
            <div className="results_div">
                    { showResults ? 
                    <>
                        Found results: {results.length}
                        <ResultsTable results={results} handleRowClick={this.handleRowClick} /> </>: null}
            </div>
            <Modal show={showResultModal} onHide={this.closeResultModal} animation={false} size="lg">
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