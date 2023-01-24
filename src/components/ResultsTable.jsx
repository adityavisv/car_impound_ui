import React from 'react';
import { getVehicleStatusDisplay, getEmirateDisplay, getDateTimeString, getDateString, b64toBlob } from '../helpers/generalhelpers';
import { Table, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
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
        const { t } = this.props;
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
                                            <FontAwesomeIcon faIcon={faFileDownload} fixedWidth /> {t("results_table_btn_download")}
                                    </Button>}
                                    </span>
                                </td>
                            </tr>
        )
    }

    render = () => {
        const { results } = this.state;
        const { handleRowClick, t } = this.props;
        return (
            <Table hover bordered >
            
                <thead className="table-dark">
                    <tr>
                        <th>{t("results_table_header_parking_slot_number")}</th>
                        <th>{t("results_table_header_registration_datetime")}</th>
                        <th>{t("results_table_header_status")}</th>
                        <th>{t("results_table_header_make")}</th>
                        <th>{t("results_table_header_model")}</th>
                        <th>{t("results_table_header_color")}</th>
                        <th>{t("results_table_header_vehicle_type")}</th>
                        <th>{t("results_table_header_emirate")}</th>
                        <th>{t("results_table_header_category")}</th>
                        <th>{t("results_table_header_code")}</th>
                        <th>{t("results_table_header_number_plate")}</th>
                        <th>{t("results_table_header_chassis_number")}</th>
                        <th>{t("results_table_header_department")}</th>
                        <th>{t("results_table_header_is_wanted")}</th>
                        <th>{t("results_table_header_case_number")}</th>
                        <th>{t("results_table_header_owner_firstname")}</th>
                        <th>{t( "results_table_header_owner_lastname")}</th>
                        <th>{t("results_table_header_owner_nationality")}</th>
                        <th>{t("results_table_header_owner_contact_number")}</th>
                        <th>{t("results_table_header_owner_email_id")}</th>
                        <th>{t( "results_table_header_owner_id_type")}</th>
                        <th>{t("results_table_header_owner_id_number")}</th>
                        <th>{t("results_table_header_release_identity_firstname")}</th>
                        <th>{t("results_table_header_release_identity_lastname")}</th>
                        <th>{t("results_table_header_release_identity_nationality")}</th>
                        <th>{t("results_table_header_release_identity_contact_number")}</th>
                        <th>{t("results_table_header_release_identity_email_id")}</th>
                        <th>{t("results_table_header_release_identity_id_type")}</th>
                        <th>{t("results_table_header_release_identity_id_number")}</th>
                        <th>{t("results_table_header_estimated_release_date")}</th>
                        <th>{t("results_table_header_actual_release_datetime")}</th>
                        <th>{t("results_table_header_release_document")}</th>
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

export default withTranslation()(ResultsTable);