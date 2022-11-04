import React from 'react';
import { CloseButton, ProgressBar, Table } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import GridSvg from './GridSVG/GridSvg';
import GridSVGB from './GridSVG/GridSVGB';
import GridSVGC from './GridSVG/GridSVGC';
import '../styles/parkinglotcounter.css';
import InfoOverlay from './InfoOverlay';
import GridSVGD from './GridSVG/GridSVGD';
import GridSVGE from './GridSVG/GridSVGE';
import GridSVGF from './GridSVG/GridSVGF';
import GridSVGG from './GridSVG/GridSVGG';
import GridSVGH from './GridSVG/GridSVGH';
import GridSVGI from './GridSVG/GridSVGI';
import GridSVGJ from './GridSVG/GridSVGJ';
import GridSVGK from './GridSVG/GridSVGK';
import GridSVGL from './GridSVG/GridSVGL';
import GridSVGM from './GridSVG/GridSVGM';
import GridSVGN from './GridSVG/GridSVGN';
import GridSVGO from './GridSVG/GridSVGO';
import UserService from '../services/user.service';

class ParkingLotCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedZone: '',
            clickedZoneData: [],
            isSelectedZoneDataReady: false,
            parkingAllotmentColumns: [
                {
                    dataField: 'zoneLabel',
                    text: 'Zone Label'
                },
                {
                    dataField: 'totalCapacity',
                    text: 'Count'
                },
                {
                    dataField: 'occupiedCount',
                    text: 'Occupied'
                }
            ]
        }
    }



    progressBar = (element) => {
        return (<>

            <ProgressBar>
                <ProgressBar animated now={element.occupiedCount} max={element.totalCapacity} key={1} variant="danger" label={`${element.occupiedCount}`} />
                <ProgressBar animated now={element.availableCount} max={element.totalCapacity} key={2} variant="success" label={`${element.availableCount}`} />
            </ProgressBar>
        </>

        );
    }


    handleRowClick = (event) => {
        const clickedZone = event.currentTarget.id;
        UserService.getZone(clickedZone)
            .then((response) => {
                this.setState({
                    clickedZone,
                    clickedZoneData: response.data.parkingSpots,
                    isSelectedZoneDataReady: true
                });
            })
            .catch((error) => {
                this.setState({
                    clickedZone,
                    isSelectedZoneDataReady: false
                });
                if (error.response.status === 401)
                    this.props.callLogout();
            });
    }

    svgToRender = (close) => {
        const { clickedZone, clickedZoneData } = this.state;
        switch (clickedZone) {
            case 'A':
                return (
                    <GridSvg clickedZoneData={clickedZoneData} callZoneSummaryService={this.props.callZoneSummaryService} closeGridSvg={close} />
                );
            case 'B':
                return (
                    <GridSVGB />
                );
            case 'C':
                return (
                    <GridSVGC />
                );
            case 'D':
                return (
                    <GridSVGD />
                );
            case 'E':
                return (
                    <GridSVGE />
                );
            case 'F':
                return (
                    <GridSVGF />
                );
            case 'G':
                return (
                    <GridSVGG />
                );
            case 'H':
                return (
                    <GridSVGH />
                );
            case 'I':
                return (
                    <GridSVGI />
                );
            case 'J':
                return (
                    <GridSVGJ />
                );
            case 'K':
                return (
                    <GridSVGK />
                );
            case 'L':
                return (
                    <GridSVGL />
                );
            case 'M':
                return (
                    <GridSVGM />
                );
            case 'N':
                return (
                    <GridSVGN />
                );
            case 'O':
                return (
                    <GridSVGO />
                );
        }
    }

    render = () => {
        const { parkingZoneSummaries } = this.props;
        const { isSelectedZoneDataReady } = this.state;

        return (
            <div className="table_container">
                <Table responsive className="table" hover>
                    <thead>
                        <tr>
                            <th>Zone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from(parkingZoneSummaries).map((element, index) => (
                                <InfoOverlay
                                    render={({ close, labelId, descriptionId }) => (
                                        <LoadingOverlay
                                            active={!isSelectedZoneDataReady}
                                            spinner
                                            text='Loading...'
                                        >
                                            <div className="canvas">
                                                <CloseButton onClick={close} id="close_btn" />
                                                {this.svgToRender(close)}
                                            </div>
                                        </LoadingOverlay>
                                    )}
                                >

                                    <tr id={element.zoneLabel} key={element.zoneLabel} onClick={this.handleRowClick}>
                                        <td>{element.zoneLabel}</td>
                                        <td>{this.progressBar(element)}</td>
                                    </tr>
                                </InfoOverlay>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ParkingLotCounter;