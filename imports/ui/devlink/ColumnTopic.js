"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ColumnTopic.module.css";

const _interactionsData = JSON.parse(
    '{"events":{"e-225":{"id":"e-225","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-23","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-226"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e4f23924-08b3-35b7-7780-a9a35eb013ee","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e4f23924-08b3-35b7-7780-a9a35eb013ee","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718380370186},"e-227":{"id":"e-227","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-24","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-228"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"16ee6a09-868f-7eec-1d5e-bcfdb6f2a8ef","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"16ee6a09-868f-7eec-1d5e-bcfdb6f2a8ef","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718384688888},"e-229":{"id":"e-229","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-230"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d5bd0e86-bafb-b4f6-5027-280a6058300e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d5bd0e86-bafb-b4f6-5027-280a6058300e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718384718753},"e-231":{"id":"e-231","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-232"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b034caf1-745b-f1f4-52ce-c738a21ac809","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b034caf1-745b-f1f4-52ce-c738a21ac809","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718384825269},"e-233":{"id":"e-233","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-234"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"25181cfa-0032-558a-f115-f94669d851ee","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"25181cfa-0032-558a-f115-f94669d851ee","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718384851609}},"actionLists":{"a-23":{"id":"a-23","title":"[close] topic discovery column","actionItemGroups":[{"actionItems":[{"id":"a-23-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".topic-page-column-div","selectorGuids":["b5a6f072-ff94-d963-3927-24c971ffb1fa"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718380373476},"a-24":{"id":"a-24","title":"[open] topic discovery column 2","actionItemGroups":[{"actionItems":[{"id":"a-24-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".topic-page-column-div","selectorGuids":["b5a6f072-ff94-d963-3927-24c971ffb1fa"]},"value":"block"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718380373476},"a-25":{"id":"a-25","title":"[open] topic discovery column 3","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".topic-page-column-div","selectorGuids":["b5a6f072-ff94-d963-3927-24c971ffb1fa"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718380373476},"a-26":{"id":"a-26","title":"[close] convo","actionItemGroups":[{"actionItems":[{"id":"a-26-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".topic-page-column-div.conversation","selectorGuids":["b5a6f072-ff94-d963-3927-24c971ffb1fa","4dabd16d-ec70-13fe-2da9-4269025137e6"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718384827813},"a-28":{"id":"a-28","title":"[open] convo column","actionItemGroups":[{"actionItems":[{"id":"a-28-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".topic-page-column-div.conversation","selectorGuids":["b5a6f072-ff94-d963-3927-24c971ffb1fa","4dabd16d-ec70-13fe-2da9-4269025137e6"]},"value":"block"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718384857653}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

// eslint-disable-next-line func-style
export function ColumnTopic({ as: _Component = _Builtin.Block }) {
    _interactions.useInteractions(_interactionsData, _styles);

    return (
        <_Component className={_utils.cx(_styles, "topic-page-column-div")} tag="div" id="topic-column">
            <_Builtin.Block className={_utils.cx(_styles, "topic-page-column")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "topic-popup")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "scorecard-column-hd")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "column-hd")} tag="div">
                            {"phone connectivity issues"}
                        </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "scorecard-content")} tag="div">
                        <_Builtin.FormWrapper>
                            <_Builtin.FormForm name="email-form" data-name="Email Form" method="get" id="email-form">
                                <_Builtin.Block className={_utils.cx(_styles, "div-block-58")} tag="div">
                                    <_Builtin.Block className={_utils.cx(_styles, "btn-col-div")} tag="div">
                                        <_Builtin.Link
                                            className={_utils.cx(_styles, "btn", "add-existing")}
                                            button={true}
                                            block=""
                                            options={{
                                                href: "#"
                                            }}
                                        >
                                            {"To existing visitor question"}
                                        </_Builtin.Link>
                                    </_Builtin.Block>
                                    <_Builtin.Block className={_utils.cx(_styles, "btn-col-div", "last")} tag="div">
                                        <_Builtin.Link
                                            className={_utils.cx(_styles, "btn", "add-existing")}
                                            button={true}
                                            block=""
                                            options={{
                                                href: "#"
                                            }}
                                        >
                                            {"Create new visitor question"}
                                        </_Builtin.Link>
                                    </_Builtin.Block>
                                </_Builtin.Block>
                                <_Builtin.Block className={_utils.cx(_styles, "text-info", "align-left")} tag="div">
                                    <_Builtin.Block className={_utils.cx(_styles, "text-info-col")} tag="div">
                                        <_Builtin.Block tag="div">
                                            <_Builtin.Strong>{"231"}</_Builtin.Strong>
                                            {" conversations"}
                                        </_Builtin.Block>
                                    </_Builtin.Block>
                                    <_Builtin.Block tag="div">
                                        <_Builtin.Block tag="div">
                                            <_Builtin.Strong>{"2.09%"}</_Builtin.Strong>
                                            {" off all conversation"}
                                        </_Builtin.Block>
                                    </_Builtin.Block>
                                </_Builtin.Block>
                                <_Builtin.Block className={_utils.cx(_styles, "topic-chart")} tag="div">
                                    <_Builtin.Image
                                        loading="lazy"
                                        width="auto"
                                        height="auto"
                                        alt=""
                                        src="/images/Asset-90.svg"
                                    />
                                </_Builtin.Block>
                                <_Builtin.Block className={_utils.cx(_styles, "card-scorecard-sections")} tag="div">
                                    <_Builtin.Block className={_utils.cx(_styles, "scorecard-white", "flex")} tag="div">
                                        <_Builtin.Block className={_utils.cx(_styles, "topic-card-label")} tag="div">
                                            <_Builtin.Block tag="div">{"Sentiment"}</_Builtin.Block>
                                        </_Builtin.Block>
                                        <_Builtin.Block className={_utils.cx(_styles, "topic-chart-content")} tag="div">
                                            <_Builtin.Block className={_utils.cx(_styles, "bar-horizontal")} tag="div">
                                                <_Builtin.Block className={_utils.cx(_styles, "bar-graph1")} tag="div" />
                                                <_Builtin.Block className={_utils.cx(_styles, "bar-graph2")} tag="div" />
                                                <_Builtin.Block className={_utils.cx(_styles, "bar-graph3")} tag="div" />
                                            </_Builtin.Block>
                                            <_Builtin.Block className={_utils.cx(_styles, "bar-horizontal-label")} tag="div">
                                                <_Builtin.Block className={_utils.cx(_styles, "bar-legend-col")} tag="div">
                                                    <_Builtin.Block className={_utils.cx(_styles, "legend1")} tag="div" />
                                                    <_Builtin.Block tag="div">
                                                        {"Negative: "}
                                                        <_Builtin.Strong>{"76"}</_Builtin.Strong>
                                                    </_Builtin.Block>
                                                </_Builtin.Block>
                                                <_Builtin.Block className={_utils.cx(_styles, "bar-legend-col")} tag="div">
                                                    <_Builtin.Block className={_utils.cx(_styles, "legend1", "green")} tag="div" />
                                                    <_Builtin.Block tag="div">
                                                        {"Positive: "}
                                                        <_Builtin.Strong>{"11"}</_Builtin.Strong>
                                                    </_Builtin.Block>
                                                </_Builtin.Block>
                                                <_Builtin.Block className={_utils.cx(_styles, "bar-legend-col")} tag="div">
                                                    <_Builtin.Block className={_utils.cx(_styles, "legend1", "gray")} tag="div" />
                                                    <_Builtin.Block tag="div">
                                                        {"Neutral: "}
                                                        <_Builtin.Strong>{"172"}</_Builtin.Strong>
                                                    </_Builtin.Block>
                                                </_Builtin.Block>
                                            </_Builtin.Block>
                                        </_Builtin.Block>
                                    </_Builtin.Block>
                                    <_Builtin.Block className={_utils.cx(_styles, "scorecard-white", "flex")} tag="div">
                                        <_Builtin.Block className={_utils.cx(_styles, "topic-card-label")} tag="div">
                                            <_Builtin.Block tag="div">{"Emotion"}</_Builtin.Block>
                                        </_Builtin.Block>
                                        <_Builtin.Block className={_utils.cx(_styles, "topic-chart-content")} tag="div">
                                            <_Builtin.Block className={_utils.cx(_styles, "topic-emotion-info")} tag="div">
                                                <_Builtin.Block tag="div">
                                                    <_Builtin.Strong>{"15"}</_Builtin.Strong>
                                                    {" emotion messages. Emotion distribution:"}
                                                </_Builtin.Block>
                                            </_Builtin.Block>
                                            <_Builtin.Block className={_utils.cx(_styles, "div-block-60")} tag="div">
                                                <_Builtin.Block className={_utils.cx(_styles, "row-emotion")} tag="div">
                                                    <_Builtin.Block className={_utils.cx(_styles, "icon-emotion")} tag="div">
                                                        <_Builtin.Image
                                                            loading="lazy"
                                                            width="auto"
                                                            height="auto"
                                                            alt=""
                                                            src="/images/Asset-97.svg"
                                                        />
                                                    </_Builtin.Block>
                                                    <_Builtin.Block className={_utils.cx(_styles, "label-emotion")} tag="div">
                                                        <_Builtin.Block tag="div">{"Confusion"}</_Builtin.Block>
                                                    </_Builtin.Block>
                                                    <_Builtin.Block className={_utils.cx(_styles, "emotion-graph", "confusion")} tag="div" />
                                                    <_Builtin.Block className={_utils.cx(_styles, "emotion-count")} tag="div">
                                                        {"6"}
                                                    </_Builtin.Block>
                                                </_Builtin.Block>
                                                <_Builtin.Block className={_utils.cx(_styles, "row-emotion")} tag="div">
                                                    <_Builtin.Block className={_utils.cx(_styles, "icon-emotion")} tag="div">
                                                        <_Builtin.Image
                                                            loading="lazy"
                                                            width="auto"
                                                            height="auto"
                                                            alt=""
                                                            src="/images/Asset-98.svg"
                                                        />
                                                    </_Builtin.Block>
                                                    <_Builtin.Block className={_utils.cx(_styles, "label-emotion")} tag="div">
                                                        <_Builtin.Block tag="div">{"Happiness"}</_Builtin.Block>
                                                    </_Builtin.Block>
                                                    <_Builtin.Block className={_utils.cx(_styles, "emotion-graph", "happiness")} tag="div" />
                                                    <_Builtin.Block className={_utils.cx(_styles, "emotion-count")} tag="div">
                                                        {"0"}
                                                    </_Builtin.Block>
                                                </_Builtin.Block>
                                                <_Builtin.Block className={_utils.cx(_styles, "row-emotion")} tag="div">
                                                    <_Builtin.Block className={_utils.cx(_styles, "icon-emotion")} tag="div">
                                                        <_Builtin.Image
                                                            loading="lazy"
                                                            width="auto"
                                                            height="auto"
                                                            alt=""
                                                            src="/images/Asset-99.svg"
                                                        />
                                                    </_Builtin.Block>
                                                    <_Builtin.Block className={_utils.cx(_styles, "label-emotion")} tag="div">
                                                        <_Builtin.Block tag="div">{"Sadness"}</_Builtin.Block>
                                                    </_Builtin.Block>
                                                    <_Builtin.Block className={_utils.cx(_styles, "emotion-graph", "sadness")} tag="div" />
                                                    <_Builtin.Block className={_utils.cx(_styles, "emotion-count")} tag="div">
                                                        {"5"}
                                                    </_Builtin.Block>
                                                </_Builtin.Block>
                                                <_Builtin.Block className={_utils.cx(_styles, "row-emotion")} tag="div">
                                                    <_Builtin.Block className={_utils.cx(_styles, "icon-emotion")} tag="div">
                                                        <_Builtin.Image
                                                            loading="lazy"
                                                            width="auto"
                                                            height="auto"
                                                            alt=""
                                                            src="/images/Asset-101.svg"
                                                        />
                                                    </_Builtin.Block>
                                                    <_Builtin.Block className={_utils.cx(_styles, "label-emotion")} tag="div">
                                                        <_Builtin.Block tag="div">{"Sadness"}</_Builtin.Block>
                                                    </_Builtin.Block>
                                                    <_Builtin.Block className={_utils.cx(_styles, "emotion-graph", "anger")} tag="div" />
                                                    <_Builtin.Block className={_utils.cx(_styles, "emotion-count")} tag="div">
                                                        {"4"}
                                                    </_Builtin.Block>
                                                </_Builtin.Block>
                                            </_Builtin.Block>
                                        </_Builtin.Block>
                                    </_Builtin.Block>
                                </_Builtin.Block>
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
                <_Builtin.Block className={_utils.cx(_styles, "common-words-section")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "common-words-top")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "column-hd", "smaller")} tag="div">
                            {"Common words"}
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "common-words-row")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "tag-common-words")} tag="div">
                                <_Builtin.Block tag="div">{"phone"}</_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "tag-common-words")} tag="div">
                                <_Builtin.Block tag="div">{"landline"}</_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "tag-common-words")} tag="div">
                                <_Builtin.Block tag="div">{"cell-phone"}</_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "tag-common-words")} tag="div">
                                <_Builtin.Block tag="div">{"cell"}</_Builtin.Block>
                            </_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "common-wods-content")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "common-words-filter-row")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "div-block-61")} tag="div">
                                <_Builtin.Block tag="div">{"Showing examples of:"}</_Builtin.Block>
                                <_Builtin.Block className={_utils.cx(_styles, "div-block-63")} tag="div">
                                    <_Builtin.DropdownWrapper tag="div" delay={0} hover={false}>
                                        <_Builtin.DropdownToggle className={_utils.cx(_styles, "dropdown-toggle-2")} tag="div">
                                            <_Builtin.Block tag="div">{"Visitor messages"}</_Builtin.Block>
                                            <_Builtin.Icon
                                                className={_utils.cx(_styles, "icon")}
                                                widget={{
                                                    type: "icon",
                                                    icon: "dropdown-toggle"
                                                }}
                                            />
                                        </_Builtin.DropdownToggle>
                                        <_Builtin.DropdownList tag="nav">
                                            <_Builtin.DropdownLink
                                                options={{
                                                    href: "#"
                                                }}
                                            >
                                                {"Link 1"}
                                            </_Builtin.DropdownLink>
                                            <_Builtin.DropdownLink
                                                options={{
                                                    href: "#"
                                                }}
                                            >
                                                {"Link 2"}
                                            </_Builtin.DropdownLink>
                                            <_Builtin.DropdownLink
                                                options={{
                                                    href: "#"
                                                }}
                                            >
                                                {"Link 3"}
                                            </_Builtin.DropdownLink>
                                        </_Builtin.DropdownList>
                                    </_Builtin.DropdownWrapper>
                                </_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "btn-download")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-93.svg"
                                />
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "common-words-list")} tag="div">
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
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "common-words-list")} tag="div">
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
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "common-words-list")} tag="div">
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
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "common-words-list")} tag="div">
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
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "common-words-list")} tag="div">
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
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "btn-close")} data-w-id="e4f23924-08b3-35b7-7780-a9a35eb013ee" tag="div">
                    <_Builtin.Image
                        loading="lazy"
                        width="auto"
                        height="auto"
                        alt=""
                        src="/images/Asset-69.svg"
                    />
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
