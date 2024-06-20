"use client";
import React, { useRef } from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SearchBar.module.css";

// eslint-disable-next-line func-style
export function SearchBar({ as: _Component = _Builtin.Block, open = false }) {
    const text = useRef(null);
    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log("onChange result:", e.target.value);
        console.log("ref result:", text.current.value);
    };

    return (
        <_Component className={_utils.cx(_styles, "search-bar-div")} tag="div" style={{ display: open ? "block" : "none" }}>
            <_Builtin.SearchForm className={_utils.cx(_styles, "search-2")} action="/search">
                <_Builtin.SearchInput
                    className={_utils.cx(_styles, "search-input-2")}
                    autoFocus={false}
                    disabled={false}
                    maxLength={256}
                    name="query"
                    placeholder="Search…"
                    required={true}
                    type="search"
                    id="search"
                    onChange={onChangeHandler}
                    ref={text}
                />
                <_Builtin.SearchButton className={_utils.cx(_styles, "search-button-2")} type="submit" value="Search" />
            </_Builtin.SearchForm>
        </_Component>
    );
}
