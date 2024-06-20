"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./BtnBack.module.css";

// eslint-disable-next-line func-style
export function BtnBack({ as: _Component = _Builtin.Link }) {
    return (
        <_Component
            className={_utils.cx(_styles, "btn-return")}
            button={false}
            block="inline"
            options={{
                href: "#"
            }}
        >
            <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="/images/Asset-102.svg"
            />
        </_Component>
    );
}
