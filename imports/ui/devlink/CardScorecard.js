"use client";
import React, { useRef } from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CardScorecard.module.css";

const SELECT_OPTIONS = [
    {
        v: "2/2 (60%)",
        t: "2/2 (60%)"
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

const PIPELINE_SELECT_OPTIONS = [
    {
        t: "Yes - Agent got it",
        v: "Yes - Agent got it"
    },
    {
        t: "First choice",
        v: "First"
    },
    {
        t: "Second choice",
        v: "Second"
    },
    {
        t: "Third choice",
        v: "Third"
    }
];

const GRAMMAR_SELECT_OPTIONS = [
    {
        t: "Connect: Grammar & Punctuation",
        v: "Connect: Grammar & Punctuation"
    },
    {
        t: "First choice",
        v: "First"
    },
    {
        t: "Second choice",
        v: "Second"
    },
    {
        t: "Third choice",
        v: "Third"
    }
];

// eslint-disable-next-line func-style
export function CardScorecard({ as: _Component = _Builtin.Block }) {
    const choice = useRef(null);

    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log("onChange result:", e.target.value);
        console.log("ref result:", choice.current.value);
    };

    const onClickHandler = (data) => {
        console.log("clicked", data);
    };
    return (
        <_Component className={_utils.cx(_styles, "card-scorecard-sections")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "div-block-31")} tag="div">
                <_Builtin.Block tag="div">
                    <_Builtin.Block tag="div">{"Opening chapter"}</_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                    <_Builtin.FormSelect
                        className={_utils.cx(_styles, "select-field-transparent")}
                        name="2-2-60"
                        data-name="2/2 (60%)"
                        required={false}
                        multiple={false}
                        id="2-2"
                        onChange={onChangeHandler}
                        ref={choice}
                        options={SELECT_OPTIONS}
                    />
                </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "scorecard-white")} tag="div">
                <_Builtin.Block tag="div">{"Pipeline and next steps?"}</_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "select-field-div")} tag="div">
                    <_Builtin.FormSelect
                        className={_utils.cx(_styles, "select-field")}
                        name="Yes---Agent-got-it-3"
                        data-name="Yes Agent Got It 3"
                        required={false}
                        multiple={false}
                        id="Yes---Agent-got-it-3"
                        onChange={onChangeHandler}
                        ref={choice}
                        options={PIPELINE_SELECT_OPTIONS}
                    />
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "scorecard-row-link")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "icon-arrow")} tag="div">
                        <_Builtin.Image
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt=""
                            src="/images/Asset-70.svg"
                        />
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "div-block-34")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "icon--autoscored")} tag="div">
                            <_Builtin.Image
                                loading="lazy"
                                width="auto"
                                height="auto"
                                alt=""
                                src="/images/Asset-71.svg"
                            />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">{"Auto Score"}</_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "scorecard-white")} tag="div">
                <_Builtin.Block tag="div">{"Understood the driving factors causing them to make a change?"}</_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "select-field-div")} tag="div">
                    <_Builtin.FormSelect
                        className={_utils.cx(_styles, "select-field")}
                        name="Yes---Agent-got-it-2"
                        data-name="Yes Agent Got It 2"
                        required={false}
                        multiple={false}
                        id="Yes---Agent-got-it-2"
                        onChange={onChangeHandler}
                        ref={choice}
                        options={GRAMMAR_SELECT_OPTIONS}
                    />
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "scorecard-row-link")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "icon-arrow")} tag="div">
                        <_Builtin.Image
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt=""
                            src="/images/Asset-70.svg"
                        />
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "div-block-34")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "icon--autoscored")} tag="div">
                            <_Builtin.Image
                                loading="lazy"
                                width="auto"
                                height="auto"
                                alt=""
                                src="/images/Asset-71.svg"
                            />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">{"Auto Score"}</_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "scorecard-white", "transparent")} tag="div">
                <_Builtin.Block tag="div">{"Discover: Attempts Saves Offer w/ Saves Tools?"}</_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "scorecard-row")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "options-row")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "options-div")} tag="div" onClick={() => onClickHandler("N/A")}>
                            <_Builtin.Block tag="div">{"N/A"}</_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "options-div", "lined")} tag="div" onClick={() => onClickHandler("Got it")}>
                            <_Builtin.Block tag="div">{"Got it"}</_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "options-div")} tag="div" onClick={() => onClickHandler("Missed it")}>
                            <_Builtin.Block tag="div">{"Missed it"}</_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "scorecard-row-link")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "icon-arrow")} tag="div">
                        <_Builtin.Image
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt=""
                            src="/images/Asset-70.svg"
                        />
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "div-block-34")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "icon--autoscored")} tag="div">
                            <_Builtin.Image
                                loading="lazy"
                                width="auto"
                                height="auto"
                                alt=""
                                src="/images/Asset-71.svg"
                            />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">{"Auto Score"}</_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
