import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faParking, faSearch, faUnlock } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbarcomponent.css';
// import 'bootstrap/dist/css/bootstrap.css';

class NavbarComponent extends React.Component {
    render = () => {
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="/home">Sharjah</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav className="me-auto">
                                <Nav.Link href="/registerCar">
                                    <FontAwesomeIcon icon={faLock} size="sm" fixedWidth />
                                    <span className="nav_text"> Registration </span>
                                </Nav.Link>
                                <Nav.Link href="/release" className="nav_link">
                                    <FontAwesomeIcon icon={faUnlock} fixedWidth />
                                    <span className="nav_text"> Release</span>
                                </Nav.Link>
                                <Nav.Link href="/home" className="nav_link">
                                    <FontAwesomeIcon icon={faParking} fixedWidth />
                                    <span className="nav_text"> Parking View </span>
                                </Nav.Link>
                                <Nav.Link href="/search" className="nav_link">
                                    <FontAwesomeIcon icon={faSearch} fixedWidth />
                                    <span className="nav_text"> Search </span>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
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

export default NavbarComponent;