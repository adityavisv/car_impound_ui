import React from 'react';
import {ReactComponent as ParkingLotViewSVG } from '../original.svg';
import {ReactComponent as ParkingLotManualSVG} from './ParkingLotBluePrint.svg';
import '../styles/parkingselectorview.css';

class ParkingSelectorView extends React.Component {
    render = () => {
        return (
            <>
                <div className="container">
                    <ParkingLotViewSVG transform='rotate(-90)' viewBox="0 0 1800 2800" width="180vh" height="150vh"/>
                    <ParkingLotManualSVG />
                </div>
            </>
        )
    }
}

export default ParkingSelectorView;