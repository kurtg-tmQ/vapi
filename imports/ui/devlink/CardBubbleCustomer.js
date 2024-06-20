"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CardBubbleCustomer.module.css";

// eslint-disable-next-line func-style
export function CardBubbleCustomer({
    as: _Component = _Builtin.Block,
    chatTextCustomer = "Hi. This is Sam, and I saw that you offer an iPhone upgrade program, and I wanted to see if I qualify for it."
}) {
    return (
        <_Component className={_utils.cx(_styles, "card-bubble")} tag="div">
            <_Builtin.Block tag="div">{chatTextCustomer}</_Builtin.Block>
        </_Component>
    );
}
