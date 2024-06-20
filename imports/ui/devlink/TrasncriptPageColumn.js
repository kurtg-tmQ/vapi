"use client";
import React, { useRef, useState } from "react";
import * as _Builtin from "./_Builtin";
import { CardScorecard } from "./CardScorecard";
import { CardNotes } from "./CardNotes";
import * as _utils from "./utils";
import _styles from "./TrasncriptPageColumn.module.css";

const SELECT_OPTIONS = [
    {
        v: "Automatisation Sales Accelerator 2022 ",
        t: "Automatisation Sales Accelerator 2022 "
    },
    {
        v: "First",
        t: "First choice"
    },
    {
        v: "Second",
        t: "Second choice"
    },
    {
        v: "Third",
        t: "Third choice"
    }
];

// eslint-disable-next-line func-style
export function TrasncriptPageColumn({ as: _Component = _Builtin.Block }) {
    const choice = useRef(null);
    const [totalScore, setTotalScore] = useState(100);

    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log("onChange result:", e.target.value);
        console.log("ref result:", choice.current.value);
    };

    const onClickHandler = (data) => {
        console.log("clicked", data);
    };

    return (
        <_Component className={_utils.cx(_styles, "transcript-page-column")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "transcript-page-column-container")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "scorecard-column-hd")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "column-hd")} tag="div">
                        {"Scorecard"}
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "label-icon")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "icon--autoscored")} tag="div">
                            <_Builtin.Image
                                loading="lazy"
                                width="auto"
                                height="auto"
                                alt=""
                                src="/images/Asset-68.svg"
                            />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">{"Auto-scored"}</_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "scorecard-content")} tag="div">
                    <_Builtin.FormWrapper>
                        <_Builtin.FormForm name="email-form" data-name="Email Form" method="get" id="email-form">
                            <_Builtin.Block tag="div">
                                <_Builtin.FormSelect
                                    className={_utils.cx(_styles, "select-field")}
                                    name="field-3"
                                    data-name="Field 3"
                                    required={false}
                                    multiple={false}
                                    id="field-3"
                                    onChange={onChangeHandler}
                                    ref={choice}
                                    options={SELECT_OPTIONS}
                                />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-info")} tag="div">
                                <_Builtin.Block tag="div">{`Overall score: ${totalScore}%`}</_Builtin.Block>
                                <_Builtin.Block tag="div">
                                    <_Builtin.Link
                                        className={_utils.cx(_styles, "btn")}
                                        button={true}
                                        block=""
                                        options={{
                                            href: "#"
                                        }}
                                        onClick={() => onClickHandler("Collapse all chapters")}
                                    >
                                        {"Collapse all chapters"}
                                    </_Builtin.Link>
                                </_Builtin.Block>
                            </_Builtin.Block>
                            <CardScorecard />
                            <CardNotes />
                        </_Builtin.FormForm>
                        <_Builtin.FormSuccessMessage>
                            <_Builtin.Block tag="div">{"Thank you! Your submission has been received!"}</_Builtin.Block>
                        </_Builtin.FormSuccessMessage>
                        <_Builtin.FormErrorMessage>
                            <_Builtin.Block tag="div">{"Oops! Something went wrong while submitting the form."}</_Builtin.Block>
                        </_Builtin.FormErrorMessage>
                    </_Builtin.FormWrapper>
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
