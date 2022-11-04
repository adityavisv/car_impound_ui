import React from 'react';
import { Modal, Row, Container, Button } from 'react-bootstrap';
import '../styles/singleslotoverview.css';

class SingleSlotOverviewModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const { 
            closeSlotModal,
            shouldDisplaySlotModal,
            selectedSlot,
            showRegisterModal,
            showReleaseModal,
            setFirstSelectedSlot
        } = this.props;

        return (
            <Modal show={shouldDisplaySlotModal} onHide={closeSlotModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Slot Status - <span className={selectedSlot.occupancyStatus === "AVAILABLE" ? "availableMode" : "occupiedMode"}>
                                    {selectedSlot.occupancyStatus}</span> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Container>
                            <div className="text_info">
                                <Row>
                                    Zone Label : {selectedSlot.zoneLabel}
                                </Row>
                                <Row>
                                    Slot Number: {selectedSlot.slotNumber}
                                </Row>
                                {selectedSlot.occupancyStatus === 'OCCUPIED' ?
                                    <>
                                        <Row>
                                            Make: {selectedSlot.occupiedVehicle.make}
                                        </Row>
                                        <Row>
                                            Model: {selectedSlot.occupiedVehicle.model}
                                        </Row>
                                        <Row>
                                            Number Plate: {selectedSlot.occupiedVehicle.numberPlate}
                                        </Row> 
                                        
                                        
                                    </> : <></>}
                            </div>
                            <div className="image_box">
                                {selectedSlot.occupancyStatus === 'OCCUPIED' && selectedSlot.occupiedVehicle.image !== undefined ?
                                    <img 
                                        src={"data:image/png;base64," + selectedSlot.occupiedVehicle.image}
                                        width="200"
                                        height="200"
                                        /> :
                                    <></>}
                            </div>
                           
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        {selectedSlot.occupancyStatus === "AVAILABLE" ? 
                            <>
                                <Button variant="primary" onClick={showRegisterModal}>Assign</Button>
                                <Button variant="primary" onClick={setFirstSelectedSlot}>Assign to Multiple Slots</Button>
                            </> : <Button variant="primary" onClick={showReleaseModal}>Release</Button>}
                        
                    </Modal.Footer>
                </Modal>
               
        )
    }
}

export default SingleSlotOverviewModal;