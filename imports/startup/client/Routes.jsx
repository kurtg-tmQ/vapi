import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import UnauthLayout from "../../ui/components/layout/UnauthLayout";
import AuthLayout from "../../ui/components/layout/AuthLayout";
import Navigation from "../../api/classes/client/Navigation";
// import NotFound from "../../ui/pages/NotFound";

export default class RoutesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedRoutes: Navigation.SignedRoutes,
            unsignedRoutes: Navigation.UnsignedRoutes
        };
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UnauthLayout />}>
                        {this.state.unsignedRoutes.map((r, i) => (
                            <Route key={i} path={r.path} element={r.component} />
                        ))}
                    </Route>
                    <Route path="/" element={<AuthLayout />}>
                        {this.state.signedRoutes.map((r, i) => (
                            <Route key={i} path={r.path} element={r.component} />
                        ))}
                    </Route>
                    <Route path="*" element={<div>NOT FOUND</div>} />
                </Routes>
            </BrowserRouter>
        );
    }
}
