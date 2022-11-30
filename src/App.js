/* eslint-disable */
import "./App.css";
import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NewSignUpPage from "./pages/NewSignUpPage";
import ParkingLotCounterViewPage from "./pages/ParkingLotCounterViewPage";
import SearchPage from "./pages/SearchPage";
import Loginpage from "./pages/Loginpage";
import ZoneLayoutReferencePage from './pages/ZoneLayoutReferencePage';
import NotFoundPage from './pages/NotFoundPage';
import { logout } from "./actions/auth";
import ReleaseQueuePage from "./pages/ReleaseQueuePage";

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
    if (
      prevProps.user !== this.props.user &&
      !prevProps.isLoggedIn &&
      this.props.isLoggedIn
    ) {
      const { user } = this.props;
      this.setState({
        currentUser: user,
        isLoggedIn: true,
        showHomepage:
          user.roles.includes("ROLE_USER") || user.roles.includes("ROLE_ADMIN"),
        showSignupPage: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
        this.setState({
            currentUser: user,
            showHompage:
                user.roles.includes("ROLE_USER") ||
                user.roles.includes("ROLE_ADMIN"),
            showSignupPage: user.roles.includes("ROLE_ADMIN"),
            isLoggedIn: true
        });
    }
  }

  logOut() {
    this.props.dispatch(logout);
  }

  render = () => {
    const {
      showSignupPage,
    } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Loginpage />}>
            </Route>
            <Route
              path="/signup"
              element={<NewSignUpPage />}
            />{" "}
            <Route path="/" element={<ParkingLotCounterViewPage />} />
            <Route
              path="/search"
              element={<SearchPage />}
            />
            <Route path="/relqueue" element={<ReleaseQueuePage />} />
            <Route path="/layoutref" element={<ZoneLayoutReferencePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  };
}

function mapStateToProps(state) {
  const { user, isLoggedIn } = state.auth;
  return {
    user,
    isLoggedIn,
  };
}

export default connect(mapStateToProps)(App);
