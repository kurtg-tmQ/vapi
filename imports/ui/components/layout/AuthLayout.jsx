import { withTracker } from "meteor/react-meteor-data";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import React, { Component } from "react";
import PropTypes from "prop-types";

// import AccountWatcher from "../../../api/classes/client/account/AccountWatcher";
import Client from "../../../api/classes/client/Client";
import Navigation from "../../../api/classes/client/Navigation";

import withRouter from "../withRouter";

const USER_WATCHER_KEY = "userwatcher-key";

class AuthLayout extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        params: PropTypes.object.isRequired,
        isReady: PropTypes.bool.isRequired
    };
    constructor(props) {
        super(props);
        Client.setWatcher(this, USER_WATCHER_KEY);
    }
    componentDidMount() {

    }
    render() {
        Client.initiateWatch(USER_WATCHER_KEY);

        const prevPath = (this.props.location.state && this.props.location.state.from.pathname) || null;
        if (!Client.IsLoggedIn)
            return <Navigate to={prevPath || Navigation.AvailableRoutes.DEFAULT.path} state={{ from: this.props.location }} replace />;
        return <Outlet />;
    }
}

export default withRouter(
    withTracker(() => {
        // AccountWatcher.initiateWatch(USER_WATCHER_KEY);
        // SettingsManager.initiateWatch(SETTINGS_WATCHER_KEY);
        // return { isReady: AccountWatcher.init() };
        return { isReady: true };
    })(AuthLayout)
);
