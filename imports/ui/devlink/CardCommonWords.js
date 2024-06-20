"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CardCommonWords.module.css";

// eslint-disable-next-line func-style
export function CardCommonWords({ as: _Component = _Builtin.Block }) {
    return (
        <_Component className={_utils.cx(_styles, "common-words-list")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "div-block-64")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "label-common-words")} tag="div">
                    {"Visitor"}
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "div-block-65")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "common-words-date")} tag="div">
                        {"06/30/2023, 1:35 PM"}
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "btn-view")} tag="div">
                        <_Builtin.Block tag="div">{"VIEW"}</_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "icon-view")} tag="div">
                            <_Builtin.Image
                                loading="lazy"
                                width="auto"
                                height="auto"
                                alt=""
                                src="/images/Asset-94.svg"
                            />
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "common-words-content")} tag="div">
                <_Builtin.Paragraph>
                    {"Is that what you said? The first thing you said made in oh, mail voice mail. And what is that service called?"}
                </_Builtin.Paragraph>
            </_Builtin.Block>
        </_Component>
    );
}
