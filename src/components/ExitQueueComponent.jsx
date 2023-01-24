import React from 'react';
import { Carousel, Modal, Table, Button, Form } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import LoginRedirectModal from './LoginRedirectModal';
import UserService from '../services/user.service';
import { getEmirateDisplay, b64ToBlob } from '../helpers/generalhelpers';
import '../styles/releasequeue.css';

class ExitQueueComponent extends React.Component {
    constructor(props) {
        super(props);
        const { releaseQueue = [], releaseQueueReqInit, releaseQueueReqFail } = this.props;
        this.state = {
            releaseQueue,
            releaseQueueReqInit,
            releaseQueueReqFail,
            selectedVehicle: {releaseIdentity: {}, owner: {}},
            shouldShowFinalReleaseModal: false,
            shouldShowRedirectLoginModal: false
        };
    }

    

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.releaseQueue !== this.props.releaseQueue) {
            this.setState({
                releaseQueue: this.props.releaseQueue
            });
        }
        if (prevProps.releaseQueueReqFail !== this.props.releaseQueueReqFail) {
            this.setState({
                releaseQueueReqFail: this.props.releaseQueueReqFail
            });
        }
        if (prevProps.releaseQueueReqInit !== this.props.releaseQueueReqInit) {
            this.setState({
                releaseQueueReqInit: this.props.releaseQueueReqInit
            })
        }
    }

    handleRowClick = (event) => {
        const clickedVehicleId = event.currentTarget.id;
        const { releaseQueue } = this.state;
        const selectedVehicle = releaseQueue.filter((element) => element.id === parseInt(clickedVehicleId))[0];
        this.setState({
            selectedVehicle,
            shouldShowFinalReleaseModal: true
        });
    }

    hideFinalReleaseModal = () => {
        this.setState({
            selectedVehicle: {owner: {}, releaseIdentity: {}},
            shouldShowFinalReleaseModal: false
        });
    }

    downloadReleaseDoc = () => {
        const { selectedVehicle: {releaseDocument: { base64EncodedBlob, contentType}} } = this.state;
        const bytes = this.b64toBlob(base64EncodedBlob, contentType);
        let url = window.URL.createObjectURL(bytes);
        let a = document.createElement('a');
        a.href = url;
        a.download = `RELEASEDOCUMENT.${contentType.split('/')[1]}`;
        a.click();
    }

    doFinalRelease = () => {
        const { selectedVehicle: {id}} = this.state;
        UserService.finalRelease(id)
            .then((response) => {
                this.hideFinalReleaseModal();
                this.props.callReleaseQueueService();
            })
            .catch((error) => {
                if (error.response !== undefined && error.response.status !== undefined) {
                    if (error.response.status === 401)
                        // call logout and exit
                        this.setState({
                            shouldShowRedirectLoginModal: true,
                        })
                }
            })
    }

    hideRedirectLoginModal = () => {
        this.setState({
            shouldShowRedirectLoginModal: false,
        });
        this.hideFinalReleaseModal();
        this.props.callLogout();
    }


    render = () => {
        const { releaseQueue, shouldShowFinalReleaseModal,  selectedVehicle, shouldShowRedirectLoginModal } = this.state;
        const { t } = this.props;
        return (
            <>
            <Modal show={shouldShowFinalReleaseModal} onHide={this.hideFinalReleaseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto">{t("exit_queue_page_modal_header_vehicle_release_exit")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal_table">
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <td>{t("exit_queue_page_modal_table_header_case_number")}</td>
                                    <td>{selectedVehicle.caseNumber !== "" ? selectedVehicle.caseNumber : "--"}</td>
                                </tr>
                                <tr>
                                    <td>{t("exit_queue_page_modal_table_header_registration_datetime")}</td>
                                    <td>{new Date(selectedVehicle.releaseIdentity.releaseDateTime).toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>{t("exit_queue_page_modal_table_header_release_identity_id_type")}</td>
                                    <td>{selectedVehicle.releaseIdentity.idType}</td>
                                </tr>
                                <tr>
                                    <td>{t("exit_queue_page_modal_table_header_release_identity_id_number")}</td>
                                    <td>{selectedVehicle.releaseIdentity.idNumber}</td>
                                </tr>
                                <tr>
                                    <td>{t("exit_queue_page_modal_table_header_release_document")}</td>
                                    <td><a href="#" onClick={this.downloadReleaseDoc}>{t( "exit_queue_page_modal_link_download_pdf")}</a></td>
                                </tr>
                            </tbody>
                            
                        </Table>
                    </div>
                    <div className="modal_images">
                        {selectedVehicle.images !== null && selectedVehicle.images !== undefined && selectedVehicle.images.length > 0 ?
                        <Carousel variant="dark">
                        {Array.from(selectedVehicle.images).map((image) => (
                            <Carousel.Item>
                                <img
                                    src={`data:${image.contentType};;base64,` + image.base64EncodedBlob}
                                    width="300"
                                    height="300"
                                />
                            </Carousel.Item>
                        ))}
                        </Carousel>
                        : <><h3 className="no_img_text">{t("exit_queue_page_modal_text_no_images_found")}</h3></>}
                        
                    </div>
                   
                </Modal.Body>
                <Modal.Footer>
                    <div id="button_footer_container">
                                
                        <Button onClick={this.doFinalRelease} variant="secondary">{t("exit_queue_page_modal_footer_btn_approve_exit")}</Button>    
                    </div>
                </Modal.Footer>
            </Modal>
            <div className="upcoming_release_header_text">
                    <Form.Text className="upcoming_release_header_text">{t("exit_queue_page_header_approved_for_release")}</Form.Text>
                </div>
            {

                releaseQueue.length > 0 ?
            <div className="queue_container">
                <Table hover variant="dark">
                    <thead className="table-light">
                        <tr>
                            
                            <th>{t("exit_queue_page_table_header_emirate")}</th>
                            <th>{t("exit_queue_page_table_header_category")}</th>
                            <th>{t("exit_queue_page_table_header_code")}</th>
                            <th>{t( "exit_queue_page_table_header_number_plate")}</th>
                            <th>{t("exit_queue_page_table_header_make")}</th>
                            <th>{t("exit_queue_page_table_header_model")}</th>
                            <th>{t("exit_queue_page_table_header_color")}</th>
                            <th>{t("exit_queue_page_table_header_type")}</th>
                            <th>{t("exit_queue_page_table_header_release_approval_datetime")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from(releaseQueue).map((item) =>(
                              <tr id={item.id} onClick={this.handleRowClick} key={item.id}>
                                 
                                  <td>{getEmirateDisplay(item.emirate)}</td>
                                  <td>{item.category}</td>
                                  <td>{item.code}</td>
                                  <td>{item.numberPlate}</td>
                                  <td>{item.make}</td>
                                  <td>{item.model}</td>
                                  <td>{item.color}</td>
                                  <td>{item.type}</td>
                                  <td>{(new Date(item.releaseIdentity.releaseDateTime)).toLocaleString('en-IN')}</td>
                                 
                                </tr>  
                            ))
                        }
                    </tbody>
                </Table>
            </div> : <h3>{t("exit_queue_page_text_no_vehicles_in_queue")}</h3>}
            <LoginRedirectModal
                shouldShowRedirectLoginModal={shouldShowRedirectLoginModal}
                hideRedirectLoginModal={this.hideRedirectLoginModal}
            />
            </>
        )
    }
}

export default withTranslation()(ExitQueueComponent);