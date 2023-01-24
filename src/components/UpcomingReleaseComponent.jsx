import React from 'react';
import { Form, Modal, Table, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import '../styles/upcomingreleases.css';
import CarRegistrationForm from './CarRegistrationForm';
import ReleaseCarForm from './ReleaseCarForm';
import { getEmirateDisplay } from '../helpers/generalhelpers';

class UpcomingReleaseComponent extends React.Component {
    constructor(props) {
        super(props);
        const { upcomingReleases, missedReleases, currentUser } = this.props;
        this.state = {
            missedReleases,
            upcomingReleases,
            currentUser,
            showVehicleProfile: false,
            showReleaseModal: false,
            selectedVehicle: {
            }
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
       if (this.props.upcomingReleases !== prevProps.upcomingReleases) {
           this.setState({
               upcomingReleases: this.props.upcomingReleases
           });
       }
       if (this.props.currentUser !== prevProps.currentUser) {
           this.setState({
               currentUser: this.props.currentUser
           });
       }
       if (this.props.missedReleases !== prevProps.missedReleases) {
           this.setState({
               missedReleases: this.props.missedReleases
           });
       }
      
    }
    
    handleRowClick = (event) => {
        const vehicleId = event.currentTarget.id;
        const { upcomingReleases } = this.state;
        const selectedVehicle = upcomingReleases.find(vehicle => vehicle.id === parseInt(vehicleId));
        const { parkingSlot } = selectedVehicle;
        const selectedSlot = {
            zoneLabel: parkingSlot.split(" ")[0].charAt(0),
            slotNumber: parseInt(parkingSlot.split(" ")[0].substring(1))
        };
        this.setState({
            selectedSlot,
            selectedVehicle,
            showVehicleProfile: true
        });
    }

    closeResultModal = (event) => {
        this.setState({
            selectedVehicle: {
            },
            showVehicleProfile: false
        });
    }

    openReleaseModal = () => {
        this.setState({
            showReleaseModal: true
        });
    }

    closeReleaseModal = () => {
        this.setState({
            showReleaseModal: false
        });
    }

    render = () => {
        const { upcomingReleases, missedReleases, selectedVehicle, showVehicleProfile, showReleaseModal, selectedSlot } = this.state;
        const { t } = this.props;
        return (
            <div className="upcoming_release_padded">
                <Modal show={showVehicleProfile} onHide={this.closeResultModal} animation={false} size="xl" centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-auto">{t("upcoming_releases_page_modal_header_registration_information")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedVehicle !== {} && selectedVehicle.owner !== undefined ?
                        <CarRegistrationForm vehicle={selectedVehicle} /> : <></>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.openReleaseModal}>{t("upcoming_releases_page_modal_footer_btn_release")}</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showReleaseModal} onHide={this.closeReleaseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{t("upcoming_releases_page_modal_header_vehicle_release")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            showReleaseModal ?
                        
                        <ReleaseCarForm
                            closeForm={this.closeReleaseModal}
                            selectedSlot={selectedSlot}
                            closeResultModal={this.closeResultModal}
                            callUpcomgingReleasesService={this.props.callUpcomgingReleasesService}
                            callLogout={this.props.callLogout}
                        /> : <></>}
                    </Modal.Body>
                </Modal>

                <div className="upcoming_release_header_text">
                    <Form.Text className="upcoming_release_header_text">{t("upcoming_releases_page_header_upcoming_releases")}</Form.Text>
                </div>
                <div>
                    <Table hover variant="dark" bordered>
                        <thead className="table-light">
                            <tr>
                                <th>{t("upcoming_releases_page_table_header_parking_slot_number")}</th>
                                <th>{t("upcoming_releases_page_table_header_emirate")}</th>
                                <th>{t("upcoming_releases_page_table_header_category")}</th>
                                <th>{t("upcoming_releases_page_table_header_code")}</th>
                                <th>{t("upcoming_releases_page_table_header_number_plate")}</th>
                                <th>{t("upcoming_releases_page_table_header_make")}</th>
                                <th>{t("upcoming_releases_page_table_header_model")}</th>
                                <th>{t("upcoming_releases_page_table_header_color")}</th>
                                <th>{t("upcoming_releases_page_table_header_type")}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Array.from(upcomingReleases).map((item) =>(
                                <tr id={item.id} onClick={this.handleRowClick} key={item.id}>
                                    <td>{item.parkingSlot}</td>
                                    <td>{getEmirateDisplay(item.emirate)}</td>
                                    <td>{item.category}</td>
                                    <td>{item.code}</td>
                                    <td>{item.numberPlate}</td>
                                    <td>{item.make}</td>
                                    <td>{item.model}</td>
                                    <td>{item.color}</td>
                                    <td>{item.type}</td>
                                </tr>  
                            ))
                        }
                        {
                             Array.from(missedReleases).map((item) =>(
                                <tr id={item.id} onClick={this.handleRowClick} key={item.id}>
                                    <td>{item.parkingSlot}</td>
                                    <td>{getEmirateDisplay(item.emirate)}</td>
                                    <td>{item.category}</td>
                                    <td>{item.code}</td>
                                    <td>{item.numberPlate}</td>
                                    <td>{item.make}</td>
                                    <td>{item.model}</td>
                                    <td>{item.color}</td>
                                    <td>{item.type}</td>
                                </tr>  
                            ))
                        }
                        </tbody>
                    </Table>
                </div>

            </div>
        );
    }
}

export default withTranslation()(UpcomingReleaseComponent);