"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CustomerName.module.css";

// eslint-disable-next-line func-style
export function CustomerName({
    as: _Component = _Builtin.Block,
    textCustomerName = "Elan Dahle",
    textCustomerLatestTime = "6:33 AM - 7:03 AM",
    textCustomerNumber = "#34056"
}) {
    const onClickHandler = (data) => {
        console.log("clicked", data);
    };

    return (
        <_Component className={_utils.cx(_styles, "transcript-page-top")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "name-transcript")} tag="div">
                {textCustomerName}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "chat-details")} tag="div">
                <_Builtin.Block tag="div">{textCustomerLatestTime}</_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "circle-divider")} tag="div" />
                <_Builtin.Block tag="div">{textCustomerNumber}</_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "circle-divider")} tag="div" />
                <_Builtin.Block tag="div">
                    <_Builtin.Link
                        button={false}
                        block=""
                        options={{
                            href: "#"
                        }}
                        onClick={() => onClickHandler("Copy Transcript")}
                    >
                        {"Copy Transcript"}
                    </_Builtin.Link>
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
