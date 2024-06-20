import React, { Component } from "react";
import Base from "./Base";
import { PageTopicConversation } from "../devlink/PageTopicConversation";

class ConversationPage extends Component {
    render() {
        return (
            <Base>
                <PageTopicConversation />
            </Base>
        );
    }
}

export default ConversationPage;
