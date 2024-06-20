"use client";
import React, { useState } from "react";
import * as _Builtin from "./_Builtin";
import { SidebarNav } from "./SidebarNav";
import { TopNavControls } from "./TopNavControls";
import { FilterInsight } from "./FilterInsight";
import { SearchBar } from "./SearchBar";
import { TopicConversation } from "./TopicConversation";
import { ColumnConversations } from "./ColumnConversations";
import * as _utils from "./utils";
import _styles from "./PageTopicConversation.module.css";

// eslint-disable-next-line func-style
export function PageTopicConversation({ as: _Component = _Builtin.Block }) {
    const [toggleSearch, setToggleSearch] = useState(false);

    const handleFilter = (buttonName) => {
        console.log("clicked", buttonName);
        if (buttonName === "Search") {
            setToggleSearch(true);
        } else {
            setToggleSearch(false);
        }
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
                <_Builtin.Block className={_utils.cx(_styles, "main-page-container", "auto")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "main-page-content-div")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "topic-page-top")} tag="div">
                            <FilterInsight clickHandler={handleFilter} />
                            <SearchBar open={toggleSearch} />
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "main-page-bot")} tag="div">
                            <TopicConversation />
                        </_Builtin.Block>
                    </_Builtin.Block>
                    <ColumnConversations />
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
