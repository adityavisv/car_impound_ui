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

    getTableRowFromObject = (resultObj, handleRowClick) => {
        if (resultObj.releaseIdentity === null)
            resultObj.releaseIdentity = {};
        const {
            id,
            make,
            model,
            type,
            vehicleStatus,
            registrationDateTime,
            estimatedReleaseDate,
            caseNumber,
            chassisNumber,
            color,
            parkingSlot,
            isWanted,
            numberPlate,
            owner: {
                idType: ownerIdType,
                firstName: ownerFirstName,
                lastName: ownerLastName,
                emailAddress: ownerEmailAddress,
                idNumber: ownerIdNumber,
                contactNumber: ownerContactNumber,
                nationality: ownerNationality,
            } = {},
            department,
            emirate,
            category,
            code,
            releaseIdentity: {
                firstName: releaseIdentityFirstName = '--',
                lastName: releaseIdentityLastName = '--',
                idType: releaseIdentityIdType = '--',
                idNumber: releaseIdentityIdNumber = '--',
                contactNumber: releaseIdentityContactNumber = '--',
                emailAddress: releaseIdentityEmailAddress = '--',
                nationality: releaseIdentityNationality = '--',
                releaseDateTime = ''
            } = {}
        } = resultObj;
        return (
            <tr id={id} key={id} onClick={handleRowClick} className="clickable">
                                <td><div className="plaintext">{make}</div></td>
                                <td><div className="plaintext">{model}</div></td>
                                <td><div className="plaintext">{type}</div></td>
                                <td><div className="plaintext">{vehicleStatus}</div></td>
                                <td><div className="plaintext">{(new Date(registrationDateTime)).toLocaleString('en-IN')}</div></td>
                                <td><div className="plaintext">{estimatedReleaseDate !== null ? (new Date(estimatedReleaseDate)).toDateString() : '--'}</div></td>
                                <td><div className="plaintext">{caseNumber}</div></td>
                                <td><div className="plaintext">{chassisNumber}</div></td>
                                <td><div className="plaintext">{color}</div></td>
                                <td><div className="plaintext">{parkingSlot}</div></td>
                                <td><div className="plaintext">{isWanted}</div></td>
                                <td><div className="plaintext">{numberPlate}</div></td>
                                <td><div className="plaintext">{ownerIdType}</div></td>
                                <td><div className="plaintext">{ownerFirstName}</div></td>
                                <td><div className="plaintext">{ownerLastName}</div></td>
                                <td><div className="plaintext">{ownerEmailAddress}</div></td>
                                <td><div className="plaintext">{ownerIdNumber}</div></td>
                                <td><div className="plaintext">{ownerContactNumber}</div></td>
                                <td><div className="plaintext">{ownerNationality}</div></td>
                                <td><div className="plaintext">{department}</div></td>
                                <td><div className="plaintext">{emirate}</div></td>
                                <td><div className="plaintext">{category}</div></td>
                                <td><div className="plainext">{code}</div></td>
                                <td><div className="plaintext">{releaseIdentityFirstName}</div></td>
                                <td><div className="plaintext">{releaseIdentityLastName}</div></td>
                                <td><div className="plaintext">{releaseIdentityIdType}</div></td>
                                <td><div className="plaintext">{releaseIdentityIdNumber}</div></td>
                                <td><div className="plaintext">{releaseIdentityContactNumber}</div></td>
                                <td><div className="plaintext">{releaseIdentityEmailAddress}</div></td>
                                <td><div className="plaintext">{releaseIdentityNationality}</div></td>
                                <td><div className="plaintext">{releaseDateTime !== '' ? (new Date(releaseDateTime)).toLocaleString('en-IN') : '--'}</div></td>
                            </tr>
        )
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
                    <th>Vehicle Type</th>
                    <th>Vehicle Registration Status</th>
                    <th>Registration Date/Time</th>
                    <th>Estimated Release Date</th>
                    <th>Case Number</th>
                    <th>Chassis Number</th>
                    <th>Color</th>
                    <th>Parking Slot Number</th>
                    <th>Is Wanted</th>
                    <th>Number Plate</th>
                    <th>Owner ID Type</th>
                    <th>Owner First Name</th>
                    <th>Owner Last Name</th>
                    <th>Owner Email Address</th>
                    <th>Owner Id Number</th>
                    <th>Owner Contact Number</th>
                    <th>Owner Nationality</th>
                    <th>Department</th>
                    <th>Emirate</th>
                    <th>Category</th>
                    <th>Code</th>
                    <th>Release Identity First Name</th>
                    <th>Release Identity Last Name</th>
                    <th>Release Identity ID Type</th>
                    <th>Release Identity ID Number</th>
                    <th>Release Identity Contact Number</th>
                    <th>Release Identity EmailAddress</th>
                    <th>Release Identity Nationality</th>
                    <th>Release Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.from(results).map((element, index) => (
                            this.getTableRowFromObject(element, handleRowClick)
                        ))
                    }
                    
                </tbody>
            </table>
        )
    }
}

export default ResultsTable;