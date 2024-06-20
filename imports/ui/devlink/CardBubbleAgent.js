"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CardBubbleAgent.module.css";

// eslint-disable-next-line func-style
export function CardBubbleAgent({
    as: _Component = _Builtin.Block,
    chatTextAgent = "Thank you, Sam, Mind if I ask you questions to find out what will be the best solution for your household and help you get started?"
}) {
    return (
        <_Component className={_utils.cx(_styles, "card-bubble", "white")} tag="div">
            <_Builtin.Block tag="div">{chatTextAgent}</_Builtin.Block>
        </_Component>
    );
}
