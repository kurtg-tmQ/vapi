import React from "react";
import Brand from "./Brand";
import { useWebSocket } from "./WebSocket";

function DemoShowNumber({ setShowComponent }) {
    const { number } = useWebSocket();
    return (
        <div className="demoshownumber">
            <Brand />
            <div className="ry_card_sign-in-style1">
                <div className="shownumberdiv">
                    <div className="form-p-div mb-10">
                        <h4 className="demo-form-header text-center">Here's the number you can call</h4>
                    </div>
                    <div className="phone-number-div">
                        <div>{number ? number : ""}</div>
                    </div>
                </div>
                <div className="popup_close_btn" onClick={() => setShowComponent("details")}>
                    <img loading="lazy" src="https://uploads-ssl.webflow.com/6543c54836a31a4e01c8588b/6543c7986f7079fd1d4c9f9e_close.svg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default DemoShowNumber;
