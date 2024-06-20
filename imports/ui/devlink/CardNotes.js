"use client";
import React, { useRef } from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CardNotes.module.css";

// eslint-disable-next-line func-style
export function CardNotes({ as: _Component = _Builtin.Block }) {
    const text = useRef(null);
    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log("onChange result:", e.target.value);
        console.log("ref result:", text.current.value);
    };

    const onClickHandler = () => {
        console.log("submitted", text.current.value);
    };
    return (
        <_Component className={_utils.cx(_styles, "card-scorecard-sections")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "div-block-31")} tag="div">
                <_Builtin.Block tag="div">
                    <_Builtin.Block tag="div">{"General notes"}</_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "div-block-38")} tag="div">
                <_Builtin.FormTextarea
                    className={_utils.cx(_styles, "textarea")}
                    required={false}
                    autoFocus={false}
                    placeholder="Leave general notes about the conversation"
                    maxLength={5000}
                    name="field-2"
                    data-name="Field 2"
                    onChange={onChangeHandler}
                    ref={text}
                    id="field-2"
                />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "div-block-39")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "main")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    onClick={onClickHandler}
                >
                    {"Submit"}
                </_Builtin.Link>
            </_Builtin.Block>
        </_Component>
    );
}
