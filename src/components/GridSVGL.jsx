import React from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import '../styles/gridsvg.css';

class GridSVGL extends React.Component {

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
                    <rect id="L1" x="0" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L2" x="25" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L3" x="50" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L4" x="75" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L5" x="100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L6" x="125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L7" x="150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L8" x="175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L9" x="200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L10" x="225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L11" x="250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L12" x="275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L13" x="300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L14" x="325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L15" x="350" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L16" x="375" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L17" x="400" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L18" x="425" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L19" x="450" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L20" x="475" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L21" x="500" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L22" x="525" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L23" x="550" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L24" x="575" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L25" x="600" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L26" x="625" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L27" x="650" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L28" x="675" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L29" x="700" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L30" x="725" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L31" x="750" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L32" x="775" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L33" x="800" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L34" x="825" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L35" x="850" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L36" x="875" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L37" x="900" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L38" x="925" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L39" x="950" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L40" x="975" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L41" x="1000" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L42" x="1025" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L43" x="1050" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L44" x="1075" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L45" x="1100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L46" x="1125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L47" x="1150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L48" x="1175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L49" x="1200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L50" x="1225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L51" x="1250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L52" x="1275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L53" x="1300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L54" x="1325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L55" x="1350" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L56" x="1375" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L57" x="1400" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L58" x="1425" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L59" x="1450" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L60" x="1475" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L61" x="1500" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L62" x="1525" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L63" x="1550" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L64" x="1575" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L65" x="1600" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L66" x="1625" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L67" x="1650" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L68" x="1675" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L69" x="1700" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L70" x="1725" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L71" x="1750" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L72" x="1775" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L73" x="1800" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L74" x="1825" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L75" x="1850" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L76" x="1875" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L77" x="1900" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L78" x="1925" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L79" x="1950" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L80" x="1975" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L81" x="2000" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L82" x="2025" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L83" x="2050" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L84" x="2075" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L85" x="2100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L86" x="2125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L87" x="2150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L88" x="2175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L89" x="2200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L90" x="2225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L91" x="2250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L92" x="2275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L93" x="0" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L94" x="25" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L95" x="50" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L96" x="75" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L97" x="100" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L98" x="125" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L99" x="150" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L100" x="175" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L101" x="200" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L102" x="225" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L103" x="250" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L104" x="275" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L105" x="300" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L106" x="325" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L107" x="350" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L108" x="375" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L109" x="400" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L110" x="425" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L111" x="450" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L112" x="475" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L113" x="500" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L114" x="525" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L115" x="550" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L116" x="575" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L117" x="600" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L118" x="625" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L119" x="650" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L120" x="675" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L121" x="700" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L122" x="725" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L123" x="750" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L124" x="775" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L125" x="800" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L126" x="825" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L127" x="850" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L128" x="875" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L129" x="900" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L130" x="925" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L131" x="950" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L132" x="975" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L133" x="1000" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L134" x="1025" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L135" x="1050" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L136" x="1075" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L137" x="1100" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L138" x="1125" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L139" x="1150" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L140" x="1175" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L141" x="1200" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L142" x="1225" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L143" x="1250" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L144" x="1275" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L145" x="1300" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L146" x="1325" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L147" x="1350" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L148" x="1375" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L149" x="1400" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L150" x="1425" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L151" x="1450" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L152" x="1475" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L153" x="1500" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L154" x="1525" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L155" x="1550" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L156" x="1575" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L157" x="1600" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L158" x="1625" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L159" x="1650" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L160" x="1675" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L161" x="1700" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L162" x="1725" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L163" x="1750" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L164" x="1775" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L165" x="1800" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L166" x="1825" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L167" x="1850" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L168" x="1875" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L169" x="1900" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L170" x="1925" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L171" x="1950" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L172" x="1975" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L173" x="2000" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L174" x="2025" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L175" x="2050" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L176" x="2075" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L177" x="2100" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L178" x="2125" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L179" x="2150" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L180" x="2175" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L181" x="2200" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L182" x="2225" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L183" x="2250" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L184" x="2275" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L185" x="2300" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L186" x="2325" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L187" x="2350" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L188" x="2375" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L189" x="2400" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L190" x="2425" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L191" x="2450" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L192" x="2475" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="L193" x="2500" y="75" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                </svg>
            </div>
        )
    }
}

export default GridSVGL;