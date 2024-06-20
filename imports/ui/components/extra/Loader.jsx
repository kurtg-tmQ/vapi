import React from "react";
import PropTypes from "prop-types";
// import IconImage from "./IconImage";

const Loader = ({ text, small, size, hasOverlay }) => {
    // const smallSource = "/images/spinner-small.svg";
    // const largeSource = "/images/spinner-large.svg";
    // const source = small ? smallSource : largeSource;

    return (
        <>
            {hasOverlay && <div className=""></div>}
            <div className="hr-loader">
                {/* <IconImage src={source} size={size} /> */}
                {/* {text && <span>{text}</span>} */}
                Loading...
            </div>
        </>
    );
};

Loader.propTypes = {
    small: PropTypes.bool,
    text: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hasOverlay: PropTypes.bool
};

export default Loader;
