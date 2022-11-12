import React from 'react';
import { Modal, Container, Row, Button, Col } from 'react-bootstrap';
import '../../styles/gridsvg.css';
import CarRegistrationForm from '../CarRegistrationForm';
import ReleaseCarForm from '../ReleaseCarForm';
import SingleSlotOverviewModal from '../SingleSlotOverview';

class GridSvg extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clickedZoneData: this.props.clickedZoneData,
            selectedZoneLabel: this.props.selectedZoneLabel,
            selectedSlot: [{}],
            shouldDisplaySlotModal: false,
            shouldShowRegisterModal: false,
            showShowReleaseModal: false,
            isMultSlotMode: false
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.clickedZoneData !== this.props.clickedZoneData) {
            this.setState({
                clickedZoneData: this.props.clickedZoneData,
                selectedZoneLabel: this.props.selectedZoneLabel
            });
        }
    }

    showSlotModal = (selectedZoneLabel, selectedSlotNumber, selectedSlotStatus) => {
        const { isMultSlotMode } = this.state;
        if (! isMultSlotMode ) {
            const { clickedZoneData } = this.state;
            const selectedSlotData = clickedZoneData.find(
                slot => (
                    slot.zoneLabel === selectedZoneLabel && slot.slotNumber === selectedSlotNumber
            ));
            this.setState({
                selectedSlot: [selectedSlotData],
                shouldDisplaySlotModal: true
            });
        }
        else {
            var { selectedSlot } = this.state;
            const { slotNumber: firstSlotNumber } = selectedSlot[0];

            if (selectedSlotStatus === "AVAILABLE" && (selectedSlotNumber + 1 === firstSlotNumber || selectedSlotNumber - 1 === firstSlotNumber)) {
                const { clickedZoneData } = this.state;

                const secondSelectedSlotData = clickedZoneData.find(
                    slot => (
                        slot.zoneLabel === selectedZoneLabel && slot.slotNumber === selectedSlotNumber
                    )
                );
                selectedSlot.push(secondSelectedSlotData);

                this.setState({
                    selectedSlot,
                    shouldDisplaySlotModal: false
                })
                this.showRegisterModal();
            }
            
        }
       
    }

    showRegisterModal = () => {
        this.setState({
            shouldShowRegisterModal: true,
            shouldDisplaySlotModal: false
        });
    }

    showReleaseModal = () => {
        this.setState({
            shouldShowRegisterModal: false,
            shouldDisplaySlotModal: false,
            shouldShowReleaseModal: true
        });
    }

    closeSlotModal = () => {
        this.setState({
            shouldDisplaySlotModal: false,
            selectedSlot: [{}],
            isMultSlotMode: false
        });
    }

    closeRegisterModal = () => {
        this.setState({
            shouldShowRegisterModal: false,
            selectedSlot: [{}],
            isMultSlotMode: false
        });
    }

    closeReleaseModal = () => {
        this.setState({
            shouldShowReleaseModal: false,
            isMultSlotMode: false
        });
    }

    setFirstSelectedSlot = () => {
        // const { selectedSlot } = this.state;
        this.setState({
            isMultSlotMode: true,
            shouldDisplaySlotModal: false
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

    

    generateClassName = (itemSlotNumber, itemSlotStatus) => {
        const { selectedSlot, isMultSlotMode } = this.state;
        var slotNumber;
        if (selectedSlot.length > 0)
            slotNumber = selectedSlot[0].slotNumber;
        if (itemSlotStatus === 'AVAILABLE') {
            if (isMultSlotMode ) {
                if (slotNumber === itemSlotNumber)
                    return "available selected";
                if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1)
                    return "available clickable_rect"
                return "available greyedout";
            }
            return "available clickable_rect";
        }
        return "occupied clickable_rect";
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
                className={this.generateClassName(item.slotNumber, item.occupancyStatus)}
                // fill={item.occupancyStatus === 'AVAILABLE' ? 'green' : 'red'}
                strokeWidth="2"
                onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
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
                className={this.generateClassName(item.slotNumber, item.occupancyStatus)}
                // fill={item.occupancyStatus === 'AVAILABLE' ? 'green' : 'red'}
                strokeWidth="2"
                onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
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
            className={this.generateClassName(item.slotNumber, item.occupancyStatus)}
            // fill={item.occupancyStatus === 'AVAILABLE' ? 'green' : 'red'}
            strokeWidth="2"
            onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
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
                <SingleSlotOverviewModal
                    selectedSlot={selectedSlot[0]}
                    shouldDisplaySlotModal={shouldDisplaySlotModal}
                    closeSlotModal={this.closeSlotModal}
                    showRegisterModal={this.showRegisterModal}
                    showReleaseModal={this.showReleaseModal}
                    setFirstSelectedSlot={this.setFirstSelectedSlot}
                />
                 <Modal show={shouldShowRegisterModal} onHide={this.closeRegisterModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>New Vehicle Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CarRegistrationForm 
                            closeForm={this.closeRegisterModal}
                            selectedSlot={selectedSlot}
                            callZoneSummaryService={this.props.callZoneSummaryService}
                            closeGridSvg={this.props.closeGridSvg}
                            callLogout={this.props.callLogout}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={shouldShowReleaseModal} onHide={this.closeReleaseModal} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Vehicle Release</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReleaseCarForm 
                            closeForm={this.closeReleaseModal}
                            selectedSlot={selectedSlot[0]} 
                            callZoneSummaryService={this.props.callZoneSummaryService} 
                            closeGridSvg={this.props.closeGridSvg} 
                        />
                    </Modal.Body>
                </Modal>

                <Container>
                    <h3>ZONE A</h3>
                </Container>
                <svg viewBox="0 0 1000 1000" className="zoneSvg">
                    {this.renderGridSvg()}
                    {this.renderNumberSvg()}
                    {/* <text x="480" y="10" className="heavy" fontSize="2em">ZONE A</text> */}
                </svg>
            </div>
        )
    }
}

export default GridSvg;