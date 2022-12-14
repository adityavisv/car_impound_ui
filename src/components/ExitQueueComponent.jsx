import React from 'react';
import { Carousel, Modal, Table, Button, Form } from 'react-bootstrap';
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
        return (
            <>
            <Modal show={shouldShowFinalReleaseModal} onHide={this.hideFinalReleaseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title className="ms-auto">Vehicle Release Exit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal_table">
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <td>Case Number</td>
                                    <td>{selectedVehicle.caseNumber !== "" ? selectedVehicle.caseNumber : "--"}</td>
                                </tr>
                                <tr>
                                    <td>Regisered Date/Time</td>
                                    <td>{new Date(selectedVehicle.releaseIdentity.releaseDateTime).toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>Release Identity ID Type</td>
                                    <td>{selectedVehicle.releaseIdentity.idType}</td>
                                </tr>
                                <tr>
                                    <td>Release Identity ID Number</td>
                                    <td>{selectedVehicle.releaseIdentity.idNumber}</td>
                                </tr>
                                <tr>
                                    <td>Release Document</td>
                                    <td><a href="#" onClick={this.downloadReleaseDoc}>Download PDF</a></td>
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
                        : <><h3 className="no_img_text">No images found</h3></>}
                        
                    </div>
                   
                </Modal.Body>
                <Modal.Footer>
                    <div id="button_footer_container">
                                
                        <Button onClick={this.doFinalRelease} variant="secondary">Approve Exit</Button>    
                    </div>
                </Modal.Footer>
            </Modal>
            <div className="upcoming_release_header_text">
                    <Form.Text className="upcoming_release_header_text">Approved For Release</Form.Text>
                </div>
            {

                releaseQueue.length > 0 ?
            <div className="queue_container">
                <Table hover variant="dark">
                    <thead className="table-light">
                        <tr>
                            
                            <th>Emirate</th>
                            <th>Category</th>
                            <th>Code</th>
                            <th>Number Plate</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Colour</th>
                            <th>Type</th>
                            <th>Release Approval Date/Time</th>
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
            </div> : <h3>No vehicles currently in exit queue.</h3>}
            <LoginRedirectModal
                shouldShowRedirectLoginModal={shouldShowRedirectLoginModal}
                hideRedirectLoginModal={this.hideRedirectLoginModal}
            />
            </>
        )
    }
}

export default ExitQueueComponent;