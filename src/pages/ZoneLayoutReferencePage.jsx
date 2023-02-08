import React from 'react';
import { withTranslation } from 'react-i18next';
import { logout } from '../actions/auth';
import { fetchUpcomingReleases } from '../actions/upcomingrelease';
import NavbarComponent from '../components/NavbarComponent';
import ZoneLayoutReference from '../components/ZoneLayoutReference';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

class ZoneLayoutReferencePage extends React.Component {
    constructor(props) {
        super(props);
        const { user, isLoggedIn, message, upcomingReleases, missedReleases, upcomingReleasesReqFail, upcomingReleasesReqInit, upcomingReleasesStatusCode, uiLanguage } =  this.props;
        this.state = {
            user,
            isLoggedIn,
            message,
            upcomingReleases,
            missedReleases,
            upcomingReleasesReqInit,
            upcomingReleasesReqFail,
            upcomingReleasesStatusCode,
            uiLanguage
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
                user: this.props.user
            });
        }
        if (prevProps.message !== this.props.message) {
            this.setState({
                message: this.props.message
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
        if (prevProps.upcomingReleasesReqFail !== this.props.upcomingReleasesReqFail) {
            this.setState({
                upcomingReleasesReqFail: this.props.upcomingReleasesReqFail
            });
        }
        if (prevProps.upcomingReleasesReqInit !== this.props.upcomingReleasesReqInit) {
            this.setState({
                upcomingReleasesReqInit: this.props.upcomingReleasesReqInit
            });
        }
        if (prevProps.upcomingReleasesStatusCode !== this.props.upcomingReleasesStatusCode) {
            this.setState({
                upcomingReleasesStatusCode: this.props.upcomingReleasesStatusCode
            });
        }
        if (prevProps.uiLanguage !== this.props.uiLanguage) {
            this.setState({
                uiLanguage: this.props.uiLanguage
            });
            this.props.i18n.changeLanguage(this.props.uiLanguage);
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
        const { user, isLoggedIn, upcomingReleases, uiLanguage } =  this.state;
        if ( ! isLoggedIn ) {
            return (
                <Navigate to="/login" replace />
            );
        }
        return (
            <div>
                <NavbarComponent currentUser={user} callLogout={this.callLogout} highlight={this.getHighlightColor()} uiLanguage={uiLanguage} dispatch={this.props.dispatch} />
                <ZoneLayoutReference />
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { user, isLoggedIn } = state.auth;
    const { message } = state.message;
    const { uiLanguage } = state.uilanguage;
    const { missedReleases,upcomingReleases, statusCode: upcomingReleasesStatusCode, upcomingReleasesReqInit, upcomingReleasesReqFail } = state.upcomingreleases;
    return {
        user,
        isLoggedIn,
        message,
        upcomingReleases,
        missedReleases,
        upcomingReleasesReqInit,
        upcomingReleasesReqFail,
        upcomingReleasesStatusCode,
        uiLanguage
    }
}

export default connect(mapStateToProps)(withTranslation()(ZoneLayoutReferencePage));