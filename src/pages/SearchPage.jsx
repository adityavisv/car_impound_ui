import React from 'react';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';

import { fetchUpcomingReleases } from '../actions/upcomingrelease';
import NavbarComponent from '../components/NavbarComponent';
import SearchForm from '../components/SearchForm';
import { logout } from '../actions/auth';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            currentUser: this.props.user,
            upcomingReleases: this.props.upcomingReleases,
            missedReleases: this.props.missedReleases,
            upcomingReleasesReqInit: this.props.upcomingReleasesReqInit,
            upcomingReleasesReqFail: this.props.upcomingReleasesReqFail,
            upcomingReleasesStatusCode: this.props.upcomingReleasesStatusCode
        };
    }

    componentDidMount = () => {
        this.callUpcomgingReleasesService();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn ||
            prevProps.user !== this.props.user) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
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
        if (prevProps.upcomingReleasesReqFail !== this.props.upcomingReleasesReqFail) {
            this.setState({
                upcomingReleasesReqFail: this.props.upcomingReleasesReqFail
            });
        }
    }

    callUpcomgingReleasesService = () => {
        const { dispatch } = this.props;
        dispatch(fetchUpcomingReleases());
    }

    callLogout = () => {
        this.props.dispatch(logout());
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
        const { currentUser, isLoggedIn } = this.state;
        if (!isLoggedIn) {
            return <Navigate replace to="/login" />
        }
        return (
            <>
                <NavbarComponent callLogout={this.callLogout} currentUser={currentUser} highlight={this.getHighlightColor()}/>
                <SearchForm callLogout={this.callLogout} />
            </>
        );
    }
}

function mapStateToProps(state) {
    const { user, isLoggedIn } = state.auth;
    const { message } = state.message;
    const { missedReleases, upcomingReleases, statusCode: upcomingReleasesStatusCode, upcomingReleasesReqInit, upcomingReleasesReqFail } = state.upcomingreleases;
    return {
        user,
        isLoggedIn,
        message,
        missedReleases,
        upcomingReleases,
        upcomingReleasesReqFail,
        upcomingReleasesReqInit,
        upcomingReleasesStatusCode
    }
}

export default connect(mapStateToProps)(SearchPage)