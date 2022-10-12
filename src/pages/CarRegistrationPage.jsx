import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import 'bootstrap/dist/css/bootstrap.css';
import CarRegistrationForm from '../components/CarRegistrationForm';
import '../styles/carregistrationpage.css';

class CarRegistrationPage extends React.Component {
    render = () => {
        return (
            <div>
                <NavbarComponent />
                <div className="car_reg_form_container">
                    {/* <Row>
                        <SidebarComponent />
                    </Row> */}
                    <CarRegistrationForm />
                </div>
            </div>
        )
    }
};

export default CarRegistrationPage;