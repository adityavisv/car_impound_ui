/* eslint-disable */
import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Routes, Switch, Link, Route, Navigate } from 'react-router-dom';
import Registerpage from './pages/RegisterPage';
import ParkingLotCounterViewPage from './pages/ParkingLotCounterViewPage';
import CarRegistrationPage from './pages/CarRegistrationPage';
import SearchPage from './pages/SearchPage';
import Loginpage from './pages/Loginpage';
import ReleaseCarPage from './pages/ReleaseCarPage';
import { history } from './helpers/history';
import { clearMessage } from './actions/message';
import { logout } from './actions/auth';
import UserService from './services/user.service';

class App extends React.Component {
        constructor(props) {
            super(props);
            this.logOut = this.logOut.bind(this);

            this.state = {
                showHomepage: false,
                currentUser: {},
                isLoggedIn: false,
                showSignupPage: false,
                parkingZoneSummaries: [],
            };
        }

        componentDidUpdate(prevProps, prevState) {
            if (prevProps.user !== this.props.user &&
                ((!prevProps.isLoggedIn) && this.props.isLoggedIn)) {
                const { user } = this.props;
                this.setState({
                    currentUser: user,
                    isLoggedIn: true,
                    showHomepage: user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
                    showSignupPage: user.roles.includes("ROLE_ADMIN")
                });
            }
        }

        componentDidMount() {
            const user = this.props.user;

            if (user) {
                UserService.getAllZoneSummaries().then(
                    response => {
                        this.setState({
                            parkingZoneSummaries: response.data.zoneSummaries,
                            currentUser: user,
                            showHomepage: user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
                            showSignupPage: user.roles.includes("ROLE_ADMIN")
                        });
                    },
                    error => {
                        if (error.response.status === 401)
                            this.setState({
                                showHomepage: false,
                                showSignupPage: false,
                                currentUser: user,
                            });
                        this.logOut();
                    }
                );
            }
        }

        logOut() {
            this.props.dispatch(logout);
        }


        render = () => {
            const { currentUser, showHomepage, showSignupPage, parkingZoneSummaries, isLoggedIn } = this.state;
            return ( <
                div >
                <
                BrowserRouter >
                <
                Routes >
                <
                Route path = "/login"
                element = { < Loginpage / > } > < /Route> <
                Route path = "/register"
                element = {
                    showSignupPage ? < Registerpage / > : null
                }
                /> <
                Route path = "/home"
                element = { < ParkingLotCounterViewPage / > }
                /> <
                Route path = "/search"
                element = { < SearchPage currentUser = { currentUser }
                    />} / >

                    <
                    /Routes>  <
                    /BrowserRouter>  <
                    /div>
                );
            }
        }

        function mapStateToProps(state) {
            const { user, isLoggedIn } = state.auth;
            return {
                user,
                isLoggedIn
            }
        }

        export default connect(mapStateToProps)(App);