import React from 'react';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            this.setState({
                uiLanguage: this.props.uiLanguage
            });
            i18n.changeLanguage(this.props.uiLanguage);
        }
    }

    toggleLanguage = () => {
        const { uiLanguage } = this.state;
        const { dispatch } = this.props;
        switch(uiLanguage) {
            case "arab": {
                dispatch(setUILanguage("en"));
                break;
            }
            case "en": {
                dispatch(setUILanguage("arab"));
                break;
            }
        }
    }

    render = () => {
        const { username, roles, highlight } = this.state;
        const { t } = this.props;
        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="lg fixed=">
                    <Container>
                        <Navbar.Brand href="/"> <img src={require("../SharjahPoliceLogo.png")} height="55" width="55" alt="logo" /></Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav className="me-auto">
                                <Nav.Link href="/" className="nav_link">
                                    <FontAwesomeIcon icon={faParking} fixedWidth />
                                    <span className="nav_text"> {t("navbar_parking_view_link")} </span>
                                </Nav.Link>
                                { roles.includes("ROLE_SUPERUSER") || roles.includes("ROLE_ADMIN") || roles.includes("ROLE_EXIT_OPERATOR") ?
                                <Nav.Link href="/search" className="nav_link">
                                    <FontAwesomeIcon icon={faSearch} fixedWidth />
                                    <span className="nav_text"> {t("navbar_search_link")} </span>
                                </Nav.Link> : <></>}

                                
                                {
                                    roles.includes("ROLE_SUPERUSER") || roles.includes("ROLE_ADMIN") ?
                                    <Nav.Link href="/upcomingrelease" className="nav_link">
                                        <FontAwesomeIcon icon={faClock} fixedWidth />
                                        <span className={"nav_text " + highlight}> {t("navbar_upcoming_releases_link")}</span>
                                    </Nav.Link> : <></>
                                }
                                {
                                    roles.includes("ROLE_SUPERUSER") || roles.includes("ROLE_ADMIN") || roles.includes("ROLE_EXIT_OPERATOR") ?
                                <Nav.Link href="/exitqueue" className="nav_link">
                                    <FontAwesomeIcon icon={faUnlock} fixedWidth />
                                    <span className="nav_text"> {t("navbar_exit_queue_link")}</span>
                                </Nav.Link> : <></> }
                                
                                <Nav.Link href="/layoutref" className="nav_link">
                                    <FontAwesomeIcon icon={faFileImage} fixedWidth />
                                    <span className="nav_text"> {t("navbar_layout_reference_link")} </span>
                                </Nav.Link>
                                {roles.includes("ROLE_SUPERUSER") ? 
                                    <Nav.Link href="/signup" className="nav_link">
                                        <FontAwesomeIcon icon={faUserPlus} fixedWidth />
                                        <span className="nav_text"> {t("navbar_signup_link")}</span>
                                    </Nav.Link> : <></>
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
                                <Form.Check type="switch" label="Arabic" onChange={this.toggleLanguage} />
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { uiLanguage } = state.uilanguage;
    return {
        uiLanguage
    };
}

export default connect(mapStateToProps)(withTranslation()(NavbarComponent));
