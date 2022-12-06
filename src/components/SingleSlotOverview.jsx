import React from 'react';
import { Modal, Row, Container, Button, Carousel } from 'react-bootstrap';
import '../styles/singleslotoverview.css';

class SingleSlotOverviewModal extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldShowButton = (ocStatus) => {
        const { currentUser,
            showRegisterModal,
            showReleaseModal,
            setFirstSelectedSlot,
            selectedSlot: {zoneLabel}
        } = this.props;
        if (currentUser.roles.includes("ROLE_EXIT_OPERATOR"))
            return <></>
        else {
            if (ocStatus === "AVAILABLE") {
                return  <>
                    <Button variant="secondary" onClick={showRegisterModal}>Assign</Button>
                    {zoneLabel !== 'T' ? <Button variant="secondary" onClick={setFirstSelectedSlot}>Assign to Multiple Slots</Button> : <></>}
                </>
            }
            else {
                return <><Button variant="secondary" onClick={showReleaseModal}>Release</Button></>;

            }
        }
    }

    render = () => {
        const { 
            closeSlotModal,
            shouldDisplaySlotModal,
            selectedSlot,
        } = this.props;

        

        return (
            <Modal show={shouldDisplaySlotModal} onHide={closeSlotModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-auto">Slot Status - <span className={selectedSlot.occupancyStatus === "AVAILABLE" ? "availableMode" : "occupiedMode"}>
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
                                {selectedSlot.occupancyStatus === 'OCCUPIED' && selectedSlot.occupiedVehicle.images !== undefined ?
                                   <Carousel>
                                   {Array.from(selectedSlot.occupiedVehicle.images).map((image, index) => (
                                       <Carousel.Item>
                                           <img
                                               src={`data:${image.contentType};base64,` + image.base64EncodedBlob}
                                               width="200"
                                               height="200"
                                               />
                                       </Carousel.Item>
                                   ))}
                               </Carousel> :
                                    <></>}
                            </div>
                           
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.shouldShowButton(selectedSlot.occupancyStatus)}
                        
                    </Modal.Footer>
                </Modal>
               
        )
    }
}

export default SingleSlotOverviewModal;