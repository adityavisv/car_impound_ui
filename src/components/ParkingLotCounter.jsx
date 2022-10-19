import React from 'react';
import { CloseButton, ProgressBar, Table } from 'react-bootstrap';
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

class ParkingLotCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedZone: '',
            parkingAllotmentColumns: [
                {
                    dataField: 'zoneLabel',
                    text: 'Zone Label'
                },
                {
                    dataField: 'zoneCount',
                    text: 'Count'
                },
                {
                    dataField: 'zoneOccupiedCount',
                    text: 'Occupied'
                }
            ],
            parkingAllotments: [
                {
                    zoneLabel: 'A',
                    zoneCount: 89,
                    zoneOccupiedCount: 0,
                },
                {
                    zoneLabel: 'B',
                    zoneCount: 71,
                    zoneOccupiedCount: 10
                },
                {
                    zoneLabel: 'C',
                    zoneCount: 76,
                    zoneOccupiedCount: 0
                },
                {
                    zoneLabel: 'D',
                    zoneCount: 86,
                    zoneOccupiedCount: 40
                },
                {
                    zoneLabel: 'E',
                    zoneCount: 95,
                    zoneOccupiedCount: 0
                },
                {
                    zoneLabel: 'F',
                    zoneCount: 101,
                    zoneOccupiedCount: 0
                },
                {
                    zoneLabel: 'G',
                    zoneCount: 109,
                    zoneOccupiedCount: 109
                },
                {
                    zoneLabel: 'H',
                    zoneCount: 118,
                    zoneOccupiedCount: 20
                },
                {
                    zoneLabel: 'I',
                    zoneCount: 129,
                    zoneOccupiedCount: 35
                },
                {
                    zoneLabel: 'J',
                    zoneCount: 144,
                    zoneOccupiedCount: 44
                },
                {
                    zoneLabel: 'K',
                    zoneCount: 165,
                    zoneOccupiedCount: 0
                },
                {
                    zoneLabel: 'L',
                    zoneCount: 165,
                    zoneOccupiedCount: 11
                },
                {
                    zoneLabel: 'M',
                    zoneCount: 193,
                    zoneOccupiedCount: 100
                },
                {
                    zoneLabel: 'N',
                    zoneCount: 213,
                    zoneOccupiedCount: 111
                },
                {
                    zoneLabel: 'O',
                    zoneCount: 111,
                    zoneOccupiedCount: 100
                },
                {
                    zoneLabel: 'T',
                    zoneCount: 134,
                    zoneOccupiedCount: 80
                }
            ]
        }
    }

    progressBar = (element) => {
        const available = element.zoneCount - element.zoneOccupiedCount;
        return (<>

            <ProgressBar>
                <ProgressBar animated now={element.zoneOccupiedCount} max={element.zoneCount} key={1} variant="danger" label={`${element.zoneOccupiedCount}`} />
                <ProgressBar animated now={available} max={element.zoneCount} key={2} variant="success" label={`${available}`} />
            </ProgressBar>
        </>

        );
    }

    handleRowClick = (event) => {
        this.setState({
            clickedZone: event.currentTarget.id
        });
    }

    svgToRender = () => {
        const {clickedZone} = this.state;
        switch(clickedZone) {
            case 'A':
                return (
                    <GridSvg />
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
        const { parkingAllotments, selectedZone } = this.state;
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
                            Array.from(parkingAllotments).map((element, index) => (
                                <InfoOverlay
                                    render={({ close, labelId, descriptionId }) =>(
                                        <div className="canvas">
                                            <CloseButton onClick={close} id="close_btn" />
                                            {this.svgToRender()}
                                        </div>
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