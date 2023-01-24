import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import { withTranslation } from 'react-i18next';
import { getAvailableSpotPairs } from '../helpers/generalhelpers';
import { parkingSlotNumberMap } from '../parkingSlotMap';
import UserService from '../services/user.service';

class ReassignCarForm extends React.Component {
    constructor(props) {
        super(props);
        const { selectedSlot = {occupiedVehicle: {}} } = this.props;
        this.state = {
            selectedSlot,
            multSlotMode: selectedSlot[0].occupiedVehicle.parkingSlot.includes(','),
            allSpotsData: [],
            availableSpots: [],
            adjacentSpotMapping: [],
            firstSpotList: [],
            secondSpotList: [],
            newSlotNum1: '',
            newSlotNum2: '',
            newSlotNum: '',
            zoneRequestInit: false,
            zoneRequestFail: false,
            zoneRequestFin: false,
            zoneLabel: ''
        };
        
    }

    componentDidMount = () => {
        UserService.getZone(null)
            .then((response) => {
                this.setState({
                    allSpotsData: response.data.parkingSpots,
                    zoneRequestInit: false,
                    zoneRequestFail: false,
                    zoneRequestFin: true
                });
            })
            .catch((error) => {
                this.setState({
                    allSpotsData: [],
                    zoneRequestInit: false,
                    zoneRequestFail: true,
                    zoneRequestFin: true
                });
            })
 
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.selectedSlot !== this.props.selectedSlot) {
            this.setState({
                selectedSlot: this.props.selectedSlot
            });
        }
    }

    populateZoneLabels = () => {
        const { selectedSlot } = this.state;
        const { occupiedVehicle: {type = ''} = {}} = selectedSlot[0];
        if (type === 'TRUCK') {
            return (
                <option value='T'>T</option>
            );
        }
        else {
            return (
                Array.from(parkingSlotNumberMap).map((element, index) => (
                    <option value={element.zoneLabel}>{element.zoneLabel}</option>
                ))
            );
        }
    }


    changeSlotNumber1 = (event) => {
        const newSlotNum1 = event.target.value;
        const { adjacentSpotMapping }  = this.state;
        var secondSpotList = [];

        for (const spot of adjacentSpotMapping) {
            if (spot.spot.slotNumber === parseInt(newSlotNum1)) {
                secondSpotList = spot.availableAdjacentSpots;
                break;
            }
        }

        this.setState({
            newSlotNum1,
            secondSpotList
        });
    }

    changeSlotNumber2 = (event) => {
        this.setState({
            newSlotNum2: event.target.value
        });
    }

    changeSlotNum = (event) => {
        this.setState({
            newSlotNum: event.target.value
        });
    }

    changeZoneLabel = (event) => {
        const zoneLabel = event.target.value;
        const { allSpotsData, multSlotMode } = this.state;
        const zoneSpotData = allSpotsData.filter(spot => spot.zoneLabel === zoneLabel);
        const availableSpots = zoneSpotData.filter(spot => spot.occupancyStatus === 'AVAILABLE');
        if (! multSlotMode ) {
            this.setState({
                zoneLabel,
                availableSpots
            });
        }
        else {
            const adjacentSpotMapping = getAvailableSpotPairs(availableSpots);
            var firstSpotList = [];
            for ( const spot of adjacentSpotMapping) {
                firstSpotList.push(spot.spot);
            }
            this.setState({
                zoneLabel,
                adjacentSpotMapping,
                firstSpotList
            });
        }
        
    }

    hitReassign = (event) => {
        event.preventDefault();
        const { zoneLabel, newSlotNum1, newSlotNum2, newSlotNum, multSlotMode, selectedSlot} = this.state;
        const slotNumbers = multSlotMode ? [newSlotNum1, newSlotNum2] : [newSlotNum];
        UserService.reassignParkingSpot(selectedSlot[0].occupiedVehicle.id, zoneLabel, slotNumbers)
            .then((response) => {
                this.props.closeForm();
                this.props.closeGridSvg();
                this.props.callZoneSummaryService();
            })
            .catch((error) => {

            })

    }

    render = () => {
        const { newSlotNum1, newSlotNum2, newSlotNum, zoneLabel, multSlotMode, zoneRequestInit, availableSpots, firstSpotList, secondSpotList } = this.state;
        const { t } = this.props;
        return (
            <LoadingOverlay
                active={zoneRequestInit}
                spinner
                text={'Fetching all zone data...'}
                >

            <Form onSubmit={this.hitReassign}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>{t("reassign_car_form_label_zone_label")}</Form.Label>
                        <Form.Select required onChange={this.changeZoneLabel} value={zoneLabel}>
                            <option value=''>{t("reassign_car_form_dropdown_select_an_option")}</option>
                            {this.populateZoneLabels()}
                        </Form.Select>
                    </Form.Group>
                    {
                        multSlotMode ? 
                        <>
                            <Form.Group as={Col}>
                                <Form.Label>{t("reassign_car_form_label_slot_number_1")}</Form.Label>
                                <Form.Select required onChange={this.changeSlotNumber1} value={newSlotNum1}>
                                    <option value=''>{t("reassign_car_form_dropdown_select_an_option")}</option>
                                    {
                                        Array.from(firstSpotList).map((element, index) => (
                                            <option id={element.index} value={element.slotNumber}>{element.slotNumber}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>{t("reassign_car_form_label_slot_number_2")}</Form.Label>
                                <Form.Select required onChange={this.changeSlotNumber2} value={newSlotNum2}>
                                    <option value=''>{t("reassign_car_form_dropdown_select_an_option")}</option>
                                    {
                                        Array.from(secondSpotList).map((element, index) => (
                                            <option id={element.index} value={element.slotNumber}>{element.slotNumber}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </>
                        :
                        <Form.Group as={Col}>
                            <Form.Label>{t("reassign_car_form_label_slot_number")}</Form.Label>
                            <Form.Select required onChange={this.changeSlotNum} value={newSlotNum}>
                                    <option value=''>{t("reassign_car_form_dropdown_select_an_option")}</option>
                               {
                                   Array.from(availableSpots).map((element, index) => (
                                       <option id={element.index} value={element.slotNumber}>{element.slotNumber}</option>
                                   ))
                               }
                            </Form.Select>
                        </Form.Group>
                    }
                    
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Button type="submit" variant="secondary">{t("reassign_car_form_btn_reassign")}</Button>
                    </Form.Group>
                        
                </Row>
            </Form>
            </LoadingOverlay>
        )
    }
}

export default withTranslation()(ReassignCarForm);