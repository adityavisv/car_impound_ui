import React from 'react';
import { Modal, Container, Row, Button, Col } from 'react-bootstrap';
import '../styles/gridsvg.css';
import CarRegistrationForm from './CarRegistrationForm';
import ReleaseCarForm from './ReleaseCarForm';

class GridSvg extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clickedZoneData: this.props.clickedZoneData,
            selectedSlot: {},
            shouldDisplaySlotModal: false,
            shouldShowRegisterModal: false,
            showShowReleaseModal: false,
        }
    }

    showSlotModal = (selectedZoneLabel, selectedSlotNumber) => {
        const { clickedZoneData } = this.state;
        const selectedSlotData = clickedZoneData.find(slot => (slot.zoneLabel === selectedZoneLabel && slot.slotNumber === selectedSlotNumber));
        this.setState({
            selectedSlot: selectedSlotData,
            shouldDisplaySlotModal: true
        });
    }

    showRegisterModal = () => {
        this.setState({
            shouldShowRegisterModal: true,
            shouldDisplaySlotModal: false
        });
    }

    showReleaseForm = () => {
        this.setState({
            shouldShowRegisterModal: false,
            shouldDisplaySlotModal: false,
            shouldShowReleaseModal: true
        });
    }

    closeSlotModal = () => {
        this.setState({
            shouldDisplaySlotModal: false,
            selectedSlot: {}
        });
    }

    closeRegisterModal = () => {
        this.setState({
            shouldShowRegisterModal: false
        });
    }

    closeReleaseModal = () => {
        this.setState({
            shouldShowReleaseModal: false
        });
    }

    renderNumberSvg = () => {
        const { clickedZoneData } = this.state;
        const rowOneSlice = clickedZoneData.slice(0, 28);
        const rowOneNumbers = rowOneSlice.map((item, index) => (
            <text
                x={`${(index * 30) + 7.5}`}
                y="15" fontSize="15" className="box_text">
                    {item.slotNumber}
            </text>
                
        ));
        

        const rowTwoSlice = clickedZoneData.slice(28,56);
        const rowTwoNumbers = rowTwoSlice.map((item, index) => (
            <text
                x={`${(index * 30) + 6.5}`}
                y="45"
                fontSize="15" className="box_text">
                    {item.slotNumber}
                </text>
        ));

        const rowThreeSlice = clickedZoneData.slice(56, 88);
        const rowThreeNumbers = rowThreeSlice.map((item, index) => (
            <text
                x={`${(index * 30) + 6.5}`}
                y="170"
                fontSize="15" className="box_text">
                    {item.slotNumber}
                </text>
        ));

        return (
            <>
                {rowOneNumbers}
                {rowTwoNumbers}
                {rowThreeNumbers}
            </>
        );
    }

    renderGridSvg = () => {
        const { clickedZoneData } = this.state;
        const rowOneSlice = clickedZoneData.slice(0, 28);
        const rowOneElements = rowOneSlice.map((item, index) => (
            <rect id={item.zoneLabel + item.slotNumber}
                x={`${index * 30}`} 
                y="0" 
                stroke="black"
                width="30"
                height="30"
                fill={item.occupancyStatus === 'AVAILABLE' ? 'green' : 'red'}
                strokeWidth="2"
                onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber)}
            />
        ));

        const rowTwoSlice = clickedZoneData.slice(28, 56);
        const rowTwoElements = rowTwoSlice.map((item, index) => (
            <rect id={item.zoneLabel + item.slotNumber}
                x={index * 30}
                y="30"
                stroke="black"
                width="30"
                height="30"
                fill={item.occupancyStatus === 'AVAILABLE' ? 'green' : 'red'}
                strokeWidth="2"
                onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber)}
            />
        ));

        const rowThreeSlice = clickedZoneData.slice(56, 89);
        const rowThreeElements = rowThreeSlice.map((item, index) => (
            <rect id={item.zoneLabel + item.slotNumber}
            x={index * 30}
            y="150"
            stroke="black"
            width="30"
            height="30"
            fill={item.occupancyStatus === 'AVAILABLE' ? 'green' : 'red'}
            strokeWidth="2"
            onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber)}
            />
        ));
        return (
            <>
                {rowOneElements}
                {rowTwoElements}
                {rowThreeElements}
            </>
        );
    }

    render = () => {
        const { selectedSlot, shouldDisplaySlotModal, shouldShowRegisterModal, shouldShowReleaseModal } = this.state;

        return (
            <div>
                <Modal show={shouldDisplaySlotModal} onHide={this.closeSlotModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Slot Status - <span className={selectedSlot.occupancyStatus === "AVAILABLE" ? "availableMode" : "occupiedMode"}>
                                    {selectedSlot.occupancyStatus}</span> </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Container>
                            <Row>
                                Zone Label : {selectedSlot.zoneLabel}
                            </Row>
                            <Row>
                                Slot Number: {selectedSlot.slotNumber}
                            </Row>
                            {selectedSlot.occupancyStatus === 'OCCUPIED' ?
                                <>
                                    <Row>
                                        Make: {selectedSlot.occupiedVehicle.make}
                                    </Row>
                                    <Row>
                                        Model: {selectedSlot.occupiedVehicle.model}
                                    </Row>
                                    <Row>
                                        Number Plate: {selectedSlot.occupiedVehicle.numberPlate}
                                    </Row>
                                </> : <></>
                            }
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        {selectedSlot.occupancyStatus === "AVAILABLE" ? 
                            <>
                                <Button variant="primary" onClick={this.showRegisterModal}>Assign</Button>
                                {/* <Button variant="primary">Register Multiple Slots</Button> */}
                            </> : <Button variant="primary" onClick={this.showReleaseForm}>Release</Button>}
                        
                    </Modal.Footer>
                </Modal>
                <Modal show={shouldShowRegisterModal} onHide={this.closeRegisterModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>New Vehicle Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CarRegistrationForm closeForm={this.closeRegisterModal} selectedSlot={selectedSlot} callZoneSummaryService={this.props.callZoneSummaryService} closeGridSvg={this.props.closeGridSvg}/>
                    </Modal.Body>
                </Modal>

                <Modal show={shouldShowReleaseModal} onHide={this.closeReleaseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Vehicle Release</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReleaseCarForm closeForm={this.closeReleaseModal} selectedSlot={selectedSlot} callZoneSummaryService={this.props.callZoneSummaryService} closeGridSvg={this.props.closeGridSvg} />
                    </Modal.Body>
                </Modal>

                <svg viewBox="0 0 1000 1000" className="zoneSvg">
                    {this.renderGridSvg()}
                    {this.renderNumberSvg()}
                    <text x="480" y="115" className="heavy" fontSize="2em">ZONE A</text>
                </svg>
            </div>
        )
    }
}

export default GridSvg;