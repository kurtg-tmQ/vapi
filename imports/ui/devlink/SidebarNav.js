"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SidebarNav.module.css";
import Navigation from "../../api/classes/client/Navigation";
import Client from "../../api/classes/client/Client";
// import AccountWatcher from "../../api/classes/client/account/AccountWatcher";

const _interactionsData = JSON.parse(
    "{\"events\":{\"e-9\":{\"id\":\"e-9\",\"name\":\"\",\"animationType\":\"custom\",\"eventTypeId\":\"MOUSE_CLICK\",\"action\":{\"id\":\"\",\"actionTypeId\":\"GENERAL_START_ACTION\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"actionListId\":\"a-3\",\"affectedElements\":{},\"playInReverse\":false,\"autoStopEventId\":\"e-10\"}},\"mediaQueries\":[\"main\",\"medium\",\"small\",\"tiny\"],\"target\":{\"id\":\"a2e3e1d1-d2cc-8af1-38e2-bcfa2646986c\",\"appliesTo\":\"ELEMENT\",\"styleBlockIds\":[]},\"targets\":[{\"id\":\"a2e3e1d1-d2cc-8af1-38e2-bcfa2646986c\",\"appliesTo\":\"ELEMENT\",\"styleBlockIds\":[]}],\"config\":{\"loop\":false,\"playInReverse\":false,\"scrollOffsetValue\":null,\"scrollOffsetUnit\":null,\"delay\":null,\"direction\":null,\"effectIn\":null},\"createdOn\":1714486673418},\"e-10\":{\"id\":\"e-10\",\"name\":\"\",\"animationType\":\"custom\",\"eventTypeId\":\"MOUSE_SECOND_CLICK\",\"action\":{\"id\":\"\",\"actionTypeId\":\"GENERAL_START_ACTION\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"actionListId\":\"a-4\",\"affectedElements\":{},\"playInReverse\":false,\"autoStopEventId\":\"e-9\"}},\"mediaQueries\":[\"main\",\"medium\",\"small\",\"tiny\"],\"target\":{\"id\":\"a2e3e1d1-d2cc-8af1-38e2-bcfa2646986c\",\"appliesTo\":\"ELEMENT\",\"styleBlockIds\":[]},\"targets\":[{\"id\":\"a2e3e1d1-d2cc-8af1-38e2-bcfa2646986c\",\"appliesTo\":\"ELEMENT\",\"styleBlockIds\":[]}],\"config\":{\"loop\":false,\"playInReverse\":false,\"scrollOffsetValue\":null,\"scrollOffsetUnit\":null,\"delay\":null,\"direction\":null,\"effectIn\":null},\"createdOn\":1714486673419},\"e-193\":{\"id\":\"e-193\",\"name\":\"\",\"animationType\":\"preset\",\"eventTypeId\":\"MOUSE_CLICK\",\"action\":{\"id\":\"\",\"actionTypeId\":\"GENERAL_START_ACTION\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"actionListId\":\"a-13\",\"affectedElements\":{},\"playInReverse\":false,\"autoStopEventId\":\"e-194\"}},\"mediaQueries\":[\"main\",\"medium\",\"small\",\"tiny\"],\"target\":{\"id\":\"af1e7188-51cd-c324-798a-06ede5a32f33\",\"appliesTo\":\"ELEMENT\",\"styleBlockIds\":[]},\"targets\":[{\"id\":\"af1e7188-51cd-c324-798a-06ede5a32f33\",\"appliesTo\":\"ELEMENT\",\"styleBlockIds\":[]}],\"config\":{\"loop\":false,\"playInReverse\":false,\"scrollOffsetValue\":null,\"scrollOffsetUnit\":null,\"delay\":null,\"direction\":null,\"effectIn\":null},\"createdOn\":1718286119717},\"e-194\":{\"id\":\"e-194\",\"name\":\"\",\"animationType\":\"preset\",\"eventTypeId\":\"MOUSE_SECOND_CLICK\",\"action\":{\"id\":\"\",\"actionTypeId\":\"GENERAL_START_ACTION\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"actionListId\":\"a-14\",\"affectedElements\":{},\"playInReverse\":false,\"autoStopEventId\":\"e-193\"}},\"mediaQueries\":[\"main\",\"medium\",\"small\",\"tiny\"],\"target\":{\"id\":\"af1e7188-51cd-c324-798a-06ede5a32f33\",\"appliesTo\":\"ELEMENT\",\"styleBlockIds\":[]},\"targets\":[{\"id\":\"af1e7188-51cd-c324-798a-06ede5a32f33\",\"appliesTo\":\"ELEMENT\",\"styleBlockIds\":[]}],\"config\":{\"loop\":false,\"playInReverse\":false,\"scrollOffsetValue\":null,\"scrollOffsetUnit\":null,\"delay\":null,\"direction\":null,\"effectIn\":null},\"createdOn\":1718286119717}},\"actionLists\":{\"a-3\":{\"id\":\"a-3\",\"title\":\"[hide] sidebar\",\"actionItemGroups\":[{\"actionItems\":[{\"id\":\"a-3-n\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".app-name\",\"selectorGuids\":[\"43258b1c-8e8a-389d-f7ad-40225220798a\"]},\"value\":\"none\"}},{\"id\":\"a-3-n-8\",\"actionTypeId\":\"TRANSFORM_ROTATE\",\"config\":{\"delay\":0,\"easing\":\"easeInOut\",\"duration\":150,\"target\":{\"useEventTarget\":\"CHILDREN\",\"selector\":\".icon-minimize\",\"selectorGuids\":[\"a5b6fc94-18e4-6054-eb00-3db5aa771175\"]},\"zValue\":180,\"xUnit\":\"DEG\",\"yUnit\":\"DEG\",\"zUnit\":\"deg\"}},{\"id\":\"a-3-n-6\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".categories-hd-content\",\"selectorGuids\":[\"3b64f68a-c4b9-aa70-c3e4-2a9fc505b016\"]},\"value\":\"none\"}},{\"id\":\"a-3-n-5\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".text-sidebar-links\",\"selectorGuids\":[\"d12d21ed-137e-3c2b-a205-ecdb9963cb06\"]},\"value\":\"none\"}},{\"id\":\"a-3-n-4\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".sidebar-text\",\"selectorGuids\":[\"b7b58382-adba-cd45-55c3-174601357232\"]},\"value\":\"none\"}},{\"id\":\"a-3-n-3\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".mobile-search\",\"selectorGuids\":[\"ff2fbee7-8696-4676-e19a-a1817d21c593\"]},\"value\":\"flex\"}},{\"id\":\"a-3-n-2\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".search-div\",\"selectorGuids\":[\"2741cc9d-17c7-544b-c41e-98d148829be9\"]},\"value\":\"none\"}},{\"id\":\"a-3-n-7\",\"actionTypeId\":\"STYLE_SIZE\",\"config\":{\"delay\":0,\"easing\":\"easeInOut\",\"duration\":150,\"target\":{\"useEventTarget\":\"SIBLINGS\",\"selector\":\".sidebar-content\",\"selectorGuids\":[\"678f506d-6915-2fc9-dea0-fc430997b91c\"]},\"widthValue\":60,\"widthUnit\":\"px\",\"heightUnit\":\"PX\",\"locked\":false}}]}],\"useFirstGroupAsInitialState\":false,\"createdOn\":1714486680973},\"a-4\":{\"id\":\"a-4\",\"title\":\"[open] sidebar\",\"actionItemGroups\":[{\"actionItems\":[{\"id\":\"a-4-n\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".app-name\",\"selectorGuids\":[\"43258b1c-8e8a-389d-f7ad-40225220798a\"]},\"value\":\"block\"}},{\"id\":\"a-4-n-2\",\"actionTypeId\":\"TRANSFORM_ROTATE\",\"config\":{\"delay\":0,\"easing\":\"easeInOut\",\"duration\":150,\"target\":{\"useEventTarget\":\"CHILDREN\",\"selector\":\".icon-minimize\",\"selectorGuids\":[\"a5b6fc94-18e4-6054-eb00-3db5aa771175\"]},\"zValue\":0,\"xUnit\":\"DEG\",\"yUnit\":\"DEG\",\"zUnit\":\"deg\"}},{\"id\":\"a-4-n-3\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".categories-hd-content\",\"selectorGuids\":[\"3b64f68a-c4b9-aa70-c3e4-2a9fc505b016\"]},\"value\":\"flex\"}},{\"id\":\"a-4-n-4\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".text-sidebar-links\",\"selectorGuids\":[\"d12d21ed-137e-3c2b-a205-ecdb9963cb06\"]},\"value\":\"block\"}},{\"id\":\"a-4-n-5\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".sidebar-text\",\"selectorGuids\":[\"b7b58382-adba-cd45-55c3-174601357232\"]},\"value\":\"block\"}},{\"id\":\"a-4-n-6\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".mobile-search\",\"selectorGuids\":[\"ff2fbee7-8696-4676-e19a-a1817d21c593\"]},\"value\":\"none\"}},{\"id\":\"a-4-n-7\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".search-div\",\"selectorGuids\":[\"2741cc9d-17c7-544b-c41e-98d148829be9\"]},\"value\":\"block\"}},{\"id\":\"a-4-n-8\",\"actionTypeId\":\"STYLE_SIZE\",\"config\":{\"delay\":0,\"easing\":\"easeInOut\",\"duration\":150,\"target\":{\"useEventTarget\":\"SIBLINGS\",\"selector\":\".sidebar-content\",\"selectorGuids\":[\"678f506d-6915-2fc9-dea0-fc430997b91c\"]},\"widthValue\":250,\"widthUnit\":\"px\",\"heightUnit\":\"PX\",\"locked\":false}}]}],\"useFirstGroupAsInitialState\":false,\"createdOn\":1714486680973},\"a-13\":{\"id\":\"a-13\",\"title\":\"[hide] sidebar 2\",\"actionItemGroups\":[{\"actionItems\":[{\"id\":\"a-13-n\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".app-name\",\"selectorGuids\":[\"43258b1c-8e8a-389d-f7ad-40225220798a\"]},\"value\":\"none\"}},{\"id\":\"a-13-n-2\",\"actionTypeId\":\"TRANSFORM_ROTATE\",\"config\":{\"delay\":0,\"easing\":\"easeInOut\",\"duration\":150,\"target\":{\"useEventTarget\":\"CHILDREN\",\"selector\":\".icon-minimize\",\"selectorGuids\":[\"a5b6fc94-18e4-6054-eb00-3db5aa771175\"]},\"zValue\":180,\"xUnit\":\"DEG\",\"yUnit\":\"DEG\",\"zUnit\":\"deg\"}},{\"id\":\"a-13-n-3\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".categories-hd-content\",\"selectorGuids\":[\"3b64f68a-c4b9-aa70-c3e4-2a9fc505b016\"]},\"value\":\"none\"}},{\"id\":\"a-13-n-4\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".text-sidebar-links\",\"selectorGuids\":[\"d12d21ed-137e-3c2b-a205-ecdb9963cb06\"]},\"value\":\"none\"}},{\"id\":\"a-13-n-5\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".sidebar-text\",\"selectorGuids\":[\"b7b58382-adba-cd45-55c3-174601357232\"]},\"value\":\"none\"}},{\"id\":\"a-13-n-6\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".mobile-search\",\"selectorGuids\":[\"ff2fbee7-8696-4676-e19a-a1817d21c593\"]},\"value\":\"flex\"}},{\"id\":\"a-13-n-7\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".search-div\",\"selectorGuids\":[\"2741cc9d-17c7-544b-c41e-98d148829be9\"]},\"value\":\"none\"}},{\"id\":\"a-13-n-8\",\"actionTypeId\":\"STYLE_SIZE\",\"config\":{\"delay\":0,\"easing\":\"easeInOut\",\"duration\":150,\"target\":{\"useEventTarget\":\"SIBLINGS\",\"selector\":\".sidebar-content\",\"selectorGuids\":[\"678f506d-6915-2fc9-dea0-fc430997b91c\"]},\"widthValue\":60,\"widthUnit\":\"px\",\"heightUnit\":\"PX\",\"locked\":false}}]}],\"useFirstGroupAsInitialState\":false,\"createdOn\":1714486680973},\"a-14\":{\"id\":\"a-14\",\"title\":\"[open] sidebar 2\",\"actionItemGroups\":[{\"actionItems\":[{\"id\":\"a-14-n\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".app-name\",\"selectorGuids\":[\"43258b1c-8e8a-389d-f7ad-40225220798a\"]},\"value\":\"block\"}},{\"id\":\"a-14-n-2\",\"actionTypeId\":\"TRANSFORM_ROTATE\",\"config\":{\"delay\":0,\"easing\":\"easeInOut\",\"duration\":150,\"target\":{\"useEventTarget\":\"CHILDREN\",\"selector\":\".icon-minimize\",\"selectorGuids\":[\"a5b6fc94-18e4-6054-eb00-3db5aa771175\"]},\"zValue\":0,\"xUnit\":\"DEG\",\"yUnit\":\"DEG\",\"zUnit\":\"deg\"}},{\"id\":\"a-14-n-3\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".categories-hd-content\",\"selectorGuids\":[\"3b64f68a-c4b9-aa70-c3e4-2a9fc505b016\"]},\"value\":\"flex\"}},{\"id\":\"a-14-n-4\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".text-sidebar-links\",\"selectorGuids\":[\"d12d21ed-137e-3c2b-a205-ecdb9963cb06\"]},\"value\":\"block\"}},{\"id\":\"a-14-n-5\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".sidebar-text\",\"selectorGuids\":[\"b7b58382-adba-cd45-55c3-174601357232\"]},\"value\":\"block\"}},{\"id\":\"a-14-n-6\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".mobile-search\",\"selectorGuids\":[\"ff2fbee7-8696-4676-e19a-a1817d21c593\"]},\"value\":\"none\"}},{\"id\":\"a-14-n-7\",\"actionTypeId\":\"GENERAL_DISPLAY\",\"config\":{\"delay\":0,\"easing\":\"\",\"duration\":0,\"target\":{\"selector\":\".search-div\",\"selectorGuids\":[\"2741cc9d-17c7-544b-c41e-98d148829be9\"]},\"value\":\"block\"}},{\"id\":\"a-14-n-8\",\"actionTypeId\":\"STYLE_SIZE\",\"config\":{\"delay\":0,\"easing\":\"easeInOut\",\"duration\":150,\"target\":{\"useEventTarget\":\"SIBLINGS\",\"selector\":\".sidebar-content\",\"selectorGuids\":[\"678f506d-6915-2fc9-dea0-fc430997b91c\"]},\"widthValue\":250,\"widthUnit\":\"px\",\"heightUnit\":\"PX\",\"locked\":false}}]}],\"useFirstGroupAsInitialState\":false,\"createdOn\":1714486680973}},\"site\":{\"mediaQueries\":[{\"key\":\"main\",\"min\":992,\"max\":10000},{\"key\":\"medium\",\"min\":768,\"max\":991},{\"key\":\"small\",\"min\":480,\"max\":767},{\"key\":\"tiny\",\"min\":0,\"max\":479}]}}"
);

// eslint-disable-next-line func-style
export function SidebarNav({ as: _Component = _Builtin.Block }) {
    _interactions.useInteractions(_interactionsData, _styles);

    const handleLogout = async () => {
        try {
            // await AccountWatcher.logout();
            Client.logout();
        } catch (error) { }
    };
    return (
        <_Component className={_utils.cx(_styles, "main-sidebar")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "sidebar-content")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "brand")} tag="div" />
                <_Builtin.Block className={_utils.cx(_styles, "sidebar-section")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "sidebar-section-div")} tag="div">
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link")}
                            button={false}
                            block="inline"
                            options={{
                                href: Navigation.AvailableRoutes.HOME.path
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image width="auto" height="auto" loading="lazy" alt="" src="/images/Asset-4.svg" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Transcript"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link")}
                            button={false}
                            block="inline"
                            options={{
                                href: Navigation.AvailableRoutes.DISCOVERY.path
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image width="auto" height="auto" loading="lazy" alt="" src="/images/Asset-6.svg" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Topics Discovery"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link")}
                            button={false}
                            block="inline"
                            options={{
                                href: Navigation.AvailableRoutes.INSIGHTS.path
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image width="auto" height="auto" loading="lazy" alt="" src="/images/Asset-10.svg" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Customer Insights"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                        <_Builtin.Link
                            className={_utils.cx(_styles, "sidebar-link")}
                            button={false}
                            block="inline"
                            options={{
                                href: Navigation.AvailableRoutes.CONVERSATION.path
                            }}
                        >
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image width="auto" height="auto" loading="lazy" alt="" src="/images/Asset-6.svg" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Conversations"}
                            </_Builtin.Block>
                        </_Builtin.Link>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "sidebar-section")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "sidebar-section-div")} tag="div">
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-link")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image width="auto" height="auto" loading="lazy" alt="" src="/images/Asset-52.svg" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Support"}
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-link")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image width="auto" height="auto" loading="lazy" alt="" src="/images/Asset-32.svg" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Settings"}
                            </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "sidebar-link", "logout")} tag="div" onClick={handleLogout}>
                            <_Builtin.Block className={_utils.cx(_styles, "icon-sidebar")} tag="div">
                                <_Builtin.Image width="auto" height="auto" loading="lazy" alt="" src="/images/Asset-53.svg" />
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "text-sidebar-links")} tag="div">
                                {"Logout"}
                            </_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "icon-minimize-sidebar")} data-w-id="af1e7188-51cd-c324-798a-06ede5a32f33" tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "icon-minimize")} tag="div">
                    <_Builtin.Image width="auto" height="auto" loading="lazy" alt="" src="/images/Asset-34.svg" />
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
