import React from 'react';
import { logout } from '../actions/auth';
import NavbarComponent from '../components/NavbarComponent';
import ZoneLayoutReference from '../components/ZoneLayoutReference';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

class ZoneLayoutReferencePage extends React.Component {
    constructor(props) {
        super(props);
        const { user, isLoggedIn, message } =  this.props;
        this.state = {
            user,
            isLoggedIn,
            message
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn ||
            prevProps.user !== this.props.user ||
            prevProps.message !== this.props.message) {
                const { isLoggedIn, user, message } = this.props;
                this.setState({
                    user,
                    isLoggedIn,
                    message
                });
            }
    }
    
    callLogout = () => {
        this.props.dispatch(logout());
    }

    render = () => {
        const { user, isLoggedIn } =  this.state;
        if ( ! isLoggedIn ) {
            return (
                <Navigate to="/login" replace />
            );
        }
        return (
            <div>
                <NavbarComponent currentUser={user} callLogout={this.callLogout} />
                <ZoneLayoutReference />
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { user, isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        user,
        isLoggedIn,
        message
    }
}

export default connect(mapStateToProps)(ZoneLayoutReferencePage);