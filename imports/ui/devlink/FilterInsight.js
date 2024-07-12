"use client";
import React, { useState } from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FilterInsight.module.css";
import Client from "../../api/classes/client/Client";

// eslint-disable-next-line func-style
export function FilterInsight({ as: _Component = _Builtin.Block, clickHandler }) {
    const [activeButton, setActiveButton] = useState("");
    const [url, setURL] = useState("");
    const [isDoneScraping, setisScrapingDone] = useState(true);

    const onClickHandler = (buttonName) => {
        clickHandler(buttonName);
        setActiveButton(buttonName);
    };

    const scrapeURL = () => {
        const handleURLInputChanged = (event) => {
            setURL(event.target.value)
        }
        const submitURL = async () => {
            if (url) {
                try {
                    setisScrapingDone(false);
                    await Client.submitURL(url)

                    setTimeout(() => {
                        alert("Done scraping...")
                    }, 500)
                } catch (error) {
                    setTimeout(() => {
                        alert(error.reason || "Something went wrong...")
                    }, 500)
                }
                setisScrapingDone(true)
            } else {
                alert("Please input url first")
            }

        }
        return { handleURLInputChanged, submitURL }
    }
    return (
        <_Component className={_utils.cx(_styles, "filter-nav-topic")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "gray")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Filters" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Filters")}
                >
                    {"+ Filters"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "users")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Search" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Search")}
                >
                    {"Search users or team"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "calendar")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Calender" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Calender")}
                >
                    {"Jan 1 - Jun 30"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "time")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Duration" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Duration")}
                >
                    {"Duration: All"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "gray")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Sentiment" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Sentiment")}
                >
                    {"Sentiment: All"}
                </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "filter-button-div")} tag="div">
                <_Builtin.Link
                    className={_utils.cx(_styles, "btn", "gray")}
                    button={true}
                    block=""
                    options={{
                        href: "#"
                    }}
                    style={{ backgroundColor: activeButton === "Conversation" ? "#d6cef3" : "" }}
                    onClick={() => onClickHandler("Conversation")}
                >
                    {"Conversation: All"}
                </_Builtin.Link>
            </_Builtin.Block>
            <input type="text" placeholder="Enter your url here..." onChange={scrapeURL().handleURLInputChanged} />
            {
                isDoneScraping ? (
                    <button style={{ backgroundColor: "skyblue", borderRadius: "7px", marginLeft: "10px" }} onClick={scrapeURL().submitURL}>Scrape</button>
                ) :
                    (
                        <div className="loader-scraper"></div>
                    )
            }

        </_Component>
    );
}
