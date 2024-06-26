"use client";
import React, { useState } from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FilterInsight.module.css";

// eslint-disable-next-line func-style
export function FilterInsight({ as: _Component = _Builtin.Block, clickHandler }) {
    const [activeButton, setActiveButton] = useState("");

    const onClickHandler = (buttonName) => {
        clickHandler(buttonName);
        setActiveButton(buttonName);
    };

    return (
        <_Component className={_utils.cx(_styles, "filter-nav-topic")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "gray")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Filters" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Filters")}
                >
                    {"+ Filters"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "users")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Search" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Search")}
                >
                    {"Search users or team"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "calendar")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Calender" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Calender")}
                >
                    {"Jan 1 - Jun 30"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "time")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Duration" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Duration")}
                >
                    {"Duration: All"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "gray")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Sentiment" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Sentiment")}
                >
                    {"Sentiment: All"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "gray")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Conversation" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Conversation")}
                >
                    {"Conversation: All"}
                </_Builtin.Link>
            </_Builtin.Block>
        </_Component>
    );
}
