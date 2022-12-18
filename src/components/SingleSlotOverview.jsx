import React from 'react';
import { Modal, Table, Button, Carousel } from 'react-bootstrap';
import '../styles/singleslotoverview.css';

class SingleSlotOverviewModal extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldShowButton = (ocStatus) => {
        const { currentUser,
            showRegisterModal,
            showReleaseModal,
            showUpdateModal,
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
                return <>
                <Button variant="secondary" onClick={showReleaseModal}>Release</Button>
                <Button variant="secondary" onClick={showUpdateModal}>Modify</Button>
                </>;

            }
        }
    }

    render = () => {
        const { 
            closeSlotModal,
            shouldDisplaySlotModal,
            selectedSlot,
        } = this.props;

        var selectedSlotVar = {
            ...selectedSlot
        }
        if (selectedSlot.occupiedVehicle === null)
            selectedSlotVar.occupiedVehicle = {};
        const { 
            zoneLabel,
            slotNumber,
            occupancyStatus,
            occupiedVehicle: {
                make = '',
                model = '',
                type = '',
                numberPlate = '',
                images = ''
            } = {}

        } = selectedSlotVar;
        

        return (
            <Modal show={shouldDisplaySlotModal} onHide={closeSlotModal} centered size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-auto">Slot Status - <span className={occupancyStatus === "AVAILABLE" ? "availableMode" : "occupiedMode"}>
                                    {occupancyStatus}</span> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <div className="modal_table">
                        <Table  variant="dark">
                            <tbody>
                                <tr>
                                    <td>Zone Label</td>
                                    <td>{zoneLabel}</td>
                                </tr>
                                <tr>
                                    <td>Slot Number</td>
                                    <td>{slotNumber}</td>
                                </tr>
                                { occupancyStatus === 'OCCUPIED' ? 
                                <>
                                    <tr>
                                        <td>Make</td>
                                        <td>{make}</td>
                                    </tr>
                                    <tr>
                                        <td>Model</td>
                                        <td>{model}</td>
                                    </tr>
                                    <tr>
                                        <td>Number Plate</td>
                                        <td>{numberPlate}</td>
                                    </tr>
                                    <tr>
                                        <td>Vehicle Type</td>
                                        <td>{type}</td>
                                    </tr>
                                </> : null}
                            </tbody>
                            
                        </Table>
                    </div>
                    {occupancyStatus === 'OCCUPIED' ?
                    <div className="modal_images">
                        {images !== null && images !== undefined && images.length > 0 ?
                        <Carousel variant="dark">
                        {Array.from(images).map((image) => (
                            <Carousel.Item>
                                <img
                                    src={`data:${image.contentType};;base64,` + image.base64EncodedBlob}
                                    width="300"
                                    height="300"
                                />
                            </Carousel.Item>
                        ))}
                        </Carousel>
                        : <><h3 className="no_img_text">No images found</h3></>}
                        
                    </div> : <></>}
                    </Modal.Body>
                    <Modal.Footer>
                        {this.shouldShowButton(occupancyStatus)}
                        
                    </Modal.Footer>
                </Modal>
               
        )
    }
}

export default SingleSlotOverviewModal;