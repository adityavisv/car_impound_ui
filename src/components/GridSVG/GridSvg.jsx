import React from 'react';
import { Modal, Container } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import '../../styles/gridsvg.css';
import CarRegistrationForm from '../CarRegistrationForm';
import UserService from '../../services/user.service';
import ReassignCarForm from '../ReassignCarForm';
import ReleaseCarForm from '../ReleaseCarForm';
import SingleSlotOverviewModal from '../SingleSlotOverview';

class GridSvg extends React.Component {
    constructor(props) {
        super(props);

        const { clickedZoneData, zoneLabel, currentUser } = this.props;
        this.state = {
            clickedZoneData,
            zoneLabel,
            selectedSlot: [{}],
            currentUser,
            shouldShowReassignModal: false,
            shouldDisplaySlotModal: false,
            shouldShowRegisterModal: false,
            showShowReleaseModal: false,
            shouldShowUpdateModal: false,
            isMultSlotMode: false
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.clickedZoneData !== this.props.clickedZoneData) {
            this.setState({
                clickedZoneData: this.props.clickedZoneData,
            });
        }
        if (prevProps.currentUser !== this.props.currentUser) {
            this.setState({
                currentUser: this.props.currentUser
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
            UserService.getImagesOfVehicle(selectedSlotData.occupiedVehicle.id)
                    .then((response) => {
                        const { occupiedVehicle } = selectedSlotData;
                        const selectedSlotWithImages = {
                            ...selectedSlotData,
                            occupiedVehicle: {
                                ...occupiedVehicle,
                                images: response.data.images
                            }
                        };
                        this.setState({
                            selectedSlot: [selectedSlotWithImages],
                            shouldDisplaySlotModal:true
                        });
                    })
                    .catch((error) => {
                        if (error.response !== undefined && error.response.status === 401) {
                            this.setState({
                                shouldShowRedirectLoginModal: true,
                                
                            });
                        }
                        else {
                            this.setState({
                                selectedSlot: [selectedSlotData],
                                shouldDisplaySlotModal: true
                            });
                        }
                    });
        }
        else {
            var { selectedSlot } = this.state;
            const { slotNumber: firstSlotNumber } = selectedSlot[0];

            if (selectedSlotStatus === "AVAILABLE" && 
            (selectedSlotNumber + 1 === firstSlotNumber || selectedSlotNumber - 1 === firstSlotNumber || selectedSlotNumber + 28 === firstSlotNumber || selectedSlotNumber - 28 === firstSlotNumber)) {
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
            shouldShowReleaseModal: false,
            shouldDisplaySlotModal: false,
            shouldShowReleaseModal: false,
            shouldShowUpdateModal: false
        });
    }

    showReleaseModal = () => {
        this.setState({
            
            shouldShowReleaseModal: true,
            shouldShowRegisterModal: false,
            shouldDisplaySlotModal: false,
            shouldShowReassignModal: false,
            shouldShowUpdateModal: false
        });
    }

    showUpdateModal = () => {
        this.setState({
            shouldShowUpdateModal: true,
            shouldDisplaySlotModal: false,
            shouldShowReleaseModal: false,
            shouldShowReassignModal: false,
            shouldShowRegisterModal: false
        });
    }

    showReassignModal = () => {
        this.setState({
            shouldShowReassignModal: true,
            shouldShowUpdateModal: false,
            shouldShowReleaseModal: false,
            shouldShowRegisterModal: false,
            shouldDisplaySlotModal: false
        });
    }

    closeSlotModal = () => {
        this.setState({
            shouldDisplaySlotModal: false,
            selectedSlot: [{}],
            isMultSlotMode: false
        });
    }

    closeUpdateModal = () => {
        this.setState({
            shouldShowUpdateModal: false,
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
            selectedSlot: [{}],
            isMultSlotMode: false
        });
    }

    closeReassignModal = () => {
        this.setState({
            shouldShowReassignModal: false,
            isMultSlotMode: false,
            selectedSlot: [{}],
        })
    }

    setFirstSelectedSlot = () => {
        // const { selectedSlot } = this.state;
        this.setState({
            isMultSlotMode: true,
            shouldDisplaySlotModal: false
        });
    }

    renderNumberSvg = () => {
        const { clickedZoneData, zoneLabel } = this.state;
        switch(zoneLabel) {
            case 'A': {
                const rowOneSlice = clickedZoneData.slice(0, 28);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                        x={`${(index * 30) + 7.5}`}
                        y="15" 
                        fontSize="15" 
                        className="box_text"
                        onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        >
                            {item.slotNumber}
                            
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(28,56);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                        x={`${(index * 30) + 6.5}`}
                        y="45"
                        onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
        
                const rowThreeSlice = clickedZoneData.slice(56, 88);
                const rowThreeNumbers = rowThreeSlice.map((item, index) => (
                    <text
                        x={`${(index * 30) + 6.5}`}
                        y="170"
                        onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
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
            case 'B': {
                const rowOneSlice = clickedZoneData.slice(0, 34);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(34,71);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 6.5}`}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );

            }
            case 'C': {
                const rowOneSlice = clickedZoneData.slice(0, 37);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(37,75);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 6.5}`}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );

            }
            case 'D': {
                const rowOneSlice = clickedZoneData.slice(0, 39);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(39,85);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 6.5}`}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'E': {
                const rowOneSlice = clickedZoneData.slice(0, 46);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(46,95);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 6.5}`}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'F': {
                const rowOneSlice = clickedZoneData.slice(0, 49);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(49,101);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'G': {
                const rowOneSlice = clickedZoneData.slice(0, 53);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(53,109);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'H': {
                const rowOneSlice = clickedZoneData.slice(0, 57);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(57,118);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'I': {
                const rowOneSlice = clickedZoneData.slice(0, 62);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(62,129);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'J': {
                const rowOneSlice = clickedZoneData.slice(0, 69);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(69,144);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'K': {
                const rowOneSlice = clickedZoneData.slice(0, 78);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(78,165);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'L': {
                const rowOneSlice = clickedZoneData.slice(0, 92);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={`${(index * 30) + 7.5}`}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(92,193);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'M': {
                const rowOneSlice = clickedZoneData.slice(0, 104);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                
        
                const rowTwoSlice = clickedZoneData.slice(104, 213);
                const rowTwoNumbers = rowTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="105"
                        fontSize="15" className="box_text">
                            {item.slotNumber}
                        </text>
                ));
                return (
                    <>
                        {rowOneNumbers}
                        {rowTwoNumbers}
                    </>
                );
            }
            case 'N': {
                const rowOneSlice = clickedZoneData.slice(0, 111);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                return (
                    <>
                        {rowOneNumbers}
                    </>
                );
            }
            case 'O': {
                const rowOneSlice = clickedZoneData.slice(0, 134);
                const rowOneNumbers = rowOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x={item.slotNumber < 100 ? ((index * 30) + 6.5) : ((index * 30) + 3)}
                        y="15" fontSize="15" className="box_text">
                            {item.slotNumber}
                    </text>
                        
                ));
                return (
                    <>
                        {rowOneNumbers}
                    </>
                );
            }
            case 'T': {
                const colOneSlice = clickedZoneData.slice(0, 25);
                const colOneNumbers = colOneSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x="130"
                        y={`${(index * 30) + 15}`}
                        fontSize="15"
                        className="box_text">{item.slotNumber}
                    </text>
                ));

                const colTwoSlice = clickedZoneData.slice(25, 50);
                const colTwoNumbers = colTwoSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x="98"
                        y={750 -((index * 30) + 15)}
                        fontSize="15"
                        className="box_text">
                            {item.slotNumber}
                        </text>
                ));

                const colThreeSlice = clickedZoneData.slice(50, 76);
                const colThreeNumbers = colThreeSlice.map((item, index) => (
                    <text
                    onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                        x="38"
                        y={`${(index * 30) + 15}`}
                        fontSize="15"
                        className="box_text">
                            {item.slotNumber}
                        </text>
                ));

                return (
                    <>
                        {colOneNumbers}
                        {colTwoNumbers}
                        {colThreeNumbers}
                    </>
                );
            }
        }
        
    }

    

    generateClassName = (itemSlotNumber, itemSlotStatus) => {
        const { selectedSlot, isMultSlotMode } = this.state;
        var slotNumber;
        var zoneLabel;
        if (selectedSlot.length > 0) {
            slotNumber = selectedSlot[0].slotNumber;
            zoneLabel = selectedSlot[0].zoneLabel;
        }
        if (itemSlotStatus === 'AVAILABLE') {
            if (isMultSlotMode ) {
                if (slotNumber === itemSlotNumber)
                    return "available selected";
                if (zoneLabel === 'A') {
                    if (slotNumber === 28 || slotNumber === 56 || slotNumber === 88) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'B') {
                    if (slotNumber === 34 || slotNumber === 71) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'C') {
                    if (slotNumber === 37 || slotNumber === 75) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'D') {
                    if (slotNumber === 39 || slotNumber === 85) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'E') {
                    if (slotNumber === 46 || slotNumber === 95) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'F') {
                    if (slotNumber === 49 || slotNumber === 101) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'G') {
                    if (slotNumber === 53 || slotNumber === 109) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'H') {
                    if (slotNumber === 57 || slotNumber === 118) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'I') {
                    if (slotNumber === 62 || slotNumber === 129) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'J') {
                    if (slotNumber === 69 || slotNumber === 144) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'K') {
                    if (slotNumber === 78 || slotNumber === 165) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                
                }
                else if (zoneLabel === 'L') {
                    if (slotNumber === 92 || slotNumber === 193) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'M') {
                    if (slotNumber === 104 || slotNumber === 213) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'N') {
                    if (slotNumber === 111) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                else if (zoneLabel === 'O') {
                    if (slotNumber === 134) {
                        if (slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }   
                    else {
                        if (slotNumber === itemSlotNumber - 1 || slotNumber === itemSlotNumber + 1) {
                            return "available clickable_rect"
                        }
                    }
                }
                
                return "available greyedout";
            }
            return "available clickable_rect";
        }
        return "occupied clickable_rect";
    }

    renderGridSvg = () => {
        const { clickedZoneData, zoneLabel } = this.state;
        switch(zoneLabel) {
            case 'A': {
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
        
                const rowThreeSlice = clickedZoneData.slice(56, 88);
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
            case 'B': {
                const rowOneSlice = clickedZoneData.slice(0, 34);
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

                const rowTwoSlice = clickedZoneData.slice(34, 71);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'C': {
                const rowOneSlice = clickedZoneData.slice(0, 37);
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

                const rowTwoSlice = clickedZoneData.slice(37, 75);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'D': {
                const rowOneSlice = clickedZoneData.slice(0, 39);
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

                const rowTwoSlice = clickedZoneData.slice(39, 85);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'E':{
                const rowOneSlice = clickedZoneData.slice(0, 46);
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

                const rowTwoSlice = clickedZoneData.slice(46, 95);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'F': {
                const rowOneSlice = clickedZoneData.slice(0, 49);
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

                const rowTwoSlice = clickedZoneData.slice(49, 101);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'G': {
                const rowOneSlice = clickedZoneData.slice(0, 53);
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

                const rowTwoSlice = clickedZoneData.slice(53, 109);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'H': {
                const rowOneSlice = clickedZoneData.slice(0, 57);
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

                const rowTwoSlice = clickedZoneData.slice(57, 118);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'I': {
                const rowOneSlice = clickedZoneData.slice(0, 62);
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

                const rowTwoSlice = clickedZoneData.slice(62, 129);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'J': {
                const rowOneSlice = clickedZoneData.slice(0, 69);
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

                const rowTwoSlice = clickedZoneData.slice(69, 144);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'K': {
                const rowOneSlice = clickedZoneData.slice(0, 78);
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

                const rowTwoSlice = clickedZoneData.slice(78, 165);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'L': {
                const rowOneSlice = clickedZoneData.slice(0, 92);
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

                const rowTwoSlice = clickedZoneData.slice(92, 193);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'M': {
                const rowOneSlice = clickedZoneData.slice(0, 104);
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

                const rowTwoSlice = clickedZoneData.slice(104, 213);
                const rowTwoElements = rowTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x={index * 30}
                        y="90"
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
                    </>
                );
            }
            case 'N': {
                const rowOneSlice = clickedZoneData.slice(0, 111);
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
                return (
                    <>
                        {rowOneElements}
                    </>
                );
            }
            case 'O': {
                const rowOneSlice = clickedZoneData.slice(0, 134);
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
                return (
                    <>
                        {rowOneElements}
                    </>
                );
            }
            case 'T': {
                const colOneSlice = clickedZoneData.slice(0, 25);
                const colOneElements = colOneSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x="120" 
                        y={`${index * 30}`} 
                        stroke="black"
                        width="30"
                        height="30"
                        className={this.generateClassName(item.slotNumber, item.occupancyStatus)}
                        // fill={item.occupancyStatus === 'AVAILABLE' ? 'green' : 'red'}
                        strokeWidth="2"
                        onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                    />
                ));

                const colTwoSlice = clickedZoneData.slice(25, 50);
                const colTwoElements = colTwoSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x="90"
                        y={720 - (index * 30)}
                        stroke="black"
                        width="30"
                        height="30"
                        className={this.generateClassName(item.slotNumber, item.occupancyStatus)}
                        // fill={item.occupancyStatus === 'AVAILABLE' ? 'green' : 'red'}
                        strokeWidth="2"
                        onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                    />
                ));

                const colThreeSlice = clickedZoneData.slice(50, 76);
                const colThreeElements = colThreeSlice.map((item, index) => (
                    <rect id={item.zoneLabel + item.slotNumber}
                        x="30"
                        y={index * 30}
                        stroke="black"
                        width="30"
                        height="30"
                        className={this.generateClassName(item.slotNumber, item.occupancyStatus)}
                        strokeWidth="2"
                        onClick={() => this.showSlotModal(item.zoneLabel, item.slotNumber, item.occupancyStatus)}
                    />
                ));
                return (
                    <>
                        {colOneElements}
                        {colTwoElements}
                        {colThreeElements}
                    </>
                );
            }


        }
    }

    getWidth = () => {
        const { zoneLabel } = this.state;
        switch(zoneLabel) {
            case 'A':
                return 1000;
            case 'B':
            case 'C':
                return 1200;
            case 'D':
                return 1350;
            case 'E':
                return 1500;
            case 'F':
                return 1600;
            case 'G':
                return 1700;
            case 'H':
                return 1800;
            case 'I':
                return 2050;
            case 'J':
                return 2300;
            case 'K':
                return 2660;
            case 'L':
                return 3100;
            case 'M':
                return 3300;
            case 'N':
                return 3500;
            case 'O':
                return 4100;
            case 'T':
                return 200;
        }
    }

    getHeight = () => {
        const { zoneLabel } = this.state;
        switch(zoneLabel) {
            case 'T':
                return 900;
            default: 
                return 200;
        }
    }

    getViewBox = () => {
        const { zoneLabel } = this.state;
        switch(zoneLabel) {
            case 'A':
                return "0 0 1000 300"
            case 'B':
            case 'C':
                return "0 0 1200 300"
            case 'D':
                return "0 0 1350 300"
            case 'E':
                return "0 0 1500 300"
            case 'F':
                return "0 0 1600 300"
            case 'G':
                return "0 0 1700 300"
            case 'H':
                return "0 0 1800 300"
            case 'I':
                return "0 0 2050 300"
            case 'J':
                return "0 0 2100 300"
            case 'K':
                return "0 0 2400 300"
            case 'L':
                return "0 0 3000 300"
            case 'M':
                return "0 0 3250 300"
            case 'N':
                return "0 0 3400 200"
            case 'O':
                return "0 0 3600 200"
            case 'T':
                return "0 0 300 900"
        }
    }

    render = () => {
        const { selectedSlot, shouldDisplaySlotModal, shouldShowRegisterModal, shouldShowReleaseModal, shouldShowReassignModal, shouldShowUpdateModal, currentUser } = this.state;
        const { t } = this.props;
        return (
            <div>
                <SingleSlotOverviewModal
                    currentUser={currentUser}
                    selectedSlot={selectedSlot[0]}
                    shouldDisplaySlotModal={shouldDisplaySlotModal}
                    closeSlotModal={this.closeSlotModal}
                    showRegisterModal={this.showRegisterModal}
                    showUpdateModal={this.showUpdateModal}
                    showReleaseModal={this.showReleaseModal}
                    showReassignModal={this.showReassignModal}
                    setFirstSelectedSlot={this.setFirstSelectedSlot}
                />
                 <Modal show={shouldShowRegisterModal} onHide={this.closeRegisterModal} size="xl" centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-auto">{t( "gridsvg_modal_title_new_vehicle_registration")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CarRegistrationForm
                            closeForm={this.closeRegisterModal}
                            selectedSlot={selectedSlot}
                            callZoneSummaryService={this.props.callZoneSummaryService}
                            closeGridSvg={this.props.closeGridSvg}
                            callLogout={this.props.callLogout}
                            updateMode={false}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={shouldShowUpdateModal} onHide={this.closeUpdateModal} size="xl" centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-auto">{t("gridsvg_modal_title_modify_vehicle_registration")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CarRegistrationForm
                            closeForm={this.closeUpdateModal}
                            selectedSlot={selectedSlot}
                            callZoneSummaryService={this.props.callZoneSummaryService}
                            closeGridSvg={this.props.closeGridSvg}
                            callLogout={this.props.callLogout}
                            updateMode={true}
                            vehicle={selectedSlot[0].occupiedVehicle}
                        />
                    </Modal.Body>
                </Modal>

                <Modal show={shouldShowReleaseModal} onHide={this.closeReleaseModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-auto">{t("gridsvg_modal_title_vehicle_release")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReleaseCarForm 
                            closeForm={this.closeReleaseModal}
                            selectedSlot={selectedSlot[0]} 
                            callZoneSummaryService={this.props.callZoneSummaryService} 
                            closeGridSvg={this.props.closeGridSvg}
                            callLogout={this.props.callLogout}
                        />
                    </Modal.Body>
                </Modal>


                <Modal show={shouldShowReassignModal} onHide={this.closeReassignModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="ms-auto">{t("gridsvg_modal_title_vehicle_reassign")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReassignCarForm
                            selectedSlot={selectedSlot}
                            closeForm={this.closeReassignModal}
                            callZoneSummaryService={this.props.callZoneSummaryService}
                            closeGridSvg={this.props.closeGridSvg}
                            callLogout={this.props.callLogout}
                            />
                    </Modal.Body>
                </Modal>

                <Container>
                </Container>
                <div className="svgrow_container">

                    <svg className="zoneSvg" width={this.getWidth()} height={this.getHeight()}>
                        {this.renderGridSvg()}
                        {this.renderNumberSvg()}
                    </svg>
                </div>
            </div>
        )
    }
}

export default withTranslation()(GridSvg);