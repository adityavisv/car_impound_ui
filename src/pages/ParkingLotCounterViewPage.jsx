import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import ParkingLotCounter from '../components/ParkingLotCounter';
import 'bootstrap/dist/css/bootstrap.css';

class ParkingLotViewPage extends React.Component {
    render = () => {
        return (
            <div>
                <NavbarComponent />
                <div>
                    <ParkingLotCounter />
                </div>
            </div>
        )
    }
}

export default ParkingLotViewPage;