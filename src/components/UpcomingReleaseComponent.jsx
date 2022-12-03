import React from 'react';
import { Form, Modal, Table, Button } from 'react-bootstrap';
import '../styles/upcomingreleases.css';
import CarRegistrationForm from './CarRegistrationForm';
import ReleaseCarForm from './ReleaseCarForm';
class UpcomingReleaseComponent extends React.Component {
    constructor(props) {
        super(props);
        const { upcomingReleases, currentUser } = this.props;
        this.state = {
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
        const { upcomingReleases, selectedVehicle, showVehicleProfile, showReleaseModal, selectedSlot } = this.state;
        return (
            <div className="upcoming_release_padded">
                <Modal show={showVehicleProfile} onHide={this.closeResultModal} animation={false} size="xl">
                    <Modal.Header closeButton>
                        Vehicle Profile
                    </Modal.Header>
                    <Modal.Body>
                        {selectedVehicle !== {} && selectedVehicle.owner !== undefined ?
                        <CarRegistrationForm vehicle={selectedVehicle} /> : <></>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.openReleaseModal}>Release</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showReleaseModal} onHide={this.closeReleaseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Vehicle Release</Modal.Title>
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
                    <Form.Text className="upcoming_release_header_text">SCHEDULED RELEASES</Form.Text>
                </div>
                <div>
                    <Table hover variant="dark">
                        <thead>
                            <tr>
                            
                                <th>Vehicle Make</th>
                                <th>Vehicle Model</th>
                                <th>Vehicle Color</th>
                                <th>Vehicle Type</th>
                                <th>Emirate</th>
                                <th>Category</th>
                                <th>Code</th>
                                <th>Number Plate</th>
                                <th>Registration Date/Time</th>
                                <th>Estimated Release Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Array.from(upcomingReleases).map((item) =>(
                                <tr id={item.id} onClick={this.handleRowClick} key={item.id}>
                                    <th>{item.make}</th>
                                    <th>{item.model}</th>
                                    <th>{item.color}</th>
                                    <th>{item.type}</th>
                                    <th>{item.emirate}</th>
                                    <th>{item.category}</th>
                                    <th>{item.code}</th>
                                    <th>{item.numberPlate}</th>
                                    <th>{(new Date(item.registrationDateTime)).toLocaleString("en-IN")}</th>
                                    <th>{(new Date(item.estimatedReleaseDate)).toLocaleDateString("en-IN")}</th>
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

export default UpcomingReleaseComponent;