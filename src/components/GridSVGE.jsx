import React from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import '../styles/gridsvg.css';

class GridSVGE extends React.Component {

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
                <svg viewBox="0 0 1200 1000" className="zoneSvg">
                    <rect id="E1" x="0" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E2" x="25" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E3" x="50" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E4" x="75" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E5" x="100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E6" x="125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E7" x="150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E8" x="175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E9" x="200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E10" x="225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E11" x="250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E12" x="275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E13" x="300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E14" x="325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E15" x="350" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E16" x="375" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E17" x="400" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E18" x="425" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E19" x="450" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E20" x="475" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E21" x="500" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E22" x="525" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E23" x="550" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E24" x="575" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E25" x="600" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E26" x="625" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E27" x="650" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E28" x="675" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E29" x="700" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E30" x="725" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E31" x="750" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E32" x="775" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E33" x="800" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E34" x="825" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E35" x="850" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E36" x="875" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E37" x="900" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E38" x="925" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E39" x="950" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E40" x="975" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E41" x="1000" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E42" x="1025" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E43" x="1050" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E44" x="1075" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E45" x="1100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E46" x="1125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E47" x="0" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E48" x="25" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E49" x="50" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E50" x="75" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E51" x="100" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E52" x="125" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E53" x="150" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E54" x="175" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E55" x="200" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E56" x="225" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E57" x="250" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E58" x="275" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E59" x="300" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E60" x="325" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E61" x="350" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E62" x="375" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E63" x="400" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E64" x="425" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E65" x="450" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E66" x="475" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E67" x="500" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E68" x="525" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E69" x="550" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E70" x="575" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E71" x="600" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E72" x="625" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E73" x="650" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E74" x="675" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E75" x="700" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E76" x="725" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E77" x="750" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E78" x="775" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E79" x="800" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E80" x="825" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E81" x="850" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E82" x="875" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E83" x="900" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E84" x="925" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E85" x="950" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E86" x="975" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E87" x="1000" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E88" x="1025" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E89" x="1050" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E90" x="1075" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E91" x="1100" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E92" x="1125" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E93" x="1150" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E94" x="1175" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="E95" x="1200" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                </svg>
            </div>
        )
    }
}

export default GridSVGE;