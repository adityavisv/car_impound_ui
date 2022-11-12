import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, faSearch, faUser, faUserPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbarcomponent.css';
// import 'bootstrap/dist/css/bootstrap.css';

class NavbarComponent extends React.Component {
    render = () => {
        const { currentUser: {username, roles} } = this.props;
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg fixed=">
                    <Container>
                        <Navbar.Brand href="/"> <img src={require("../sp-meta-logo.png")} height="55" width="55" alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav className="me-auto">
                                <Nav.Link href="/" className="nav_link">
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
                                <FontAwesomeIcon icon={faUser} fixedWidth/> {username}
                            </Navbar.Text>
                            <Nav>
                                <NavDropdown align="end">
                                    {roles.includes("ROLE_ADMIN") ?<NavDropdown.Item href="/register">
                                        <FontAwesomeIcon icon={faUserPlus} fixedWidth /> Sign up a new user</NavDropdown.Item> : <></>}
                                    <NavDropdown.Item href="#" className="clickable_text" onClick={this.props.callLogout}>
                                        <FontAwesomeIcon icon={faTimes} fixedWidth /> Logout</NavDropdown.Item>

                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavbarComponent;