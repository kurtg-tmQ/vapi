"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./Sidebar.module.css";

const _interactionsData = JSON.parse(
    '{"events":{"e-9":{"id":"e-9","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-10"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a2e3e1d1-d2cc-8af1-38e2-bcfa2646986c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a2e3e1d1-d2cc-8af1-38e2-bcfa2646986c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1714486673418},"e-10":{"id":"e-10","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-4","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-9"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a2e3e1d1-d2cc-8af1-38e2-bcfa2646986c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a2e3e1d1-d2cc-8af1-38e2-bcfa2646986c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1714486673419},"e-191":{"id":"e-191","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-11","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-192"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a2e3e1d1-d2cc-8af1-38e2-bcfa2646983b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a2e3e1d1-d2cc-8af1-38e2-bcfa2646983b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1714576639870},"e-192":{"id":"e-192","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-12","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-191"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a2e3e1d1-d2cc-8af1-38e2-bcfa2646983b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a2e3e1d1-d2cc-8af1-38e2-bcfa2646983b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1714576639871},"e-193":{"id":"e-193","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-13","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-194"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"af1e7188-51cd-c324-798a-06ede5a32f33","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"af1e7188-51cd-c324-798a-06ede5a32f33","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718286119717},"e-194":{"id":"e-194","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-14","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-193"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"af1e7188-51cd-c324-798a-06ede5a32f33","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"af1e7188-51cd-c324-798a-06ede5a32f33","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718286119717}},"actionLists":{"a-3":{"id":"a-3","title":"[hide] sidebar","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".app-name","selectorGuids":["43258b1c-8e8a-389d-f7ad-40225220798a"]},"value":"none"}},{"id":"a-3-n-8","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"CHILDREN","selector":".icon-minimize","selectorGuids":["a5b6fc94-18e4-6054-eb00-3db5aa771175"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-3-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".categories-hd-content","selectorGuids":["3b64f68a-c4b9-aa70-c3e4-2a9fc505b016"]},"value":"none"}},{"id":"a-3-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sidebar-links","selectorGuids":["d12d21ed-137e-3c2b-a205-ecdb9963cb06"]},"value":"none"}},{"id":"a-3-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".sidebar-text","selectorGuids":["b7b58382-adba-cd45-55c3-174601357232"]},"value":"none"}},{"id":"a-3-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".mobile-search","selectorGuids":["ff2fbee7-8696-4676-e19a-a1817d21c593"]},"value":"flex"}},{"id":"a-3-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".search-div","selectorGuids":["2741cc9d-17c7-544b-c41e-98d148829be9"]},"value":"none"}},{"id":"a-3-n-7","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"SIBLINGS","selector":".sidebar-content","selectorGuids":["678f506d-6915-2fc9-dea0-fc430997b91c"]},"widthValue":60,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1714486680973},"a-4":{"id":"a-4","title":"[open] sidebar","actionItemGroups":[{"actionItems":[{"id":"a-4-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".app-name","selectorGuids":["43258b1c-8e8a-389d-f7ad-40225220798a"]},"value":"block"}},{"id":"a-4-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"CHILDREN","selector":".icon-minimize","selectorGuids":["a5b6fc94-18e4-6054-eb00-3db5aa771175"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-4-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".categories-hd-content","selectorGuids":["3b64f68a-c4b9-aa70-c3e4-2a9fc505b016"]},"value":"flex"}},{"id":"a-4-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sidebar-links","selectorGuids":["d12d21ed-137e-3c2b-a205-ecdb9963cb06"]},"value":"block"}},{"id":"a-4-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".sidebar-text","selectorGuids":["b7b58382-adba-cd45-55c3-174601357232"]},"value":"block"}},{"id":"a-4-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".mobile-search","selectorGuids":["ff2fbee7-8696-4676-e19a-a1817d21c593"]},"value":"none"}},{"id":"a-4-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".search-div","selectorGuids":["2741cc9d-17c7-544b-c41e-98d148829be9"]},"value":"block"}},{"id":"a-4-n-8","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"SIBLINGS","selector":".sidebar-content","selectorGuids":["678f506d-6915-2fc9-dea0-fc430997b91c"]},"widthValue":250,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1714486680973},"a-11":{"id":"a-11","title":"[hide] my categories","actionItemGroups":[{"actionItems":[{"id":"a-11-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".sidebar-categories-sub","selectorGuids":["55389cf6-eebd-246a-6bf6-1b97d30f1395"]},"value":"none"}},{"id":"a-11-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"selector":".icon-categories-dropdown","selectorGuids":["2989d8e8-b969-ba06-f179-f584f8c3fbed"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1714576643201},"a-12":{"id":"a-12","title":"[show] my categories","actionItemGroups":[{"actionItems":[{"id":"a-12-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".sidebar-categories-sub","selectorGuids":["55389cf6-eebd-246a-6bf6-1b97d30f1395"]},"value":"block"}},{"id":"a-12-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"selector":".icon-categories-dropdown","selectorGuids":["2989d8e8-b969-ba06-f179-f584f8c3fbed"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1714576643201},"a-13":{"id":"a-13","title":"[hide] sidebar 2","actionItemGroups":[{"actionItems":[{"id":"a-13-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".app-name","selectorGuids":["43258b1c-8e8a-389d-f7ad-40225220798a"]},"value":"none"}},{"id":"a-13-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"CHILDREN","selector":".icon-minimize","selectorGuids":["a5b6fc94-18e4-6054-eb00-3db5aa771175"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-13-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".categories-hd-content","selectorGuids":["3b64f68a-c4b9-aa70-c3e4-2a9fc505b016"]},"value":"none"}},{"id":"a-13-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sidebar-links","selectorGuids":["d12d21ed-137e-3c2b-a205-ecdb9963cb06"]},"value":"none"}},{"id":"a-13-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".sidebar-text","selectorGuids":["b7b58382-adba-cd45-55c3-174601357232"]},"value":"none"}},{"id":"a-13-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".mobile-search","selectorGuids":["ff2fbee7-8696-4676-e19a-a1817d21c593"]},"value":"flex"}},{"id":"a-13-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".search-div","selectorGuids":["2741cc9d-17c7-544b-c41e-98d148829be9"]},"value":"none"}},{"id":"a-13-n-8","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"SIBLINGS","selector":".sidebar-content","selectorGuids":["678f506d-6915-2fc9-dea0-fc430997b91c"]},"widthValue":60,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1714486680973},"a-14":{"id":"a-14","title":"[open] sidebar 2","actionItemGroups":[{"actionItems":[{"id":"a-14-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".app-name","selectorGuids":["43258b1c-8e8a-389d-f7ad-40225220798a"]},"value":"block"}},{"id":"a-14-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"CHILDREN","selector":".icon-minimize","selectorGuids":["a5b6fc94-18e4-6054-eb00-3db5aa771175"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}},{"id":"a-14-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".categories-hd-content","selectorGuids":["3b64f68a-c4b9-aa70-c3e4-2a9fc505b016"]},"value":"flex"}},{"id":"a-14-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".text-sidebar-links","selectorGuids":["d12d21ed-137e-3c2b-a205-ecdb9963cb06"]},"value":"block"}},{"id":"a-14-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".sidebar-text","selectorGuids":["b7b58382-adba-cd45-55c3-174601357232"]},"value":"block"}},{"id":"a-14-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".mobile-search","selectorGuids":["ff2fbee7-8696-4676-e19a-a1817d21c593"]},"value":"none"}},{"id":"a-14-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".search-div","selectorGuids":["2741cc9d-17c7-544b-c41e-98d148829be9"]},"value":"block"}},{"id":"a-14-n-8","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":150,"target":{"useEventTarget":"SIBLINGS","selector":".sidebar-content","selectorGuids":["678f506d-6915-2fc9-dea0-fc430997b91c"]},"widthValue":250,"widthUnit":"px","heightUnit":"PX","locked":false}}]}],"useFirstGroupAsInitialState":false,"createdOn":1714486680973}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

// eslint-disable-next-line func-style
export function Sidebar({ as: _Component = _Builtin.Block }) {
    _interactions.useInteractions(_interactionsData, _styles);

    return (
        <_Component className={_utils.cx(_styles, "main-sidebar")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "sidebar-content")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "brand")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "logo")} tag="div">
                        <_Builtin.Image
                            loading="lazy"
                            width="auto"
                            height="auto"
                            alt=""
                            src="/images/Asset-2.svg"
                        />
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "app-name")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "logo-name")} tag="div">
                            <_Builtin.Image
                                loading="lazy"
                                width="auto"
                                height="auto"
                                alt=""
                                src="/images/Asset-9.svg"
                            />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">
                            <_Builtin.Block tag="div">{"Training Dashboard"}</_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "mobile-search")} tag="div">
                    <_Builtin.Image
                        loading="lazy"
                        width="auto"
                        height="auto"
                        alt=""
                        src="/images/Asset-3.svg"
                    />
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "search-div")} tag="div">
                    <_Builtin.SearchForm action="/search">
                        <_Builtin.SearchInput
                            className={_utils.cx(_styles, "search-input")}
                            autoFocus={false}
                            disabled={false}
                            maxLength={256}
                            name="query"
                            placeholder="Search…"
                            required={true}
                            type="search"
                            id="search"
                        />
                        <_Builtin.SearchButton className={_utils.cx(_styles, "search-button")} type="submit" value="Search" />
                    </_Builtin.SearchForm>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "sidebar-section")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "sidebar-text")} tag="div">
                        {"MENU"}
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "sidebar-section-div")} tag="div">
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link")}
                            button={false}
                            block="inline"
                            options={{
                                href: "#"
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-4.svg"
                                />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Overview"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link")}
                            button={false}
                            block="inline"
                            options={{
                                href: "#"
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-10.svg"
                                />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Categories"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link")}
                            button={false}
                            block="inline"
                            options={{
                                href: "#"
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-6.svg"
                                />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Trainings"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link")}
                            button={false}
                            block="inline"
                            options={{
                                href: "#"
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-7.svg"
                                />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Proficiency"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link")}
                            button={false}
                            block="inline"
                            options={{
                                href: "#"
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-8.svg"
                                />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Resource Library"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "sidebar-categories")} tag="div">
                    <_Builtin.Block
                        className={_utils.cx(_styles, "sidebar-categories-btn")}
                        data-w-id="a2e3e1d1-d2cc-8af1-38e2-bcfa2646983b"
                        tag="div"
                    >
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-categories-btn--icon")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-10.svg"
                                />
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "categories-hd-content")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links-categories")} tag="div">
                                {"My Categories"}
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "icon-categories-dropdown")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-11.svg"
                                />
                            </_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "sidebar-categories-sub")} tag="div">
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link--subcategory")}
                            button={false}
                            block="inline"
                            options={{
                                href: "#"
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "subcategory-color")} tag="div">
                                <_Builtin.Block className={_utils.cx(_styles, "tab-color")} tag="div" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Programming"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-link--subcategory")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "subcategory-color")} tag="div">
                                <_Builtin.Block className={_utils.cx(_styles, "tab-color", "purple")} tag="div" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Design"}
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-link--subcategory")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "subcategory-color")} tag="div">
                                <_Builtin.Block className={_utils.cx(_styles, "tab-color", "teal")} tag="div" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Marketing"}
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-link--subcategory")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "subcategory-color")} tag="div">
                                <_Builtin.Block className={_utils.cx(_styles, "tab-color", "orange")} tag="div" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Technology"}
                            </_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "sidebar-section")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "sidebar-text")} tag="div">
                        {"SETTINGS"}
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "sidebar-section-div")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-link")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-52.svg"
                                />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Support"}
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-link")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-32.svg"
                                />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Settings"}
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-link", "logout")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                    alt=""
                                    src="/images/Asset-53.svg"
                                />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Logout"}
                            </_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "icon-minimize-sidebar")} data-w-id="a2e3e1d1-d2cc-8af1-38e2-bcfa2646986c" tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "icon-minimize")} tag="div">
                    <_Builtin.Image
                        loading="lazy"
                        width="auto"
                        height="auto"
                        alt=""
                        src="/images/Asset-34.svg"
                    />
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
