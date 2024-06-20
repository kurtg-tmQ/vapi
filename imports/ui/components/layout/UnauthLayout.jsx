import { withTracker } from "meteor/react-meteor-data";
import { Outlet } from "react-router-dom";
import React, { Component } from "react";
import withRouter from "../withRouter";

class UnauthLayout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Outlet />;
    }
}

UnauthLayout.propTypes = {};

export default withRouter(
    withTracker(() => {
        return {};
    })(UnauthLayout)
);
