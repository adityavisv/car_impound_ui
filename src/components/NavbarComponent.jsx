import React from 'react';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { faParking, faSearch, faUser, faUserPlus, faTimes, faFileImage, faUnlock, faClock } from '@fortawesome/free-solid-svg-icons';
import '../styles/navbarcomponent.css';
import { setUILanguage } from '../actions/uilanguage';
// import 'bootstrap/dist/css/bootstrap.css';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        const { 
            currentUser: {
                username,
                roles
            },
            uiLanguage,
            highlight
        } = this.props;
        this.state = {
            username,
            roles,
            highlight,
            uiLanguage
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { i18n } = this.props;
        if (this.props.currentUser !== prevProps.currentUser) {
            const {username, roles} = this.props.currentUser;
            this.setState({
                username,
                roles
            });
        }
        if (this.props.highlight !== prevProps.highlight) {
            this.setState({
                highlight: this.props.highlight
            });
        }
        if (this.props.uiLanguage !== prevProps.uiLanguage) {
            const { uiLanguage } = this.props;
            this.setState({
                uiLanguage
            });
        }
    }

    toggleLanguage = () => {
        const { uiLanguage } = this.state;
        const { dispatch } = this.props;
        switch(uiLanguage) {
            case "arab": {
                dispatch(setUILanguage("en"));
                this.setState({
                    uiLanguage: "en"
                });
                break;
            }
            case "en": {
                dispatch(setUILanguage("arab"));
                this.setState({
                    uiLanguage: "arab"
                });
                break;
            }
        }
    }

    render = () => {
        const { username, roles, highlight, uiLanguage } = this.state;
        const { t } = this.props;
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg fixed=">
                    <Container>
                        <Navbar.Brand href="/"> <img src={require("../SharjahPoliceLogo.png")} height="55" width="55" alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav className="me-auto">
                                <NavLink to="/" style={{ textDecoration: 'none', color: 'white' }} className="nav_link">
                                    
                                    <span className="nav_text"> 
                                        <FontAwesomeIcon icon={faParking} fixedWidth /> 
                                        <span className="nav_text">{t("navbar_parking_view_link")}</span> 
                                    </span> 
                                </NavLink>
                                { roles.includes("ROLE_SUPERUSER") || roles.includes("ROLE_ADMIN") || roles.includes("ROLE_EXIT_OPERATOR") ?
                                <NavLink to="/search" style={{ textDecoration: 'none', color: 'white' }} className="nav_link">
                                    <FontAwesomeIcon icon={faSearch} fixedWidth />
                                    <span className="nav_text"> {t("navbar_search_link")} </span>
                                </NavLink> : <></>}

                                
                                {
                                    roles.includes("ROLE_SUPERUSER") || roles.includes("ROLE_ADMIN") ?
                                    <NavLink to="/upcomingrelease" style={{ textDecoration: 'none', color: 'white' }} className="nav_link">
                                        <FontAwesomeIcon icon={faClock} fixedWidth />
                                        <span className={"nav_text " + highlight}> {t("navbar_upcoming_releases_link")}</span>
                                    </NavLink> : <></>
                                }
                                {
                                    roles.includes("ROLE_SUPERUSER") || roles.includes("ROLE_ADMIN") || roles.includes("ROLE_EXIT_OPERATOR") ?
                                <NavLink to="/exitqueue" style={{ textDecoration: 'none', color: 'white' }} className="nav_link">
                                    <FontAwesomeIcon icon={faUnlock} fixedWidth />
                                    <span className="nav_text"> {t("navbar_exit_queue_link")}</span>
                                </NavLink> : <></> }
                                
                                <NavLink to="/layoutref" style={{ textDecoration: 'none', color: 'white' }} className="nav_link">
                                    <FontAwesomeIcon icon={faFileImage} fixedWidth />
                                    <span className="nav_text"> {t("navbar_layout_reference_link")} </span>
                                </NavLink>
                                {roles.includes("ROLE_SUPERUSER") ? 
                                    <NavLink to="/signup" style={{ textDecoration: 'none', color: 'white' }} className="nav_link">
                                        <FontAwesomeIcon icon={faUserPlus} fixedWidth />
                                        <span className="nav_text"> {t("navbar_signup_link")}</span>
                                    </NavLink> : <></>
                                }
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                        
                            <Navbar.Text>
                                <FontAwesomeIcon icon={faUser} fixedWidth/> {username}
                            </Navbar.Text>
                            
                            <Nav>
                                <NavDropdown align="end">
                                    <NavDropdown.Item href="#" className="clickable_text" onClick={this.props.callLogout}>
                                        <FontAwesomeIcon icon={faTimes} fixedWidth /> {t("navbar_logout_link")}</NavDropdown.Item>

                                </NavDropdown>
                            </Nav>

                            <Navbar.Text>
                                <Form.Check type="switch" label="Arabic" onChange={this.toggleLanguage} checked={uiLanguage === 'arab'}/>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}



export default withTranslation()(NavbarComponent);
