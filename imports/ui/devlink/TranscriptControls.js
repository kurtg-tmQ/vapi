"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Dropdown } from "./Dropdown";
import * as _utils from "./utils";
import _styles from "./TranscriptControls.module.css";

const _interactionsData = JSON.parse(
    '{"events":{"e-235":{"id":"e-235","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-29","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-236"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f3d20c8f-2342-c759-8221-36e6bef4c1b3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f3d20c8f-2342-c759-8221-36e6bef4c1b3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718706175459},"e-237":{"id":"e-237","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-30","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-238"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f3d20c8f-2342-c759-8221-36e6bef4c1b6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f3d20c8f-2342-c759-8221-36e6bef4c1b6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718706200608}},"actionLists":{"a-29":{"id":"a-29","title":"play","actionItemGroups":[{"actionItems":[{"id":"a-29-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"f3d20c8f-2342-c759-8221-36e6bef4c1b3"},"value":"none"}},{"id":"a-29-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".playbtn-inner.pause-icon","selectorGuids":["34ffe8c0-39ec-3892-49b6-c65148172036","8d81850d-4b89-a860-9ed6-589f1b6d1ffa"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718706178141},"a-30":{"id":"a-30","title":"pause","actionItemGroups":[{"actionItems":[{"id":"a-30-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"f3d20c8f-2342-c759-8221-36e6bef4c1b6"},"value":"none"}},{"id":"a-30-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".playbtn-inner.play-icon","selectorGuids":["34ffe8c0-39ec-3892-49b6-c65148172036","aa36bc7f-487d-1038-2239-596719b22ef1"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718706203426}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

// eslint-disable-next-line func-style
export function TranscriptControls({ as: _Component = _Builtin.Block }) {
    _interactions.useInteractions(_interactionsData, _styles);

    const onClickHandler = (data) => {
        console.log("clicked", data);
    };

    return (
        <_Component className={_utils.cx(_styles, "transcript-controls-hd")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "trasncript-duration")} tag="div">
                <_Builtin.Block tag="div">{"2:31 / 8:32"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "transcript-controls-btn")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "btn-forward")} tag="div" onClick={() => onClickHandler("BACKWARD")}>
                    <_Builtin.Block className={_utils.cx(_styles, "btn-icon", "m--3vw")} tag="div">
                        <_Builtin.Image
                            width="auto"
                            height="auto"
                            loading="lazy"
                            alt=""
                            src="/images/07.svg"
                        />
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "main-play-btn", "btn-default")} tag="div" onClick={() => onClickHandler("PLAY")}>
                    <_Builtin.Block className={_utils.cx(_styles, "playbtn", "main")} tag="div" id="playButton">
                        <_Builtin.Block
                            className={_utils.cx(_styles, "playbtn-inner", "play-icon")}
                            data-w-id="f3d20c8f-2342-c759-8221-36e6bef4c1b3"
                            tag="div"
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "playicon")} tag="div">
                                <_Builtin.Image
                                    className={_utils.cx(_styles, "iconimg")}
                                    width="auto"
                                    height="auto"
                                    loading="lazy"
                                    alt=""
                                    src="/images/Asset-114.svg"
                                />
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                            className={_utils.cx(_styles, "playbtn-inner", "pause-icon")}
                            data-w-id="f3d20c8f-2342-c759-8221-36e6bef4c1b6"
                            tag="div"
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "playicon")} tag="div">
                                <_Builtin.Image
                                    className={_utils.cx(_styles, "iconimg")}
                                    width="auto"
                                    height="auto"
                                    loading="lazy"
                                    alt=""
                                    src="/images/Asset-113.svg"
                                />
                            </_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "btn-forward")} tag="div" onClick={() => onClickHandler("FORWARD")}>
                    <_Builtin.Block className={_utils.cx(_styles, "btn-icon", "m--3vw")} tag="div">
                        <_Builtin.Image
                            width="auto"
                            height="auto"
                            loading="lazy"
                            alt=""
                            src="/images/08.svg"
                        />
                    </_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
            <Dropdown />
        </_Component>
    );
}
