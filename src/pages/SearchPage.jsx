import React from 'react';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import NavbarComponent from '../components/NavbarComponent';
import SearchForm from '../components/SearchForm';

export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            currentUser: this.props.user,
            parkingZoneSummaries: this.props.parkingZoneSummaries,
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn ||
            prevProps.user !== this.props.user) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
                currentUser: this.props.user
            });
        }
    }

    callLogout = () => {
        this.props.dispatch(logout());
    }

    render = () => {
        const { currentUser, isLoggedIn } = this.state;
        if (!isLoggedIn) {
            return <Navigate replace to="/login" />
        }
        return (
            <>
                <NavbarComponent callLogout={this.callLogout} currentUser={currentUser} />
                <SearchForm />
            </>
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