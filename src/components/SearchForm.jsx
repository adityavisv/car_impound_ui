import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import '../styles/searchform.css';
import BootstrapTable from 'react-bootstrap-table-next';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    dataField: 'foo',
                    text: 'foo'
                },
                {
                    dataField: 'bar',
                    text: 'bar'
                },
                {
                    dataField: 'foo2',
                    text: 'foo2'
                },
                {
                    dataField: 'bar2',
                    text: 'bar2'
                },
                {
                    dataField: 'foo3',
                    text: 'baz'
                }
            ],
            showResults: false
        }
    }

    onClickSearch = (event) => {
        event.preventDefault();
        this.setState ({
            showResults: true
        });
    }

    render = () => {
        const {data, columns, showResults} = this.state;
        return (
            <>
            <div className="search_form">
                <Row>
                    <Form>
                        <Row className="align-items-center">
                            <Col xs={7}>
                                {/* <Form.Label>Search Keyword: </Form.Label> */}
                                <Form.Control type="text" placeholder="Search keyword" required={true}/>
                            </Col>
                            <Col>
                                <Button onClick={this.onClickSearch}>Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </div>
            <div className="results_div">
                    { showResults ? 
                    <BootstrapTable data={data} columns={columns} keyField="foo"/> : null}
            </div>
            </>
        )
    }
}