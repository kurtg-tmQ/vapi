import React, { Component } from "react";
import Base from "./Base";
import { PageTopicDiscovery } from "../devlink";

class DiscoveryPage extends Component {
    render() {
        return (
            <Base>
                <PageTopicDiscovery />
            </Base>
        );
    }
}

export default DiscoveryPage;
