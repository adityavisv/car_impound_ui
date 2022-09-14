import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import SidebarComponent from '../components/SidebarComponent';
import 'bootstrap/dist/css/bootstrap.css';
import CarRegistrationForm from '../components/CarRegistrationForm';

class CarRegistrationPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div>
                <Row>
                    <SidebarComponent />
                </Row>
                
                <CarRegistrationForm />
    
            
            </div>
        )
    }
};

export default CarRegistrationPage;