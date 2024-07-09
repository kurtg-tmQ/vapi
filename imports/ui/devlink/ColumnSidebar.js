"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ColumnSidebar.module.css";

// eslint-disable-next-line func-style
export function ColumnSidebar({ as: _Component = _Builtin.Block, onToggleChecklist, setShowDialer }) {
    return (
        <_Component className={_utils.cx(_styles, "column-sidebar")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "icon-sidenav")} tag="div">
                <_Builtin.Image
                    className={_utils.cx(_styles, "side-nav")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="/images/Asset-72.svg"
                />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "icon-sidenav", "selected")} tag="div">
                <_Builtin.Image
                    className={_utils.cx(_styles, "side-nav", "seelcted")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="/images/Asset-73.svg"
                />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "icon-sidenav")} tag="div">
                <_Builtin.Image
                    className={_utils.cx(_styles, "side-nav")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="/images/Asset-74.svg"
                />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "icon-sidenav")} tag="div">
                <_Builtin.Image
                    className={_utils.cx(_styles, "side-nav")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="/images/Asset-75.svg"
                />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "icon-sidenav")} tag="div">
                <_Builtin.Image
                    className={_utils.cx(_styles, "side-nav")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="/images/Asset-76.svg"
                />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "icon-sidenav")} tag="div">
                <_Builtin.Image
                    className={_utils.cx(_styles, "side-nav")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="/images/Asset-77.svg"
                    onClick={setShowDialer}
                />
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "icon-sidenav")} tag="div">
                <_Builtin.Image
                    className={_utils.cx(_styles, "side-nav")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="images/checklist-icon.svg"
                    onClick={onToggleChecklist}
                />
            </_Builtin.Block>
        </_Component>
    );
}
