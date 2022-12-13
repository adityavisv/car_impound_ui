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

    render = () => {
        const { currentUser, isLoggedIn, upcomingReleases } = this.state;
        if (!isLoggedIn) {
            return <Navigate replace to="/login" />
        }
        return (
            <>
                <NavbarComponent callLogout={this.callLogout} currentUser={currentUser} highlight={upcomingReleases.length > 0}/>
                <SearchForm callLogout={this.callLogout} />
            </>
        );
    }
}

function mapStateToProps(state) {
    const { user, isLoggedIn } = state.auth;
    const { message } = state.message;
    const { upcomingReleases, statusCode: upcomingReleasesStatusCode, upcomingReleasesReqInit, upcomingReleasesReqFail } = state.upcomingreleases;
    return {
        user,
        isLoggedIn,
        message,
        upcomingReleases,
        upcomingReleasesReqFail,
        upcomingReleasesReqInit,
        upcomingReleasesStatusCode
    }
}

export default connect(mapStateToProps)(SearchPage)