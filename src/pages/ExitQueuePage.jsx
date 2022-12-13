import React from 'react';
import { fetchReleaseQueue } from "../actions/releasequeuefetch";
import NavbarComponent from '../components/NavbarComponent';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { fetchUpcomingReleases } from '../actions/upcomingrelease';
import ExitQueueComponent from '../components/ExitQueueComponent';
import { Navigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';

class ExitQueuePage extends React.Component {
    constructor(props) {
        super(props);
        const {
            isLoggedIn, 
            user, 
            releaseQueue, 
            releaseQueueReqFail, 
            releaseQueueReqInit,
            upcomingReleases,
            upcomingReleasesStatusCode,
            upcomingReleasesReqInit,
            upcomingReleasesReqFail
        } = this.props;
        this.state = {
            isLoggedIn,
            currentUser: user,
            releaseQueue,
            releaseQueueReqInit,
            releaseQueueReqFail,
            upcomingReleases,
            upcomingReleasesReqInit,
            upcomingReleasesReqFail,
            upcomingReleasesStatusCode,
        };
    }

    componentDidMount = () => {
        this.callFetchReleaseQueueService();
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
        if (prevProps.releaseQueue !== this.props.releaseQueue) {
            this.setState({
                releaseQueue: this.props.releaseQueue
            });
        }
        if (prevProps.releaseQueueReqFail !== this.props.releaseQueueReqFail) {
            this.setState({
                releaseQueueReqFail: this.props.releaseQueueReqFail
            });
        }
        if (prevProps.releaseQueueReqInit !== this.props.releaseQueueReqInit) {
            this.setState({
                releaseQueueReqInit: this.props.releaseQueueReqInit
            });
        }
        if (prevProps.upcomingReleases !== this.props.upcomingReleases) {
            this.setState({
                upcomingReleases: this.props.upcomingReleases
            });
        }
        if (prevProps.upcomingReleasesReqInit !== this.props.upcomingReleasesReqInit) {
            this.setState({
                upcomingReleasesReqInit: this.props.upcomingReleasesReqInit
            });
        }
        if (prevProps.upcomingReleasesReqFail !== this.props.upcomingReleasesReqFail) {
            this.setState({
                upcomingReleasesReqFail: this.props.upcomingReleasesReqFail
            });
        }
        if (prevProps.upcomingReleasesStatusCode !== this.props.upcomingReleasesStatusCode) {
            this.setState({
                upcomingReleasesStatusCode: this.props.upcomingReleasesStatusCode
            });
        }
    }

    callLogout = () => {
        this.props.dispatch(logout());
    }

    callFetchReleaseQueueService = () => {
        const { dispatch } = this.props;
        dispatch(fetchReleaseQueue());
    }

    callUpcomgingReleasesService = () => {
        const { dispatch } = this.props;
        dispatch(fetchUpcomingReleases());
    }

    render = () => {
        const { currentUser, isLoggedIn, releaseQueue, releaseQueueReqFail, releaseQueueReqInit, upcomingReleases } = this.state;
        if (!isLoggedIn) {
            return <Navigate replace to="/login" />
        }
        return (
            <LoadingOverlay active={releaseQueueReqInit}
                spinner
                text='Loading...'
            >
                <NavbarComponent callLogout={this.callLogout} currentUser={currentUser} highlight={upcomingReleases.length > 0}/>
                <ExitQueueComponent releaseQueue={releaseQueue} callLogout={this.callLogout} callReleaseQueueService={this.callFetchReleaseQueueService}/>
            </LoadingOverlay>
        )
    }
}


function mapStateToProps(state) {
    const { user, isLoggedIn } = state.auth;
    const { message } = state.message;
    const { upcomingReleases, statusCode: upcomingReleasesStatusCode, upcomingReleasesReqInit, upcomingReleasesReqFail } = state.upcomingreleases;
    const { releaseQueue, statusCode, releaseQueueReqInit, releaseQueueReqFail } = state.releasequeue;
    return {
        user,
        isLoggedIn,
        message,
        releaseQueue,
        statusCode,
        releaseQueueReqInit,
        releaseQueueReqFail,
        upcomingReleases,
        upcomingReleasesReqInit,
        upcomingReleasesStatusCode,
        upcomingReleasesReqFail
    }
}

export default connect(mapStateToProps)(ExitQueuePage);