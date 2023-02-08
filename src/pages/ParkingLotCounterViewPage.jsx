import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { withTranslation } from 'react-i18next';
import NavbarComponent from '../components/NavbarComponent';
import ParkingLotCounter from '../components/ParkingLotCounter';
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveZoneSummary } from '../actions/zonesummary';
import { fetchUpcomingReleases } from '../actions/upcomingrelease';
import { logout } from '../actions/auth';
import { Alert, Modal, Button } from 'react-bootstrap';

class ParkingLotViewPage extends React.Component {
    constructor(props) {
        super(props);
        const { missedReleases, upcomingReleases, isLoggedIn, user, parkingZoneSummaries, zoneSummaryReqInit, zoneSummaryReqFail, uiLanguage } = this.props;
        this.state = {
            isLoggedIn,
            currentUser: user,
            missedReleases,
            upcomingReleases,
            parkingZoneSummaries,
            zoneSummaryReqInit,
            zoneSummaryReqFail,
            uiLanguage
        };
    }

    componentDidMount = () => {
        this.callZoneSummaryService();
        this.callUpcomgingReleasesService();
    }

    callLogout = () => {
        this.props.dispatch(logout());
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn
            });
        }
        if (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
        if (prevProps.parkingZoneSummaries !== this.props.parkingZoneSummaries) {
            this.setState({parkingZoneSummaries: this.props.parkingZoneSummaries});
        }
        if (prevProps.zoneSummaryReqFail !== this.props.zoneSummaryReqFail) {
            this.setState({zoneSummaryReqFail: this.props.zoneSummaryReqFail});
        }
        if (prevProps.zoneSummaryReqInit !== this.props.zoneSummaryReqInit) {
            this.setState({zoneSummaryReqInit: this.props.zoneSummaryReqInit});
        }
        if (prevProps.statusCode !== this.props.statusCode) {
            if (this.props.statusCode === 401)
                this.callLogout();
        }
        if (prevProps.upcomingReleases !== this.props.upcomingReleases) {
            this.setState({upcomingReleases: this.props.upcomingReleases});
        }
        if (prevProps.missedReleases !== this.props.missedReleases) {
            this.setState({missedReleases: this.props.missedReleases});
        }
        if (prevProps.uiLanguage !== this.props.uiLanguage) {
            this.setState({uiLanguage: this.state.uiLanguage});
            const { i18n } = this.props;
            i18n.changeLanguage(this.props.uiLanguage);
        }
    }

    callUpcomgingReleasesService = () => {
        const { dispatch } = this.props;
        dispatch(fetchUpcomingReleases());
    }

    callZoneSummaryService = () => {
        const { dispatch } = this.props;
        dispatch(retrieveZoneSummary());
    }

    hideRetryModal = () => {
        this.setState({zoneSummaryReqFail: false});
        this.callZoneSummaryService();
    }

    getHighlightColor = () => {
        const { upcomingReleases, missedReleases } = this.state;
        if (missedReleases.length > 0) {
            return 'RED';
        } 
        else if (upcomingReleases.length > 0)
            return 'YELLOW';
        return null;
    }

    render = () => {
        const { currentUser, parkingZoneSummaries, isLoggedIn, zoneSummaryReqInit, zoneSummaryReqFail, uiLanguage } = this.state;
        if (!isLoggedIn) {
            return <Navigate replace to="/login" />
        }

        return (
            <LoadingOverlay
                active={zoneSummaryReqInit}
                spinner
                text='Loading...'
            >
                <div>
                    <Modal show={zoneSummaryReqFail} onHide={this.hideRetryModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title className="ms-auto">
                               Error
                            </Modal.Title></Modal.Header>
                            <Modal.Body>
                                <Alert variant="danger">There was an error retrieving data. Please retry.</Alert>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.hideRetryModal}>Retry</Button>
                            </Modal.Footer>
                        
                    </Modal>
                    <NavbarComponent currentUser={currentUser} callLogout={this.callLogout} highlight={this.getHighlightColor()} uiLanguage={uiLanguage} dispatch={this.props.dispatch}/>
                    <div>
                        <ParkingLotCounter
                            currentUser={currentUser}
                            parkingZoneSummaries={parkingZoneSummaries}
                            callLogout={this.callLogout}
                            callZoneSummaryService={this.callZoneSummaryService}
                        />
                    </div>
                </div>
            </LoadingOverlay>

        )
    }
}

function mapStateToProps(state) {
    const { user, isLoggedIn } = state.auth;
    const { missedReleases, upcomingReleases, statusCode: upcomingReleasesStatusCode, upcomingReleasesReqInit, upcomingReleasesReqFail } = state.upcomingreleases;
    const { parkingZoneSummaries, statusCode, zoneSummaryReqInit, zoneSummaryReqFail } = state.zonesummary;
    const { message } = state.message;
    const { uiLanguage } = state.uilanguage;
    return {
        user,
        isLoggedIn,
        parkingZoneSummaries,
        zoneSummaryReqInit,
        zoneSummaryReqFail,
        statusCode,
        missedReleases,
        upcomingReleases,
        upcomingReleasesReqInit,
        upcomingReleasesReqFail,
        upcomingReleasesStatusCode,
        message,
        uiLanguage
    }
}

export default connect(mapStateToProps)(withTranslation()(ParkingLotViewPage));