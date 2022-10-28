import React from 'react';
import { CloseButton, ProgressBar, Table } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import GridSvg from './GridSvg';
import GridSVGB from './GridSVGB';
import GridSVGC from './GridSVGC';
import '../styles/parkinglotcounter.css';
import InfoOverlay from './InfoOverlay';
import GridSVGD from './GridSVGD';
import GridSVGE from './GridSVGE';
import GridSVGF from './GridSVGF';
import GridSVGG from './GridSVGG';
import GridSVGH from './GridSVGH';
import GridSVGI from './GridSVGI';
import GridSVGJ from './GridSVGJ';
import GridSVGK from './GridSVGK';
import GridSVGL from './GridSVGL';
import GridSVGM from './GridSVGM';
import GridSVGN from './GridSVGN';
import GridSVGO from './GridSVGO';
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