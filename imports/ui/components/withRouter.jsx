import { useNavigate, useLocation, useParams } from "react-router-dom";
import React from "react";

// eslint-disable-next-line react/display-name
const withRouter = (WrappedComponent) => (props) => {
    return <WrappedComponent {...props} navigate={useNavigate()} location={useLocation()} params={useParams()} />;
};

export default withRouter;
