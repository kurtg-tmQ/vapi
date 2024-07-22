import React, { useState } from "react";
import Brand from "./Brand";
import { useWebSocket } from "./WebSocket";

function DemoDetails({ setShowComponent }) {
    const { progress, sendRequest } = useWebSocket();
    const [formData, setFormData] = useState({
        name: "",
        companyName: "",
        websiteAddress: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields have input
        if (formData.name && formData.companyName && formData.websiteAddress) {
            console.log("Form Data:", formData);
            sendRequest(formData.websiteAddress);
            setShowComponent("countdown");
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <div className="demodetails">
            <Brand />
            <div className="ry_card_sign-in-style1">
                <div className="form-block w-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="ry_sign-in-header align-left">
                                <h3 className="ry_h1-display1">To see your demo</h3>
                                <p className="ry_sign-in-p-style1">Enter the following details to get your demo</p>
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="ry_field-label-style1">
                                    Name
                                </label>
                                <div className="form-control">
                                    <input
                                        className="ry_text-field-style2 w-input"
                                        maxLength={256}
                                        name="name-2"
                                        data-name="Name 2"
                                        placeholder="Name"
                                        type="text"
                                        required
                                        id="name-2"
                                        defaultValue={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="ry_field-label-style1">
                                    Company Name
                                </label>
                                <div className="form-control">
                                    <input
                                        className="ry_text-field-style2 w-input"
                                        maxLength={256}
                                        name="name-2"
                                        data-name="Name 2"
                                        placeholder="Company Name"
                                        type="text"
                                        required
                                        id="name-2"
                                        defaultValue={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <label htmlFor="" className="ry_field-label-style1">
                                    Website Address
                                </label>
                                <div className="form-control">
                                    <input
                                        className="ry_text-field-style2 w-input"
                                        maxLength={256}
                                        name="name-2"
                                        data-name="Name 2"
                                        placeholder="Website Address"
                                        type="text"
                                        required
                                        id="name-2"
                                        defaultValue={formData.websiteAddress}
                                        onChange={(e) => setFormData({ ...formData, websiteAddress: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="ry_btn-container">
                                <button type="submit" id="countdownStart" className="ry_btn-style2 _w-100 w-button">
                                    Get your demo
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DemoDetails;
