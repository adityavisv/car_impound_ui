import React from 'react';
import { connect } from 'react-redux';
import NavbarComponent from '../components/NavbarComponent';
import { logout } from '../actions/auth';
import { Navigate } from 'react-router-dom';
import { fetchUpcomingReleases } from '../actions/upcomingrelease';
import InsufficientPrivModal from '../components/InsufficientPrivModal';
import LoadingOverlay from 'react-loading-overlay';
import UpcomingReleaseComponent from '../components/UpcomingReleaseComponent';

class UpcomingReleasePage extends React.Component {
    constructor(props) {
        super(props);
        const {
            isLoggedIn, user, upcomingReleases, missedReleases, upcomingReleasesReqFail, upcomingReleasesReqInit
        } = this.props;
        this.state = {
            isLoggedIn,
            currentUser: user,
            upcomingReleases,
            missedReleases,
            upcomingReleasesReqInit,
            upcomingReleasesReqFail,
            hasClickedOkInsufficientPriv: false
        };
    }

    componentDidMount = () => {
        this.callUpcomgingReleasesService();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn
            });
        }
        if (prevProps.user !== this.props.user) {
            this.setState({
                currentUser: this.props.user
            });
        }
        if (prevProps.upcomingReleases !== this.props.upcomingReleases) {
            this.setState({
                upcomingReleases: this.props.upcomingReleases
            });
        }
        if (prevProps.missedReleases !== this.props.missedReleases) {
            this.setState({
                missedReleases: this.props.missedReleases
            });
        }
        if (prevProps.upcomingReleasesReqInit !== this.props.upcomingReleasesReqInit) {
            this.setState({
                upcomingReleasesReqInit: this.props.upcomingReleasesReqInit
            });
        }
        if (this.props.upcomfingReleasesReqFail !== this.props.upcomfingReleasesReqFail) {
            this.setState({
                upcomingReleasesReqFail: this.props.upcomingReleasesReqFail
            });
        }
    }

    callLogout = () => {
        this.props.dispatch(logout());
    }

    callUpcomgingReleasesService = () => {
        const { dispatch } = this.props;
        dispatch(fetchUpcomingReleases());
    }

    onClickOkInsufficentPriv = () => {
        this.setState({
            hasClickedOkInsufficientPriv: true
        });
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
        const { currentUser, isLoggedIn, missedReleases, upcomingReleases, upcomingReleasesReqInit, hasClickedOkInsufficientPriv } = this.state;
        if (!isLoggedIn) {
            return <Navigate replace to="/login" />
        }
        else {
            if (currentUser.roles.includes("ROLE_ADMIN") || currentUser.roles.includes("ROLE_SUPERUSER")) {
                return (
                    <LoadingOverlay
                        active={upcomingReleasesReqInit}
                        spinner
                        text='Loading....'
                    >
                        <NavbarComponent callLogout={this.callLogout} currentUser={currentUser} highlight={this.getHighlightColor()}/>
                        <UpcomingReleaseComponent
                            upcomingReleases={upcomingReleases}
                            missedReleases={missedReleases}
                            callUpcomgingReleasesService={this.callUpcomgingReleasesService}
                            callLogout={this.callLogout}
                        />
                    </LoadingOverlay>
                )
            }
            else {
                return hasClickedOkInsufficientPriv ? <Navigate to="/" replace /> : <InsufficientPrivModal onHide={this.onClickOkInsufficentPriv} />
            }
        }
       
    }
}

function mapStateToProps(state) {
    const { user, isLoggedIn } = state.auth;
    const { upcomingReleases, missedReleases, statusCode, upcomingReleasesReqInit, upcomingReleasesReqFail } = state.upcomingreleases;
    const { message } = state.message;
    return {
        user,
        isLoggedIn,
        message,
        upcomingReleases,
        missedReleases,
        statusCode,
        upcomingReleasesReqInit,
        upcomingReleasesReqFail
    };
}

export default connect(mapStateToProps)(UpcomingReleasePage);