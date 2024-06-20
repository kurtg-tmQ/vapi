"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AgentChatDetails.module.css";

// eslint-disable-next-line func-style
export function AgentChatDetails({ as: _Component = _Builtin.Block, chatTimeAgent = "05:42:55 PM" }) {
    return (
        <_Component className={_utils.cx(_styles, "chat-details")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "chat-time", "last")} tag="div">
                {chatTimeAgent}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "circle-divider")} tag="div" />
            <_Builtin.Block className={_utils.cx(_styles, "dropdown-suggestion", "first")} tag="div">
                <_Builtin.DropdownWrapper className={_utils.cx(_styles, "dropdown-suggestion-div")} tag="div" delay={0} hover={false}>
                    <_Builtin.DropdownToggle className={_utils.cx(_styles, "dropdown-suggestion-toggle")} tag="div">
                        <_Builtin.Block tag="div">{"Show suggestions"}</_Builtin.Block>
                        <_Builtin.Icon
                            className={_utils.cx(_styles, "icon-3")}
                            widget={{
                                type: "icon",
                                icon: "dropdown-toggle"
                            }}
                        />
                    </_Builtin.DropdownToggle>
                    <_Builtin.DropdownList tag="nav">
                        <_Builtin.DropdownLink
                            options={{
                                href: "#"
                            }}
                        >
                            {"Link 1"}
                        </_Builtin.DropdownLink>
                        <_Builtin.DropdownLink
                            options={{
                                href: "#"
                            }}
                        >
                            {"Link 2"}
                        </_Builtin.DropdownLink>
                        <_Builtin.DropdownLink
                            options={{
                                href: "#"
                            }}
                        >
                            {"Link 3"}
                        </_Builtin.DropdownLink>
                    </_Builtin.DropdownList>
                </_Builtin.DropdownWrapper>
            </_Builtin.Block>
        </_Component>
    );
}
