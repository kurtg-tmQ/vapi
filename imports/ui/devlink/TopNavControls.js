"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TopNavControls.module.css";

// eslint-disable-next-line func-style
export function TopNavControls({ as: _Component = _Builtin.Block }) {
    return (
        <_Component className={_utils.cx(_styles, "tophd-controls")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "icon-notification")} tag="div">
                <_Builtin.Image
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="/images/Asset-12.svg"
                />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "btn-profile")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "my-profile-button-content")}
                    button={false}
                    block="inline"
                    options={{
                        href: "#"
                    }}
                >
                    <_Builtin.Block className={_utils.cx(_styles, "avatar-profile")} tag="div">
                        <_Builtin.Image
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt=""
                            src="/images/Asset-14.svg"
                        />
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "profile-name")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "name-profile")} tag="div">
                            {"John Smith"}
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "position-profile")} tag="div">
                            {"Trainee"}
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Link>
                <_Builtin.Block className={_utils.cx(_styles, "btn-profile-dorpdown")} tag="div">
                    <_Builtin.Image
                        loading="lazy"
                        width="auto"
                        height="auto"
                        alt=""
                        src="/images/Asset-13.svg"
                    />
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
