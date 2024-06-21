import React, { Component } from "react";
import Client from "../../api/classes/client/Client";
export default class Login extends Component {
    #email;
    #password;
    constructor(props) {
        super(props);
        Client.setWatcher(this, "login");
    }
    async handleSubmit() {
        return Client.login(this.#email.value.trim(), this.#password.value.trim(), (err) => {
            if (err) {
                console.log("Error logging in", err);
                return;
            }
            window.location.reload();
        });
    }
    render() {
        Client.initiateWatch("login");
        return (
            <div className="login-wrapper">
                <div className="ry_card_sign-in-style1_container">
                    <div className="branddiv">
                        <div className="brand-_w-100">
                            <div className="logo-_w-50">
                                <img src="/images/smartyagents_icon.svg" loading="lazy" alt="" />
                            </div>
                            <div className="app-name">
                                <img src="/images/smartyagents_logo.svg" loading="lazy" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="ry_card_sign-in-style1">
                        <div className="form-block w-form">
                            <form
                                id="email-form"
                                name="email-form"
                                method="get"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    this.handleSubmit();
                                }}
                                aria-label="Email Form"
                            >
                                <div className="ry_sign-in-header">
                                    <h3 className="ry_h1-display1">Login</h3>
                                    <p className="ry_sign-in-p-style1">Enter your credential to access your account</p>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="" className="ry_field-label-style1">
                                        Email
                                    </label>
                                    <div className="form-control">
                                        <input
                                            className="ry_text-field-style1 w-input"
                                            maxLength={256}
                                            name="name-2"
                                            data-name="Name 2"
                                            placeholder="Email Address"
                                            ref={(ref) => (this.#email = ref)}
                                            type="text"
                                            id="name-2"
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <label htmlFor="" className="ry_field-label-style1">
                                        Password
                                    </label>
                                    <div className="form-control">
                                        <input
                                            className="ry_text-field-style1 w-input"
                                            maxLength={256}
                                            name="name-2"
                                            data-name="Name 2"
                                            placeholder="Password"
                                            ref={(ref) => (this.#password = ref)}
                                            type="password"
                                            id="name-2"
                                        />
                                    </div>
                                </div>
                                <div className="div-block">
                                    <a href="#" className="ry_link-style1">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="ry_btn-container">
                                    <button type="submit" className="ry_btn-style1 _w-100 w-button">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                            <div className="w-form-done" tabIndex={-1} role="region" aria-label="Email Form success">
                                <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="w-form-fail" tabIndex={-1} role="region" aria-label="Email Form failure">
                                <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                        </div>
                    </div>
                    <div className="div-block-2">
                        <p className="ry_sign-in-p-style1">
                            Don&apos;t have an account yet?{" "}
                            <a href="#" className="ry_span-link-style1">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
