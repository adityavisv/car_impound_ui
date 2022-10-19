import React from 'react';
import { Modal, Container, Row } from 'react-bootstrap';
import '../styles/gridsvg.css';

class GridSVGT extends React.Component {

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
                    <rect id="O1" x="0" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O2" x="25" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O3" x="50" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O4" x="75" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O5" x="100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O6" x="125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O7" x="150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O8" x="175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O9" x="200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O10" x="225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O11" x="250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O12" x="275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O13" x="300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O14" x="325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O15" x="350" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O16" x="375" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O17" x="400" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O18" x="425" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O19" x="450" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O20" x="475" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O21" x="500" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O22" x="525" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O23" x="550" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O24" x="575" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O25" x="600" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O26" x="625" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O27" x="650" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O28" x="675" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O29" x="700" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O30" x="725" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O31" x="750" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O32" x="775" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O33" x="800" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O34" x="825" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O35" x="850" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O36" x="875" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O37" x="900" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O38" x="925" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O39" x="950" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O40" x="975" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O41" x="1000" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O42" x="1025" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O43" x="1050" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O44" x="1075" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O45" x="1100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O46" x="1125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O47" x="1150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O48" x="1175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O49" x="1200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O50" x="1225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O51" x="1250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O52" x="1275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O53" x="1300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O54" x="1325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O55" x="1350" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O56" x="1375" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O57" x="1400" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O58" x="1425" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O59" x="1450" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O60" x="1475" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O61" x="1500" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O62" x="1525" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O63" x="1550" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O64" x="1575" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O65" x="1600" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O66" x="1625" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O67" x="1650" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O68" x="1675" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O69" x="1700" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O70" x="1725" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O71" x="1750" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O72" x="1775" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O73" x="1800" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O74" x="1825" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O75" x="1850" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O76" x="1875" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O77" x="1900" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O78" x="1925" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O79" x="1950" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O80" x="1975" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O81" x="2000" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O82" x="2025" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O83" x="2050" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O84" x="2075" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O85" x="2100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O86" x="2125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O87" x="2150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O88" x="2175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O89" x="2200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O90" x="2225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O91" x="2250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O92" x="2275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O93" x="2300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O94" x="2325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O95" x="2350" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O96" x="2375" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O97" x="2400" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O98" x="2425" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O99" x="2450" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O100" x="2475" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O101" x="2500" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O102" x="2525" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O103" x="2550" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O104" x="2575" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O105" x="2600" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O106" x="2625" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O107" x="2650" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O108" x="2675" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O109" x="2700" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O110" x="2725" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O111" x="2750" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O112" x="2775" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O113" x="2800" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O114" x="2825" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O115" x="2850" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O116" x="2875" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O117" x="2900" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O118" x="2925" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O119" x="2950" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O120" x="2975" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O121" x="3000" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O122" x="3025" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O123" x="3050" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O124" x="3075" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O125" x="3100" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O126" x="3125" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O127" x="3150" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O128" x="3175" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O129" x="3200" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O130" x="3225" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O131" x="3250" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O132" x="3275" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O133" x="3300" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                    <rect id="O134" x="3325" y="0" width="25" height="25" stroke="black" fill="green" strokeWidth="2" onClick={this.showSlotModal} />
                </svg>
            </div>
        )
    }
}

export default GridSVGT;