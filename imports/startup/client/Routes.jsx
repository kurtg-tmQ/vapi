import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Component } from "react";
import UnauthLayout from "../../ui/components/layout/UnauthLayout";
import Navigation from "../../api/classes/client/Navigation";

export default class RoutesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    <Route path="*" element={<div>Not found</div>} />
                </Routes>
            </BrowserRouter>
        );
    }
}
