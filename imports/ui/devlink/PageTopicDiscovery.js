"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SidebarNav } from "./SidebarNav";
import { TopNavControls } from "./TopNavControls";
import { FilterInsight } from "./FilterInsight";
import { SearchBar } from "./SearchBar";
import { TopicList } from "./TopicList";
import { TopicMain } from "./TopicMain";
import { ColumnTopic } from "./ColumnTopic";
import * as _utils from "./utils";
import _styles from "./PageTopicDiscovery.module.css";

// eslint-disable-next-line func-style
export function PageTopicDiscovery({ as: _Component = _Builtin.Block }) {
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
                <_Builtin.Block className={_utils.cx(_styles, "main-page-container", "auto")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "main-page-content-div")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "topic-page-top")} tag="div">
                            <FilterInsight />
                            <SearchBar />
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "main-page-bot")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "topic-discovery-main-content")} tag="div">
                                <TopicList />
                                <TopicMain />
                            </_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                    <ColumnTopic />
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
