"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Waveform.module.css";

// eslint-disable-next-line func-style
export function Waveform({ as: _Component = _Builtin.Block }) {
    return (
        <_Component className={_utils.cx(_styles, "waveform-div")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "trasncript-people-label")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "waveform-label-div")} tag="div">
                    <_Builtin.Block tag="div">{"Agent"}</_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "waveform-label-div")} tag="div">
                    <_Builtin.Block tag="div">{"Customer"}</_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "trasncript-wave-div")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "trasncript-percentage-indicator")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "trasncript-percentage")} tag="div">
                        <_Builtin.Block tag="div">{"64%"}</_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "trasncript-percentage")} tag="div">
                        <_Builtin.Block tag="div">{"36%"}</_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "waveform-container")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "agent-waveform")} tag="div" id="waveform1" />
                    <_Builtin.Block className={_utils.cx(_styles, "customer-waveform")} tag="div" id="waveform2" />
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "trasncript-divider")} tag="div" />
            </_Builtin.Block>
        </_Component>
    );
}
