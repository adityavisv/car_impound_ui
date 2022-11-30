import React from 'react';
import { Alert, CloseButton, Modal, ProgressBar, Table } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import GridSvg from './GridSVG/GridSvg';
import InfoOverlay from './InfoOverlay';
import '../styles/parkinglotcounter.css';
import UserService from '../services/user.service';

class ParkingLotCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedZone: '',
            clickedZoneData: [],
            showGridSvg: false,
            parkingZoneSummaries: this.props.parkingZoneSummaries,
            currentUser: this.props.currentUser,
            isSelectedZoneDataReady: false,
            selectedZoneRequestInit: false,
            selectedZoneRequestFin: false,
            selectedZoneRequestFail: false,
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.currentUser !== this.props.currentUser)
            this.setState({currentUser: this.props.currentUser});
        if (prevProps.parkingZoneSummaries !== this.props.parkingZoneSummaries)
            this.setState({parkingZoneSummaries: this.props.parkingZoneSummaries});
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

    handleGridSvgClose = () => {
        this.setState({
            clickedZone: '',
            clickedZoneData: [],
            showGridSvg: false,
        });
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
                    selectedZoneRequestFail: false,
                    showGridSvg: true
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
        const { clickedZone, clickedZoneData, currentUser } = this.state;
       
                return (
                    <GridSvg
                        currentUser={currentUser}
                        clickedZoneData={clickedZoneData}
                        callZoneSummaryService={this.props.callZoneSummaryService}
                        closeGridSvg={() => this.handleGridSvgClose(close)}
                        callLogout={this.props.callLogout}
                        zoneLabel={clickedZone}
                    />
                );
        
    }

    render = () => {
        const { parkingZoneSummaries, selectedZoneRequestInit, selectedZoneRequestFail, showGridSvg, clickedZone } = this.state;

        return (
            <LoadingOverlay
                active={selectedZoneRequestInit}
                spinner

                text={`Fetching Zone - ${clickedZone} data`}
                
            >
                <Modal show={showGridSvg} onHide={this.handleGridSvgClose} size="xl">
                    <Modal.Header closeButton>
                        <h3>Zone - {clickedZone}</h3>
                    </Modal.Header>
                    <Modal.Body>
                        {this.svgToRender(close)}
                    </Modal.Body>
                </Modal>
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
                                    <tr id={element.zoneLabel} key={element.zoneLabel} onClick={this.handleRowClick} className="regular_tr">
                                        <td className="plaintext">{element.zoneLabel}</td>
                                        <td className="plaintext">{element.availableCount}</td>
                                        <td className="plaintext">{element.occupiedCount}</td>
                                        <td><div className="progress_bar">{this.progressBar(element)}</div></td>
                                    </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
                </LoadingOverlay>
        )
    }
}

export default ParkingLotCounter;