import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import NavbarComponent from '../components/NavbarComponent';
import ParkingLotCounter from '../components/ParkingLotCounter';
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveZoneSummary } from '../actions/zonesummary';
import { logout } from '../actions/auth';
import { Alert, Modal, Button } from 'react-bootstrap';

class ParkingLotViewPage extends React.Component {
    constructor(props) {
        super(props);
        const { isLoggedIn, user, parkingZoneSummaries, zoneSummaryReqInit, zoneSummaryReqFail } = this.props;
        this.state = {
            isLoggedIn,
            currentUser: user,
            parkingZoneSummaries,
            zoneSummaryReqInit,
            zoneSummaryReqFail
        };
    }

    componentDidMount = () => {
        this.callZoneSummaryService();
    }

    callLogout = () => {
        this.props.dispatch(logout());
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn ||
            prevProps.user !== this.props.user ||
            prevProps.parkingZoneSummaries !== this.props.parkingZoneSummaries ||
            prevProps.zoneSummaryReqInit !== this.props.zoneSummaryReqInit ||
            prevProps.zoneSummaryReqFail !== this.props.zoneSummaryReqFail) {

                const { user, parkingZoneSummaries, isLoggedIn, statusCode, zoneSummaryReqInit, zoneSummaryReqFail } = this.props;
                if (statusCode === 401) {
                    this.callLogout();
                }
                this.setState({
                    isLoggedIn,
                    currentUser: user,
                    parkingZoneSummaries,
                    statusCode,
                    zoneSummaryReqInit,
                    zoneSummaryReqFail
                });
        }
    }

    callZoneSummaryService = () => {
        const { dispatch } = this.props;
        dispatch(retrieveZoneSummary());
    }

    hideRetryModal = () => {
        this.setState({zoneSummaryReqFail: false});
        this.callZoneSummaryService();
    }

    render = () => {
        const { currentUser, parkingZoneSummaries, isLoggedIn, zoneSummaryReqInit, zoneSummaryReqFail } = this.state;
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
                    <Modal show={zoneSummaryReqFail} onHide={this.hideRetryModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                               Error
                            </Modal.Title></Modal.Header>
                            <Modal.Body>
                                <Alert variant="danger">There was an error retrieving data. Please retry.</Alert>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={this.hideRetryModal}>Retry</Button>
                            </Modal.Footer>
                        
                    </Modal>
                    <NavbarComponent currentUser={currentUser} callLogout={this.callLogout} />
                    <div>
                        <ParkingLotCounter
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
    const { parkingZoneSummaries, statusCode, zoneSummaryReqInit, zoneSummaryReqFail } = state.zonesummary;
    const { message } = state.message;
    return {
        user,
        isLoggedIn,
        parkingZoneSummaries,
        zoneSummaryReqInit,
        zoneSummaryReqFail,
        statusCode,
        message
    }
}

export default connect(mapStateToProps)(ParkingLotViewPage);