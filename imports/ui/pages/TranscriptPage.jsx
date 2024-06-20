import React, { Component } from "react";
import Base from "./Base";
import { PageTranscript } from "../devlink/PageTranscript";

class TranscriptPage extends Component {
    render() {
        return (
            <Base>
                <PageTranscript />
            </Base>
        );
    }
}

export default TranscriptPage;
