"use client";
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./Checklist.module.css";

import { SESSION_KEY } from "../../api/classes/common/Const";
import Client from "../../api/classes/client/Client";

const _interactionsData = JSON.parse(
    '{"events":{"e-217":{"id":"e-217","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-218"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2befca73-6a81-85c1-7742-afc4730bab96","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2befca73-6a81-85c1-7742-afc4730bab96","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718379994183},"e-218":{"id":"e-218","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-217"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2befca73-6a81-85c1-7742-afc4730bab96","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2befca73-6a81-85c1-7742-afc4730bab96","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718379994184},"e-219":{"id":"e-219","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-220"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2befca73-6a81-85c1-7742-afc4730babb4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2befca73-6a81-85c1-7742-afc4730babb4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718380045638},"e-220":{"id":"e-220","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-219"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2befca73-6a81-85c1-7742-afc4730babb4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2befca73-6a81-85c1-7742-afc4730babb4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718380045662},"e-223":{"id":"e-223","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-22","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-224"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2befca73-6a81-85c1-7742-afc4730bab92","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2befca73-6a81-85c1-7742-afc4730bab92","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718380272403},"e-239":{"id":"e-239","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-240"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2befca73-6a81-85c1-7742-afc4730babea","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2befca73-6a81-85c1-7742-afc4730babea","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718709497303},"e-240":{"id":"e-240","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-239"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2befca73-6a81-85c1-7742-afc4730babea","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2befca73-6a81-85c1-7742-afc4730babea","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718709497303},"e-241":{"id":"e-241","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-21","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-242"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2befca73-6a81-85c1-7742-afc4730babcf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2befca73-6a81-85c1-7742-afc4730babcf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718709744565},"e-242":{"id":"e-242","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-241"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2befca73-6a81-85c1-7742-afc4730babcf","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2befca73-6a81-85c1-7742-afc4730babcf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718709744565}},"actionLists":{"a-20":{"id":"a-20","title":"[hide] checklist-accordion","actionItemGroups":[{"actionItems":[{"id":"a-20-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".checklist-list","selectorGuids":["bad8301c-d409-799a-5b27-98b62d051613"]},"value":"none"}},{"id":"a-20-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"CHILDREN","selector":".icon-checklist-arrow","selectorGuids":["72a7ef83-a8c1-a945-7efb-623f2ebdd31b"]},"zValue":-90,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718379997688},"a-21":{"id":"a-21","title":"[show] checklist-accordion","actionItemGroups":[{"actionItems":[{"id":"a-21-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".checklist-list","selectorGuids":["bad8301c-d409-799a-5b27-98b62d051613"]},"value":"block"}},{"id":"a-21-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"CHILDREN","selector":".icon-checklist-arrow","selectorGuids":["72a7ef83-a8c1-a945-7efb-623f2ebdd31b"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718379997688},"a-22":{"id":"a-22","title":"[close] checklist","actionItemGroups":[{"actionItems":[{"id":"a-22-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".checklist","selectorGuids":["cd249579-30dd-0c7d-b08b-6473901de332"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718380276062}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function Checklist({ as: _Component = _Builtin.Block }) {
    _interactions.useInteractions(_interactionsData, _styles);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [checklist, setChecklist] = useState([]);
    Client.on(SESSION_KEY.UPDATE_CHECKLIST, (checklist) => {
        setChecklist(checklist);
    });

    useEffect(() => {
        if (!checklist.length) {
            const checklist = Client.Checklist;
            setChecklist(checklist);
        }
    }, []);

    return (
        <Draggable>
            <_Component className={_utils.cx(_styles, "checklist")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "checklist-top")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "icon-draggable")} tag="div">
                        <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-115.svg" />
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "icon-checklist")} tag="div">
                        <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-108.svg" />
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">{"Checklist"}</_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "btn-close", "padding")} data-w-id="2befca73-6a81-85c1-7742-afc4730bab92" tag="div">
                        <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-109.svg" />
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "checklist-bot")} tag="div">
                    {checklist.map((category, categoryIndex) => (
                        <_Builtin.Block key={categoryIndex} className={_utils.cx(_styles, "checklist-section")} tag="div">
                            <_Builtin.Block
                                className={_utils.cx(_styles, "checklist-hd")}
                                data-w-id={`2befca73-6a81-85c1-7742-afc4730bab96`}
                                tag="div"
                            >
                                <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text-div")} tag="div">
                                    <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text")} tag="div">
                                        {`${category.name} - `}
                                    </_Builtin.Block>
                                    {category.isComplete ? (
                                        <_Builtin.Block className={_utils.cx(_styles, "icon-check")} tag="div">
                                            <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-116.svg" />
                                        </_Builtin.Block>
                                    ) : (
                                        ""
                                    )}
                                    <_Builtin.Block
                                        className={_utils.cx(_styles, "checklist-count", category.isComplete ? "completed" : "")}
                                    >{`${category.items.length} items`}</_Builtin.Block>
                                </_Builtin.Block>
                                <_Builtin.Block className={_utils.cx(_styles, "icon-checklist-arrow ")} tag="div">
                                    <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-111.svg" />
                                </_Builtin.Block>
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "checklist-list", "show")} tag="div">
                                {category.items.map((item, itemIndex) => (
                                    <_Builtin.Block key={itemIndex} className={_utils.cx(_styles, "checklist-row")} tag="div">
                                        <_Builtin.Block className={_utils.cx(_styles, "icon-check", item.current ? "" : "hide")} tag="div">
                                            <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-110.svg" />
                                        </_Builtin.Block>
                                        <_Builtin.Block
                                            className={_utils.cx(
                                                _styles,
                                                "text-checklist-row",
                                                item.completed ? "done" : "",
                                                item.current ? "current" : ""
                                            )}
                                            tag="div"
                                        >
                                            {item.name}
                                        </_Builtin.Block>
                                    </_Builtin.Block>
                                ))}
                            </_Builtin.Block>
                        </_Builtin.Block>
                    ))}
                </_Builtin.Block>
            </_Component>
        </Draggable>
    );
}

// // eslint-disable-next-line func-style
// export function Checklist({ as: _Component = _Builtin.Block }) {
//     _interactions.useInteractions(_interactionsData, _styles);

//     return (
//         <_Component className={_utils.cx(_styles, "checklist")} tag="div">
//             <_Builtin.Block className={_utils.cx(_styles, "checklist-top")} tag="div">
//                 <_Builtin.Block className={_utils.cx(_styles, "icon-draggable")} tag="div">
//                     <_Builtin.Image
//                         loading="lazy"
//                         width="auto"
//                         height="auto"
//                         alt=""
//                         src="/images/Asset-115.svg"
//                     />
//                 </_Builtin.Block>
//                 <_Builtin.Block className={_utils.cx(_styles, "icon-checklist")} tag="div">
//                     <_Builtin.Image
//                         loading="lazy"
//                         width="auto"
//                         height="auto"
//                         alt=""
//                         src="/images/Asset-108.svg"
//                     />
//                 </_Builtin.Block>
//                 <_Builtin.Block tag="div">{"Checklist"}</_Builtin.Block>
//                 <_Builtin.Block className={_utils.cx(_styles, "btn-close", "padding")} data-w-id="2befca73-6a81-85c1-7742-afc4730bab92" tag="div">
//                     <_Builtin.Image
//                         loading="lazy"
//                         width="auto"
//                         height="auto"
//                         alt=""
//                         src="/images/Asset-109.svg"
//                     />
//                 </_Builtin.Block>
//             </_Builtin.Block>
//             <_Builtin.Block className={_utils.cx(_styles, "checklist-bot")} tag="div">
//                 <_Builtin.Block className={_utils.cx(_styles, "checklist-section")} tag="div">
//                     <_Builtin.Block className={_utils.cx(_styles, "checklist-hd")} data-w-id="2befca73-6a81-85c1-7742-afc4730bab96" tag="div">
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text-div")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text")} tag="div">
//                                 {"Introductions - "}
//                                 <_Builtin.Span className={_utils.cx(_styles, "checklist-count")}>{"4 items"}</_Builtin.Span>
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "icon-checklist-arrow", "open")} tag="div">
//                             <_Builtin.Image
//                                 loading="lazy"
//                                 width="auto"
//                                 height="auto"
//                                 alt=""
//                                 src="/images/Asset-111.svg"
//                             />
//                         </_Builtin.Block>
//                     </_Builtin.Block>
//                     <_Builtin.Block className={_utils.cx(_styles, "checklist-list", "show")} tag="div">
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row", "done")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row", "done")} tag="div">
//                                 {"Greetings"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row", "done")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row", "done")} tag="div">
//                                 {"Verify policy"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row", "current")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row", "current")} tag="div">
//                                 {"Offer assistance"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                     </_Builtin.Block>
//                 </_Builtin.Block>
//                 <_Builtin.Block className={_utils.cx(_styles, "checklist-section")} tag="div">
//                     <_Builtin.Block className={_utils.cx(_styles, "checklist-hd")} data-w-id="2befca73-6a81-85c1-7742-afc4730babb4" tag="div">
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text-div")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text")} tag="div">
//                                 {"TCPA statement - "}
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-116.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "checklist-count", "completed")} tag="div">
//                                 {"3 items"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "icon-checklist-arrow")} tag="div">
//                             <_Builtin.Image
//                                 loading="lazy"
//                                 width="auto"
//                                 height="auto"
//                                 alt=""
//                                 src="/images/Asset-111.svg"
//                             />
//                         </_Builtin.Block>
//                     </_Builtin.Block>
//                     <_Builtin.Block className={_utils.cx(_styles, "checklist-list")} tag="div">
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                     </_Builtin.Block>
//                 </_Builtin.Block>
//                 <_Builtin.Block className={_utils.cx(_styles, "checklist-section")} tag="div">
//                     <_Builtin.Block className={_utils.cx(_styles, "checklist-hd")} data-w-id="2befca73-6a81-85c1-7742-afc4730babcf" tag="div">
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text-div")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text")} tag="div">
//                                 {"Cross sell insurance plan -"}
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-116.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "checklist-count", "completed")} tag="div">
//                                 {"3 items"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "icon-checklist-arrow")} tag="div">
//                             <_Builtin.Image
//                                 loading="lazy"
//                                 width="auto"
//                                 height="auto"
//                                 alt=""
//                                 src="/images/Asset-111.svg"
//                             />
//                         </_Builtin.Block>
//                     </_Builtin.Block>
//                     <_Builtin.Block className={_utils.cx(_styles, "checklist-list")} tag="div">
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                     </_Builtin.Block>
//                 </_Builtin.Block>
//                 <_Builtin.Block className={_utils.cx(_styles, "checklist-section")} tag="div">
//                     <_Builtin.Block className={_utils.cx(_styles, "checklist-hd")} data-w-id="2befca73-6a81-85c1-7742-afc4730babea" tag="div">
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text-div")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "checklist-hd-text")} tag="div">
//                                 {"Cross sell insurance plan - "}
//                                 <_Builtin.Span className={_utils.cx(_styles, "checklist-count")}>{"4 items"}</_Builtin.Span>
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "icon-checklist-arrow")} tag="div">
//                             <_Builtin.Image
//                                 loading="lazy"
//                                 width="auto"
//                                 height="auto"
//                                 alt=""
//                                 src="/images/Asset-111.svg"
//                             />
//                         </_Builtin.Block>
//                     </_Builtin.Block>
//                     <_Builtin.Block className={_utils.cx(_styles, "checklist-list")} tag="div">
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                         <_Builtin.Block className={_utils.cx(_styles, "checklist-row")} tag="div">
//                             <_Builtin.Block className={_utils.cx(_styles, "icon-check", "hide")} tag="div">
//                                 <_Builtin.Image
//                                     loading="lazy"
//                                     width="auto"
//                                     height="auto"
//                                     alt=""
//                                     src="/images/Asset-110.svg"
//                                 />
//                             </_Builtin.Block>
//                             <_Builtin.Block className={_utils.cx(_styles, "text-checklist-row")} tag="div">
//                                 {"Closing statement"}
//                             </_Builtin.Block>
//                         </_Builtin.Block>
//                     </_Builtin.Block>
//                 </_Builtin.Block>
//             </_Builtin.Block>
//         </_Component>
//     );
// }
