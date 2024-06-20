"use client";
import React, { useState } from "react";
import * as _Builtin from "./_Builtin";
import { SidebarNav } from "./SidebarNav";
import { TopNavControls } from "./TopNavControls";
import { BtnBack } from "./BtnBack";
import { FilterInsight } from "./FilterInsight";
import { SearchBar } from "./SearchBar";
import { CardInsight } from "./CardInsight";
import * as _utils from "./utils";
import _styles from "./PageTopicInsight.module.css";

// eslint-disable-next-line func-style
export function PageTopicInsight({ as: _Component = _Builtin.Block }) {
    
    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleGraph, setToggleGraph] = useState("Pie");

    const handleFilter = (buttonName) => {
        console.log("clicked", buttonName);
        if (buttonName === "Search") {
            setToggleSearch(true);
        } else {
            setToggleSearch(false);
        }
    };

    const handleGraphFilter = (type) => {
        setToggleGraph(type);
    };

    return (
        <_Component className={_utils.cx(_styles, "page-wrapper")} tag="div">
            <SidebarNav />
            <_Builtin.Block className={_utils.cx(_styles, "main-content")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "page-top-nav")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "tophd-page-name")} tag="div">
                        <_Builtin.Block tag="div">{"Topic Discovery"}</_Builtin.Block>
                    </_Builtin.Block>
                    <TopNavControls />
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "main-page-container", "insights")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "main-page-content-div", "insights")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "topic-page-top")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "div-block-66")} tag="div">
                                <BtnBack />
                                <_Builtin.Heading className={_utils.cx(_styles, "text-topic-title")} tag="h1">
                                    {"Insights: Fly Wireless iPhone offer"}
                                </_Builtin.Heading>
                            </_Builtin.Block>
                            <FilterInsight clickHandler={handleFilter} />
                            <SearchBar open={toggleSearch} />
                            <_Builtin.Block className={_utils.cx(_styles, "topic-convo-section")} tag="div">
                                <_Builtin.Block className={_utils.cx(_styles, "div-block-69")} tag="div">
                                    <_Builtin.Block className={_utils.cx(_styles, "text-convo-label")} tag="div">
                                        {"Conversations"}
                                    </_Builtin.Block>
                                    <_Builtin.Block className={_utils.cx(_styles, "convodetails")} tag="div">
                                        <_Builtin.Block className={_utils.cx(_styles, "convo-count")} tag="div">
                                            <_Builtin.Block tag="div">{"27,244"}</_Builtin.Block>
                                        </_Builtin.Block>
                                        <_Builtin.Block className={_utils.cx(_styles, "convo-info")} tag="div">
                                            <_Builtin.Block tag="div">
                                                <_Builtin.Strong>{"17.4%"}</_Builtin.Strong>
                                                {" of all convo"}
                                            </_Builtin.Block>
                                        </_Builtin.Block>
                                    </_Builtin.Block>
                                    <_Builtin.Block tag="div">
                                        <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-104.svg" />
                                    </_Builtin.Block>
                                </_Builtin.Block>
                                <_Builtin.Block className={_utils.cx(_styles, "div-block-70")} tag="div">
                                    <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-103.svg" />
                                </_Builtin.Block>
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "main-page-bot")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "topic-discovery-main-content")} tag="div">
                                <_Builtin.Block className={_utils.cx(_styles, "topic-main-container", "topic-select")} tag="div">
                                    <_Builtin.Block className={_utils.cx(_styles, "insights-controls")} tag="div">
                                        <_Builtin.Block
                                            className={_utils.cx(_styles, "graph-btn")}
                                            tag="div"
                                            onClick={() => handleGraphFilter("Pie")}
                                            style={{
                                                backgroundColor: toggleGraph === "Pie" ? "#e1dafc" : "#ddd",
                                                color: toggleGraph === "Pie" ? "#957df3" : "rgba(97, 97, 97, 0.63)"
                                            }}
                                        >
                                            <_Builtin.Block className={_utils.cx(_styles, "icon-graph-btn")} tag="div">
                                                <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-107.svg" />
                                            </_Builtin.Block>
                                            <_Builtin.Block tag="div">{"Pie"}</_Builtin.Block>
                                        </_Builtin.Block>
                                        <_Builtin.Block
                                            className={_utils.cx(_styles, "graph-btn", "trends")}
                                            tag="div"
                                            onClick={() => handleGraphFilter("Bar")}
                                            style={{
                                                backgroundColor: toggleGraph === "Bar" ? "#e1dafc" : "#ddd",
                                                color: toggleGraph === "Bar" ? "#957df3" : "rgba(97, 97, 97, 0.63)"
                                            }}
                                        >
                                            <_Builtin.Block className={_utils.cx(_styles, "icon-graph-btn")} tag="div">
                                                <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-108.svg" />
                                            </_Builtin.Block>
                                            <_Builtin.Block tag="div">{"Trends"}</_Builtin.Block>
                                        </_Builtin.Block>
                                    </_Builtin.Block>
                                    <_Builtin.Block className={_utils.cx(_styles, "insights-row")} tag="div">
                                        <CardInsight />
                                        <CardInsight />
                                    </_Builtin.Block>
                                </_Builtin.Block>
                            </_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
