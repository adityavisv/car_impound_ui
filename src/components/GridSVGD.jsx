import React from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import '../styles/gridsvg.css';

class GridSVGD extends React.Component {

    constructor(props) {
        super(props);

        // generate dummy slot data

        this.state = {
            slotsInZone: [
                {
                    slotId: 'D1',
                    status: 'available',
                },
                {
                    slotId: 'D2',
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
                <svg viewBox="0 0 1100 1000" className="zoneSvg">
                    <rect id="D1" x="0" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D2" x="25" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D3" x="50" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D4" x="75" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D5" x="100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D6" x="125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D7" x="150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D8" x="175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D9" x="200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D10" x="225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D11" x="250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D12" x="275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D13" x="300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D14" x="325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D15" x="350" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D16" x="375" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D17" x="400" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D18" x="425" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D19" x="450" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D20" x="475" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D21" x="500" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D22" x="525" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D23" x="550" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D24" x="575" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D25" x="600" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D26" x="625" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D27" x="650" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D28" x="675" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D29" x="700" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D30" x="725" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D31" x="750" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D32" x="775" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D33" x="800" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D34" x="825" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D35" x="850" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D36" x="875" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D37" x="900" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D38" x="925" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D39" x="950" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D40" x="975" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D41" x="0" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D42" x="25" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D43" x="50" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D44" x="75" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D45" x="100" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D46" x="125" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D47" x="150" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D48" x="175" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D49" x="200" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D50" x="225" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D51" x="250" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D52" x="275" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D53" x="300" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D54" x="325" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D55" x="350" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D56" x="375" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D57" x="400" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D58" x="425" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D59" x="450" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D60" x="475" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D61" x="500" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D62" x="525" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D63" x="550" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D64" x="575" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D65" x="600" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D66" x="625" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D67" x="650" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D68" x="675" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D69" x="700" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D70" x="725" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D71" x="750" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D72" x="775" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D73" x="800" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D74" x="825" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D75" x="850" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D76" x="875" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D77" x="900" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D78" x="925" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D79" x="950" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D80" x="975" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D81" x="1000" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D82" x="1025" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D83" x="1050" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D84" x="1075" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D85" x="1100" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="D86" x="1125" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <text x="480" y="65" className="heavy" fontSize="2em">ZONE D</text>
                </svg>
            </div>
        )
    }
}

export default GridSVGD;