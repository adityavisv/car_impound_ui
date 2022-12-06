import React from 'react';
import { getVehicleStatusDisplay, getEmirateDisplay } from '../helpers/generalhelpers';
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
                                <td><span className="plaintext">{parkingSlot === null ? '--' : parkingSlot}</span></td>
                                <td><span className="plaintext">{(new Date(registrationDateTime)).toLocaleString('en-IN')}</span></td>
                                <td><span className="plaintext">{getVehicleStatusDisplay(vehicleStatus)}</span></td>
                                <td><span className="plaintext">{make}</span></td>
                                <td><span className="plaintext">{model}</span></td>
                                <td><span className="plaintext">{color}</span></td>
                                <td><span className="plaintext">{type}</span></td>
                                <td><span className="plaintext">{getEmirateDisplay(emirate)}</span></td>
                                <td><span className="plaintext">{category}</span></td>
                                <td><span className="plaintext">{code}</span></td>
                                <td><span className="plaintext">{numberPlate}</span></td>
                                <td><span className="plaintext">{chassisNumber}</span></td>
                                <td><span className="plaintext">{department}</span></td>
                                <td><span className="plaintext">{isWanted ? "Yes" : "No"}</span></td>
                                <td><span className="plaintext">{caseNumber === '' ? '--' : caseNumber}</span></td>
                                <td><span className="plaintext">{ownerFirstName === '' ? '--' : ownerFirstName}</span></td>
                                <td><span className="plaintext">{ownerLastName === '' ? '-- ' : ownerLastName}</span></td>
                                <td><span className="plaintext">{ownerNationality === '' ? '--' : ownerNationality}</span></td>
                                <td><span className="plaintext">{ownerContactNumber === '' ? '--' : ownerContactNumber}</span></td>
                                <td><span className="plaintext">{ownerEmailAddress === '' ? '--' : ownerEmailAddress}</span></td>
                                <td><span className="plaintext">{ownerIdType === '' ? '--' : ownerIdType}</span></td>
                                <td><span className="plaintext">{ownerIdNumber === '' ? '--' : ownerIdNumber}</span></td>
                                <td><span className="plaintext">{releaseIdentityFirstName}</span></td>
                                <td><span className="plaintext">{releaseIdentityLastName}</span></td>
                                <td><span className="plaintext">{releaseIdentityNationality}</span></td>
                                <td><span className="plaintext">{releaseIdentityContactNumber}</span></td>
                                <td><span className="plaintext">{releaseIdentityEmailAddress}</span></td>
                                <td><span className="plaintext">{releaseIdentityIdType}</span></td>
                                <td><span className="plaintext">{releaseIdentityIdNumber}</span></td>
                                <td><span className="plaintext">{estimatedReleaseDate !== null ? (new Date(estimatedReleaseDate)).toDateString() : '--'}</span></td>
                                <td><span className="plaintext">{releaseDateTime !== '' ? (new Date(releaseDateTime)).toLocaleString('en-IN') : '--'}</span></td>
                            </tr>
        )
    }

    render = () => {
        const { results } = this.state;
        const { handleRowClick } = this.props;
        return (
            <Table hover bordered >
            
                <thead className="table-dark">
                    <tr>
                        <th>Parking Slot Number</th>
                        <th>Registration Date/Time</th>
                        <th>Status</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Colour</th>
                        <th>Vehicle Type</th>
                        <th>Emirate</th>
                        <th>Category</th>
                        <th>Code</th>
                        <th>Number Plate</th>
                        <th>Chassis Number</th>
                        <th>Department</th>
                        <th>Is Wanted?</th>
                        <th>Case Number</th>
                        <th>Owner First Name</th>
                        <th>Owner Last Name</th>
                        <th>Owner Nationality</th>
                        <th>Owner Contact Number</th>
                        <th>Owner Email ID</th>
                        <th>Owner ID Type</th>
                        <th>Owner ID Number</th>
                        <th>Release Identity First Name</th>
                        <th>Release Identity Last name</th>
                        <th>Release Identity Nationality</th>
                        <th>Release Identity Contact Number</th>
                        <th>Release Identity Email ID</th>
                        <th>Release Identity ID Type</th>
                        <th>Release identity ID Number</th>
                        <th>Estimated Release Date</th>
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
            </Table>
        )
    }
}

export default ResultsTable;