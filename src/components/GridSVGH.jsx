import React from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import '../styles/gridsvg.css';

class GridSVGH extends React.Component {

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
                <svg viewBox="0 0 1500 1000" className="zoneSvg">
                    <rect id="H1" x="0" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H2" x="25" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H3" x="50" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H4" x="75" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H5" x="100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H6" x="125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H7" x="150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H8" x="175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H9" x="200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H10" x="225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H11" x="250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H12" x="275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H13" x="300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H14" x="325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H15" x="350" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H16" x="375" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H17" x="400" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H18" x="425" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H19" x="450" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H20" x="475" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H21" x="500" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H22" x="525" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H23" x="550" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H24" x="575" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H25" x="600" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H26" x="625" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H27" x="650" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H28" x="675" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H29" x="700" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H30" x="725" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H31" x="750" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H32" x="775" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H33" x="800" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H34" x="825" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H35" x="850" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H36" x="875" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H37" x="900" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H38" x="925" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H39" x="950" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H40" x="975" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H41" x="1000" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H42" x="1025" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H43" x="1050" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H44" x="1075" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H45" x="1100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H46" x="1125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H47" x="1150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H48" x="1175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H49" x="1200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H50" x="1225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H51" x="1250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H52" x="1275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H53" x="1300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H54" x="1325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H55" x="1350" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H56" x="1375" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H57" x="1400" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H58" x="0" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H59" x="25" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H60" x="50" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H61" x="75" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H62" x="100" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H63" x="125" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H64" x="150" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H65" x="175" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H66" x="200" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H67" x="225" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H68" x="250" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H69" x="275" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H70" x="300" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H71" x="325" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H72" x="350" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H73" x="375" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H74" x="400" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H75" x="425" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H76" x="450" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H77" x="475" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H78" x="500" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H79" x="525" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H80" x="550" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H81" x="575" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H82" x="600" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H83" x="625" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H84" x="650" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H85" x="675" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H86" x="700" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H87" x="725" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H88" x="750" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H89" x="775" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H90" x="800" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H91" x="825" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H92" x="850" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H93" x="875" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H94" x="900" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H95" x="925" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H96" x="950" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H97" x="975" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H98" x="1000" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H99" x="1025" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H100" x="1050" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H101" x="1075" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H102" x="1100" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H103" x="1125" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H104" x="1150" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H105" x="1175" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H106" x="1200" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H107" x="1225" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H108" x="1250" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H109" x="1275" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H110" x="1300" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H111" x="1325" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H112" x="1350" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H113" x="1375" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H114" x="1400" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H115" x="1425" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H116" x="1450" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H117" x="1475" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="H118" x="1500" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                </svg>
            </div>
        )
    }
}

export default GridSVGH;