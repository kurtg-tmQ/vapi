"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Dropdown.module.css";
const DROPDOWN_OPTIONS = [
    {
        label: "Link 1",
        value: "#"
    },
    {
        label: "Link 2",
        value: "#"
    },
    {
        label: "Link 3",
        value: "#"
    }
];
// eslint-disable-next-line func-style
export function Dropdown({ as: _Component = _Builtin.Block, options }) {
    const clickHandler = (data = "") => {
        console.log("clicked", data);
    };
    return (
        <_Component tag="div">
            <_Builtin.DropdownWrapper className={_utils.cx(_styles, "dropdown")} tag="div" delay={0} hover={false}>
                <_Builtin.DropdownToggle className={_utils.cx(_styles, "dropdown-toggle-2")} tag="div">
                    <_Builtin.Block tag="div">{"Collapse Conversation Timeline"}</_Builtin.Block>
                    <_Builtin.Icon
                        className={_utils.cx(_styles, "icon")}
                        widget={{
                            type: "icon",
                            icon: "dropdown-toggle"
                        }}
                    />
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList tag="nav">
                    {DROPDOWN_OPTIONS.map((option, index) => (
                        <_Builtin.DropdownLink
                            key={index}
                            onClick={() => clickHandler(option.label)}
                            options={{
                                href: option.value
                            }}
                        >
                            {option.label}
                        </_Builtin.DropdownLink>
                    ))}
                </_Builtin.DropdownList>
            </_Builtin.DropdownWrapper>
        </_Component>
    );
}
