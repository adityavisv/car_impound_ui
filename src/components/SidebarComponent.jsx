import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faParking, faSearch, faUnlock } from '@fortawesome/free-solid-svg-icons';


class SidebarComponent extends React.Component {

    constructor (props) {
        super (props);
    }

    render = () => {
        return (
            <div>
               <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/home">Sharjah</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Nav className="mne-auto">
                            <Nav.Link href="/registerCar" className="nav_link">

                                <FontAwesomeIcon icon={faLock} />
                                <span className="nav_text"> Registration </span>
                            </Nav.Link>
                            <Nav.Link href="#" className="nav_link">
                                <FontAwesomeIcon icon={faUnlock} />
                                <span className="nav_text"> Release</span>
                            </Nav.Link>
                            <Nav.Link href="#" className="nav_link">
                                <FontAwesomeIcon icon={faParking} />
                                <span className="nav_text"> Parking View </span>
                            </Nav.Link>
                            <Nav.Link href="#" className="nav_link">
                                <FontAwesomeIcon icon={faSearch} />
                                <span className="nav_text"> Search </span> 
                            </Nav.Link>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Signed in as: <a href="#login">placeholder username</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
               </Navbar>
            </div>
        );
    }
}

export default SidebarComponent;