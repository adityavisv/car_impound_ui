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
            missedReleases,
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
            missedReleases,
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
        if (prevProps.missedReleases !== this.props.missedReleases) {
            this.setState({
                missedReleases: this.props.missedReleases
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
        const { currentUser, isLoggedIn, releaseQueue, releaseQueueReqFail, releaseQueueReqInit } = this.state;
        if (!isLoggedIn) {
            return <Navigate replace to="/login" />
        }
        return (
            <LoadingOverlay active={releaseQueueReqInit}
                spinner
                text='Loading...'
            >
                <NavbarComponent callLogout={this.callLogout} currentUser={currentUser} highlight={this.getHighlightColor()}/>
                <ExitQueueComponent releaseQueue={releaseQueue} callLogout={this.callLogout} callReleaseQueueService={this.callFetchReleaseQueueService}/>
            </LoadingOverlay>
        )
    }
}


function mapStateToProps(state) {
    const { user, isLoggedIn } = state.auth;
    const { message } = state.message;
    const { upcomingReleases, missedReleases, statusCode: upcomingReleasesStatusCode, upcomingReleasesReqInit, upcomingReleasesReqFail } = state.upcomingreleases;
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
        missedReleases,
        upcomingReleasesReqInit,
        upcomingReleasesStatusCode,
        upcomingReleasesReqFail
    }
}

export default connect(mapStateToProps)(ExitQueuePage);