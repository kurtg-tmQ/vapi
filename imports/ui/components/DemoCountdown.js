import React, { useState, useEffect } from "react";
import Brand from "./Brand";

function DemoCountdown({ setShowComponent }) {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setShowComponent("showNumber");
        }
    }, [countdown, setShowComponent]);

    return (
        <div className="democountdown">
            <Brand />
            <div className="ry_card_sign-in-style1">
                <div className="countdowndiv">
                    <div id="countdown" className="demo-countdown-text">
                        {countdown}
                    </div>
                    <div className="demo-countdown-waitingtext">Preparing your demo, please wait...</div>
                </div>
            </div>
        </div>
    );
}

export default DemoCountdown;
