import React from 'react';
import { ProgressBar, Table } from 'react-bootstrap';
import '../styles/parkinglotcounter.css';

class ParkingLotCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    zoneLabel: 'P',
                    zoneCount: 134,
                    zoneOccupiedCount: 80
                }
            ]
        }
    }

    progressBar = (element) => {
        const available = element.zoneCount - element.zoneOccupiedCount;
        return (
            <ProgressBar>
                <ProgressBar animated now={element.zoneOccupiedCount} max={element.zoneCount} key={1} variant="danger" label={`${element.zoneOccupiedCount}`} />
                <ProgressBar animated now={available} max={element.zoneCount} key={2} variant="success" label={`${available}`} />
            </ProgressBar>
        );
    }

    render = () => {
        const {parkingAllotments, parkingAllotmentColumns} = this.state;
        return (
            <div className="table_container">
                <Table responsive className="table">
                    <thead>
                        <tr>
                            <th>Zone Label</th>
                            <th>Zone Counter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from(parkingAllotments).map((element, index) => (

                                <tr>
                                    <td>{element.zoneLabel}</td>
                                    <td>
                                        {this.progressBar(element)}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default ParkingLotCounter;