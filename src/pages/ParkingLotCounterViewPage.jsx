import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import NavbarComponent from '../components/NavbarComponent';
import ParkingLotCounter from '../components/ParkingLotCounter';
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveZoneSummary } from '../actions/zonesummary';
import { logout } from '../actions/auth';

class ParkingLotViewPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            currentUser: this.props.user,
            parkingZoneSummaries: this.props.parkingZoneSummaries,
            isParkingZoneSummaryDataReady: false
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
            prevProps.parkingZoneSummaries !== this.props.parkingZoneSummaries) {
            if (this.props.statusCode === 401) {
                this.callLogout();
            }
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
                currentUser: this.props.user,
                parkingZoneSummaries: this.props.parkingZoneSummaries
            });
        }
    }

    callZoneSummaryService = () => {
        const { dispatch } = this.props;
        dispatch(retrieveZoneSummary())
            .then(() => {
                this.setState({
                    isParkingZoneSummaryDataReady: true
                })
            })
            .catch(() => {
                this.setState({
                    isLoggedIn: false,
                    isParkingZoneSummaryDataReady: true
                });
            });
    }

    render = () => {
        const { currentUser, parkingZoneSummaries, isLoggedIn, isParkingZoneSummaryDataReady } = this.state;
        if (!isLoggedIn) {
            return <Navigate replace to="/login" />
        }

        return (
            <LoadingOverlay
                active={!isParkingZoneSummaryDataReady}
                spinner
                text='Loading...'
            >
                <div>
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
    const { parkingZoneSummaries, statusCode } = state.zonesummary;
    const { message } = state.message;
    return {
        user,
        isLoggedIn,
        parkingZoneSummaries,
        statusCode,
        message
    }
}

export default connect(mapStateToProps)(ParkingLotViewPage);