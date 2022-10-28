import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Form, FormLabel, Row } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import '../styles/searchform.css';
import BootstrapTable from 'react-bootstrap-table-next';
import UserService from '../services/user.service';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInit: false,
            searchDone: false,
            data: [],
            make: '',
            model: '',
            color: '',
            slot: '',
            numberPlate: '',
            columns: [
                {
                    dataField: 'make',
                    text: 'Make'
                },
                {
                    dataField: 'model',
                    text: 'Model'
                },
                {
                    dataField: 'color',
                    text: 'Colour'
                },
                {
                    dataField: 'parkingSlot',
                    text: 'Slot Number'
                },
                {
                    dataField: 'numberPlate',
                    text: 'Number Plate'
                }
            ],
            showResults: false,
            results: []
        }
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
                    if (error.response.status === 401) {
                        this.props.callLogout();
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

    render = () => {
        const {results, columns, showResults, make, model, color, slot, numberPlate} = this.state;
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
                                <Form.Control type="text" placeholder="text" value={make} onChange={this.changeMake}/>
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
                                    <option value="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="A3">A3</option>
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
                    <BootstrapTable data={results} columns={columns} keyField="numberPlate"/> : null}
            </div>
            </LoadingOverlay>
        )
    }
}