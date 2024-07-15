import React, { useState, useEffect } from "react";
import Brand from "./Brand";
import { useWebSocket } from "./WebSocket";
function DemoCountdown({ setShowComponent }) {
    let { progress, isComplete, setIsComplete } = useWebSocket();
    const [countdown, setCountdown] = useState(10);


    useEffect(() => {
        if (isComplete) {
            setIsComplete(false);
            setShowComponent("showNumber")
        }
    }, [isComplete]);

    return (
        <div className="democountdown">
            <Brand />
            <div className="ry_card_sign-in-style1">
                <div className="countdowndiv">
                    <div id="countdown" className="demo-countdown-text">
                        {progress ? progress : ""}
                    </div>
                    <div className="demo-countdown-waitingtext">Preparing your demo, please wait...</div>
                </div>
            </div>
        </div>
    );
}

export default DemoCountdown;
