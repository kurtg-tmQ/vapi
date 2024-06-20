import React from "react";
import PropTypes from "prop-types";
import { DevLinkProvider } from "../devlink/devlinkContext";
import "../stylesheets/cresta.scss";

const Base = ({ children }) => {
    return <DevLinkProvider>{children}</DevLinkProvider>;
};

Base.propTypes = {
    children: PropTypes.any
};

export default Base;