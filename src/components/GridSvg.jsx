import React from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import '../styles/gridsvg.css';

class GridSvg extends React.Component {
    constructor(props) {
        super(props);

        // generate dummy slot data
        
        this.state = {
            slotsInZone: [
                {
                    slotId: 'A1',
                    status: 'available',
                },
                {
                    slotId: 'A2',
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
        const {slotsInZone} = this.state;
        const selectedSlotId = event.currentTarget.id;
        const selectedSlotData = slotsInZone.find(slot => slot.slotId === selectedSlotId);
        this.setState ({
            selectedSlot: selectedSlotData,
            shouldDisplaySlotModal: true
        });
    }

    closeSlotModal = () => {
        this.setState ({
            shouldDisplaySlotModal: false
        });
    }

    render = () => {
        const {selectedSlot, shouldDisplaySlotModal} = this.state;
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
                    <rect id="A1" x="0" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A2" x="30" y="0" width="30" height="30" stroke="black" fill="red" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A3" x="60" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A4" x="90" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A5" x="120" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A6" x="150" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A7" x="180" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A8" x="210" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A9" x="240" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A10" x="270" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A11" x="300" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A12" x="330" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A13" x="360" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A14" x="390" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A15" x="420" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A16" x="450" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A17" x="480" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A18" x="510" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A19" x="540" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A20" x="570" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A21" x="600" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A22" x="630" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A23" x="660" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A24" x="690" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A25" x="720" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A26" x="750" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A27" x="780" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A28" x="810" y="0" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A29" x="0" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A30" x="30" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A31" x="60" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A32" x="90" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A33" x="120" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A34" x="150" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A35" x="180" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A36" x="210" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A37" x="240" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A38" x="270" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A39" x="300" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A40" x="330" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A41" x="360" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A42" x="390" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A43" x="420" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A44" x="450" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A45" x="480" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A46" x="510" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A47" x="540" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A48" x="570" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A49" x="600" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A50" x="630" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A51" x="660" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A52" x="690" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A53" x="720" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A54" x="750" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A55" x="780" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A56" x="810" y="30" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A57" x="0" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A58" x="30" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A59" x="60" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A60" x="90" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A61" x="120" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A62" x="150" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A63" x="180" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A64" x="210" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A65" x="240" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A66" x="270" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A67" x="300" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A68" x="330" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A69" x="360" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A70" x="390" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A71" x="420" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A72" x="450" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A73" x="480" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A74" x="510" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A75" x="540" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A76" x="570" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A77" x="600" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A78" x="630" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A79" x="660" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A80" x="690" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A81" x="720" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A82" x="750" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A83" x="780" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A84" x="810" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A85" x="840" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A86" x="870" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A87" x="900" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A88" x="930" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="A89" x="960" y="120" width="30" height="30" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <text x="480" y="100" className="heavy" fontSize="2em">ZONE A</text>
                </svg>
            </div>
        )
    }
}

export default GridSvg;