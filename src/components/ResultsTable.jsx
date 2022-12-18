import React from 'react';
import { getVehicleStatusDisplay, getEmirateDisplay, getDateTimeString, getDateString, b64toBlob } from '../helpers/generalhelpers';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileDownload } from '@fortawesome/free-solid-svg-icons';

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

    b64toBlob = (b64Data, contentType='', sliceSize=512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
      
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
      
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
      
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
      
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }

    downloadSelectedReleaseDoc = (id) => {
        const { releaseDocument: { base64EncodedBlob, contentType} } = this.props.results.find(vehicle => vehicle.id === id);
        const bytes = this.b64toBlob(base64EncodedBlob, contentType);
        let url = window.URL.createObjectURL(bytes);
        let a = document.createElement('a');
        a.href = url;
        a.download = `RELEASEDOCUMENT.${contentType.split('/')[1]}`;
        a.click();
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
            <tr id={id} key={id} className="clickable">
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{parkingSlot === null ? '--' : parkingSlot}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{getDateTimeString(registrationDateTime)}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{getVehicleStatusDisplay(vehicleStatus)}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{make}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{model}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{color}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{type}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{getEmirateDisplay(emirate)}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{category}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{code}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{numberPlate}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{chassisNumber}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{department}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{isWanted ? "Yes" : "No"}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{caseNumber === '' ? '--' : caseNumber}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{ownerFirstName === '' ? '--' : ownerFirstName}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{ownerLastName === '' ? '-- ' : ownerLastName}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{ownerNationality === '' ? '--' : ownerNationality}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{ownerContactNumber === '' ? '--' : ownerContactNumber}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{ownerEmailAddress === '' ? '--' : ownerEmailAddress}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{ownerIdType === '' ? '--' : ownerIdType}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{ownerIdNumber === '' ? '--' : ownerIdNumber}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{releaseIdentityFirstName}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{releaseIdentityLastName}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{releaseIdentityNationality}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{releaseIdentityContactNumber}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{releaseIdentityEmailAddress}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{releaseIdentityIdType}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{releaseIdentityIdNumber}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{estimatedReleaseDate !== null ? getDateString(estimatedReleaseDate) : '--'}</span></td>
                                <td onClick={() => handleRowClick(id)}><span className="plaintext">{releaseDateTime !== '' ? getDateTimeString(releaseDateTime) : '--'}</span></td>
                                <td>
                                    <span className="plaintext">{
                                    vehicleStatus === 'REGISTERED' ? '--' : 
                                    <Button variant="secondary"
                                        onClick={() => this.downloadSelectedReleaseDoc(id)}>
                                            <FontAwesomeIcon faIcon={faFileDownload} fixedWidth /> Download
                                    </Button>}
                                    </span>
                                </td>
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
                        <th>Actual Release Date/Time</th>
                        <th>Release Document</th>
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