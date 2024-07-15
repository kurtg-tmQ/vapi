import React, { useState } from "react";
import DemoDetails from "../components/DemoDetails";
import DemoCountdown from "../components/DemoCountdown";
import DemoShowNumber from "../components/DemoShowNumber";
import "./css/normalize.css";
import "./css/webflow.css";
import "./css/v3-category-dashboard-christine.webflow.css";
import "./App.css";

function App() {
    const [showComponent, setShowComponent] = useState("details");
    const [animationClass, setAnimationClass] = useState("grow");

    const handleComponentChange = (newComponent) => {
        setAnimationClass("shrink");

        setTimeout(() => {
            setShowComponent(newComponent);
            setAnimationClass("grow");
        }, 150);
    };

    return (
        <div className="ry_app-main-wrapper-style1">
            <div className={`ry_card_sign-in-style1_container align-center ${animationClass}`}>
                {showComponent === "details" && <DemoDetails setShowComponent={handleComponentChange} />}
                {showComponent === "countdown" && <DemoCountdown setShowComponent={handleComponentChange} />}
                {showComponent === "showNumber" && <DemoShowNumber setShowComponent={handleComponentChange} />}
            </div>
        </div>
    );
}

export default App;
