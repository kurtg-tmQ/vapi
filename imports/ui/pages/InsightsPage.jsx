import React, { Component } from "react";
import Base from "./Base";
import { PageTopicInsight } from "../devlink/PageTopicInsight";

class InsightsPage extends Component {
    render() {
        return (
            <Base>
                <PageTopicInsight />
            </Base>
        );
    }
}

export default InsightsPage;
