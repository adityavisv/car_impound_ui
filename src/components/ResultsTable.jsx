import React from 'react';
import { Table } from 'react-bootstrap';

class ResultsTable extends React.Component {
    constructor(props) {
        super(props);
        const { results } = this.props;
        this.state = {
            results
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.results !== this.props.results) {
            const { results } = this.props;
            this.setState({results});
        }
    }

    render = () => {
        const { results } = this.state;
        const { handleRowClick } = this.props;
        return (
            <table className="table table-hover table-responsive table-bordered ">
                <thead className="table-dark">
                    <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Parking Slot Number</th>
                    <th>Number Plate</th>
                    <th>Registration Date</th>
                    <th>Registration Time</th>
                    <th>Department</th>
                    <th>Case Number</th>
                    <th>Mulkia Number</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from(results).map((element, index) => (
                            <tr id={element.id} key={element.id} onClick={handleRowClick} className="clickable">
                                <td><div className="plaintext">{element.make}</div></td>
                                <td><div className="plaintext">{element.model}</div></td>
                                <td><div className="plaintext">{element.color}</div></td>
                                <td><div className="plaintext">{element.parkingSlot}</div></td>
                                <td><div className="plaintext">{element.numberPlate}</div></td>
                                <td><div className="plaintext">{(new Date(element.registrationDateTime)).toDateString()}</div></td>
                                <td><div className="plaintext">{(new Date(element.registrationDateTime)).toLocaleString('en-IN')}</div></td>
                                <td><div className="plaintext">{element.department}</div></td>
                                <td><div className="plaintext">{element.caseNumber}</div></td>
                                <td><div className="plaintext">{element.mulkiaNumber}</div></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

export default ResultsTable;