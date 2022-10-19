import React from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import '../styles/gridsvg.css';

class GridSVGB extends React.Component {

    constructor(props) {
        super(props);

        // generate dummy slot data

        this.state = {
            slotsInZone: [
                {
                    slotId: 'B1',
                    status: 'available',
                },
                {
                    slotId: 'B2',
                    status: 'occupied',
                    occupiedCar: {
                        make: 'Toyota',
                        model: 'Corolla',
                        year: '2010',
                        colour: 'Red'
                    }
                }
            ],
            selectedSlot: {},
            shouldDisplaySlotModal: false
        }
    }

    showSlotModal = (event) => {
        const { slotsInZone } = this.state;
        const selectedSlotId = event.currentTarget.id;
        const selectedSlotData = slotsInZone.find(slot => slot.slotId === selectedSlotId);
        this.setState({
            selectedSlot: selectedSlotData,
            shouldDisplaySlotModal: true
        });
    }

    closeSlotModal = () => {
        this.setState({
            shouldDisplaySlotModal: false
        });
    }
    render = () => {
        const { selectedSlot, shouldDisplaySlotModal } = this.state;
        return (
            <div>
                <Modal show={shouldDisplaySlotModal} onHide={this.closeSlotModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Slot Status</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Container>
                            <Row>
                                Slot Number : {selectedSlot.slotId}
                            </Row>
                            <Row>
                                Occupation Status: {selectedSlot.status}
                            </Row>
                            {selectedSlot.status === 'occupied' ?
                                <>
                                    <Row>
                                        Make: {selectedSlot.occupiedCar.make}
                                    </Row>
                                    <Row>
                                        Model: {selectedSlot.occupiedCar.model}
                                    </Row>
                                </> : <></>
                            }
                        </Container>
                    </Modal.Body>
                </Modal>
                <svg viewBox="0 0 1000 1000" className="zoneSvg">
                    <rect id="B1" x="0" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B2" x="27" y="0" width="27" height="27" stroke="black" fill="red" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B3" x="54" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B4" x="81" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B5" x="108" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B6" x="135" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B7" x="162" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B8" x="189" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B9" x="216" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B10" x="243" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B11" x="270" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B12" x="297" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B13" x="324" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B14" x="351" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B15" x="378" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B16" x="405" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B17" x="432" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B18" x="459" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B19" x="486" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B20" x="513" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B21" x="540" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B22" x="567" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B23" x="594" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B24" x="621" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B25" x="648" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B26" x="675" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B27" x="702" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B28" x="729" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B29" x="756" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B30" x="783" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B31" x="810" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B32" x="837" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B33" x="864" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B34" x="891" y="0" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B35" x="0" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B36" x="27" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B37" x="54" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B38" x="81" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B39" x="108" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B40" x="135" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B41" x="162" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B42" x="189" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B43" x="216" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B44" x="243" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B45" x="270" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B46" x="297" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B47" x="324" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B48" x="351" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B49" x="378" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B50" x="405" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B51" x="432" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B52" x="459" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B53" x="486" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B54" x="513" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B55" x="540" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B56" x="567" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B57" x="594" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B58" x="621" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B59" x="648" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B60" x="675" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B61" x="702" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B62" x="729" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B63" x="756" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B64" x="783" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B65" x="810" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B66" x="837" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B67" x="864" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B68" x="891" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B69" x="918" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B70" x="945" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="B71" x="972" y="81" width="27" height="27" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <text x="480" y="65" className="heavy" fontSize="2em">ZONE B</text>
                </svg>
            </div>
        )
    }
}

export default GridSVGB;