import React from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import '../styles/gridsvg.css';

class GridSVGF extends React.Component {

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
                <svg viewBox="0 0 1300 1000" className="zoneSvg">
                    <rect id="F1" x="0px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F2" x="25px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F3" x="50px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F4" x="75px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F5" x="100px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F6" x="125px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F7" x="150px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F8" x="175px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F9" x="200px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F10" x="225px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F11" x="250px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F12" x="275px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F13" x="300px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F14" x="325px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F15" x="350px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F16" x="375px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F17" x="400px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F18" x="425px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F19" x="450px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F20" x="475px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F21" x="500px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F22" x="525px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F23" x="550px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F24" x="575px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F25" x="600px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F26" x="625px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F27" x="650px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F28" x="675px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F29" x="700px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F30" x="725px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F31" x="750px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F32" x="775px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F33" x="800px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F34" x="825px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F35" x="850px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F36" x="875px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F37" x="900px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F38" x="925px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F39" x="950px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F40" x="975px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F41" x="1000px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F42" x="1025px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F43" x="1050px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F44" x="1075px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F45" x="1100px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F46" x="1125px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F47" x="1150px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F48" x="1175px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F49" x="1200px" y="0px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F50" x="0px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F51" x="25px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F52" x="50px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F53" x="75px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F54" x="100px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F55" x="125px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F56" x="150px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F57" x="175px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F58" x="200px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F59" x="225px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F60" x="250px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F61" x="275px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F62" x="300px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F63" x="325px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F64" x="350px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F65" x="375px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F66" x="400px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F67" x="425px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F68" x="450px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F69" x="475px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F70" x="500px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F71" x="525px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F72" x="550px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F73" x="575px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F74" x="600px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F75" x="625px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F76" x="650px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F77" x="675px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F78" x="700px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F79" x="725px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F80" x="750px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F81" x="775px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F82" x="800px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F83" x="825px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F84" x="850px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F85" x="875px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F86" x="900px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F87" x="925px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F88" x="950px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F89" x="975px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F90" x="1000px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F91" x="1025px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F92" x="1050px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F93" x="1075px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F94" x="1100px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F95" x="1125px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F96" x="1150px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F97" x="1175px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F98" x="1200px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F99" x="1225px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F100" x="1250px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="F101" x="1275px" y="75px" width="25px" height="25px" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                </svg>
            </div>
        )
    }
}

export default GridSVGF;