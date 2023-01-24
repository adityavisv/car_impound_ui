import React from 'react';
import { Modal, Table, Button, Carousel } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import '../styles/singleslotoverview.css';

class SingleSlotOverviewModal extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldShowButton = (ocStatus) => {
        const { t } = this.props;
        const { currentUser,
            showRegisterModal,
            showReleaseModal,
            showUpdateModal,
            showReassignModal,
            setFirstSelectedSlot,
            selectedSlot: {zoneLabel}
        } = this.props;
        if (currentUser.roles.includes("ROLE_EXIT_OPERATOR"))
            return <></>
        else {
            if (ocStatus === "AVAILABLE") {
                return  <>
                    <Button variant="secondary" onClick={showRegisterModal}>{t("single_slot_overview_modal_assign_btn_body")}</Button>
                    {zoneLabel !== 'T' ? <Button variant="secondary" onClick={setFirstSelectedSlot}>{t("single_slot_overview_modal_assign_multiple_btn_body")}</Button> : <></>}
                </>
            }
            else {
                return <>
                <Button variant="secondary" onClick={showReleaseModal}>{t("single_slot_overview_modal_release_btn_body")}</Button>
                <Button variant="secondary" onClick={showUpdateModal}>{t("single_slot_overview_modal_modify_btn_body")}</Button>
                <Button variant="secondary" onClick={showReassignModal}>{t("single_slot_overview_modal_reassign_btn_body")}</Button>
                </>;

            }
        }
    }

    render = () => {
        const { 
            closeSlotModal,
            shouldDisplaySlotModal,
            selectedSlot,
            t
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
                        <Modal.Title className="ms-auto">{t("single_slot_overview_modal_slot_status_title")} <span className={occupancyStatus === "AVAILABLE" ? "availableMode" : "occupiedMode"}>
                                    {occupancyStatus}</span> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <div className="modal_table">
                        <Table  variant="dark">
                            <tbody>
                                <tr>
                                    <td>{t("single_slot_overview_modal_zone_label_body")}</td>
                                    <td>{zoneLabel}</td>
                                </tr>
                                <tr>
                                    <td>{t("single_slot_overview_modal_slot_number_body")}</td>
                                    <td>{slotNumber}</td>
                                </tr>
                                { occupancyStatus === 'OCCUPIED' ? 
                                <>
                                    <tr>
                                        <td>{t("single_slot_overview_modal_make_body")}</td>
                                        <td>{make}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("single_slot_overview_modal_model_body")}</td>
                                        <td>{model}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("single_slot_overview_modal_number_plate_body")}</td>
                                        <td>{numberPlate}</td>
                                    </tr>
                                    <tr>
                                        <td>{t("single_slot_overview_modal_vehicle_type_body")}</td>
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
                        : <><h3 className="no_img_text">{t("single_slot_overview_modal_no_images_found_body")}</h3></>}
                        
                    </div> : <></>}
                    </Modal.Body>
                    <Modal.Footer>
                        {this.shouldShowButton(occupancyStatus)}
                        
                    </Modal.Footer>
                </Modal>
               
        )
    }
}

export default withTranslation()(SingleSlotOverviewModal);