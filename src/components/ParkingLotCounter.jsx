import React from 'react';
import { Alert, CloseButton, ProgressBar, Table } from 'react-bootstrap';
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
            selectedZoneRequestInit: false,
            selectedZoneRequestFin: false,
            selectedZoneRequestFail: false,
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

    handleGridSvgClose = (close) => {
        this.setState({
            clickedZone: '',
            clickedZoneData: [],
        });
        close();
    }

    handleRowClick = (event) => {
        const clickedZone = event.currentTarget.id;
        this.setState({
            selectedZoneRequestInit: true,
            selectedZoneRequestFail: false,
            selectedZoneRequestFin: false,
            clickedZone
        })
        UserService.getZone(clickedZone)
            .then((response) => {
                this.setState({
                    clickedZoneData: response.data.parkingSpots,
                    selectedZoneRequestInit: false,
                    selectedZoneRequestFin: true,
                    selectedZoneRequestFail: false
                });
            })
            .catch((error) => {
                this.setState({
                    selectedZoneRequestInit: false,
                    selectedZoneRequestFin: false,
                    selectedZoneRequestFail: true,
                });
                if (error.response !== undefined && error.response.status === 401)
                    this.props.callLogout();
            });
    }

    svgToRender = (close) => {
        const { clickedZone, clickedZoneData } = this.state;
        switch (clickedZone) {
            case 'A':
                return (
                    <GridSvg
                        clickedZoneData={clickedZoneData}
                        callZoneSummaryService={this.props.callZoneSummaryService}
                        closeGridSvg={() => this.handleGridSvgClose(close)}
                        callLogout={this.props.callLogout}
                    />
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
        const { selectedZoneRequestInit, selectedZoneRequestFail } = this.state;

        return (
            <div className="table_container">
                <Table responsive hover size="sm" variant="dark">
                    <thead>
                        <tr>
                            <th>Zone</th>
                            <th>Available</th>
                            <th>Occupied</th>
                            <th>Live Counter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from(parkingZoneSummaries).map((element, index) => (
                                <InfoOverlay
                                    render={({ close, labelId, descriptionId }) => (
                                        <LoadingOverlay
                                            active={selectedZoneRequestInit}
                                            spinner
                                            text='Loading...'
                                        >
                                            <div className="canvas">
                                                {selectedZoneRequestFail ? <Alert variant="danger">Failed fetching selected zone data. Something went wrong!</Alert> : null}
                                                <CloseButton onClick={() => this.handleGridSvgClose(close)} id="close_btn" />
                                                {this.svgToRender(close)}
                                            </div>
                                        </LoadingOverlay>
                                    )}
                                >

                                    <tr id={element.zoneLabel} key={element.zoneLabel} onClick={this.handleRowClick} className="regular_tr">
                                        <td className="plaintext">{element.zoneLabel}</td>
                                        <td className="plaintext">{element.availableCount}</td>
                                        <td className="plaintext">{element.occupiedCount}</td>
                                        <td><div className="progress_bar">{this.progressBar(element)}</div></td>
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