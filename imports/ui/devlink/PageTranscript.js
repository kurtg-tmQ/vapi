"use client";
import React, { useEffect, useState, useRef } from "react";
import * as _Builtin from "./_Builtin";
import { SidebarNav } from "./SidebarNav";
import { TopNavControls } from "./TopNavControls";
import { CustomerName } from "./CustomerName";
import { CardBubbleCustomer } from "./CardBubbleCustomer";
import { CustomerChatDetails } from "./CustomerChatDetails";
import { CardBubbleAgent } from "./CardBubbleAgent";
import { AgentChatDetails } from "./AgentChatDetails";
import { TranscriptControls } from "./TranscriptControls";
import { Waveform } from "./Waveform";
import { Emotions } from "./Emotions";
import { TrasncriptPageColumn } from "./TrasncriptPageColumn";
import { ColumnSidebar } from "./ColumnSidebar";
import { Checklist } from "./Checklist";
import * as _utils from "./utils";
import _styles from "./PageTranscript.module.css";

import { SESSION_KEY } from "../../api/classes/common/Const";
import Client from "../../api/classes/client/Client";

const sampleChatData = [];

const DROPDOWN_OPTIONS = [
    {
        label: "Link 1",
        value: "#"
    },
    {
        label: "Link 2",
        value: "#"
    },
    {
        label: "Link 3",
        value: "#"
    }
];

const sampleChecklistData = [
    {
        name: "Introductions",
        isComplete: false,
        items: [
            { name: "Greetings", completed: false, current: false, value: "greetings" },
        ]
    },
    {
        name: "Credentials",
        isComplete: false,
        items: [
            { name: "First and Last Name", completed: false, current: false, value: "verify_user" },
            { name: "Zip Code", completed: false, current: false, value: "zipcode_update" },
            { name: "Last 4 of the Social Security Number", completed: false, current: false, },
            { name: "Date of Birth", completed: false, current: false, value: "birthday_update" },
            { name: "Password (if applicable)", completed: false, current: false, value: "verify_account_password" },
            { name: "Last four (4) Card Number/Account Number (if they have it)", completed: false, current: false, value: "retrieve_card_number" }
        ]
    }
];

// eslint-disable-next-line func-style
export function PageTranscript({ as: _Component = _Builtin.Block }) {
    const [isChecklistVisible, setIsChecklistVisible] = useState(false);
    const [chatData, setChatData] = useState(sampleChatData);
    Client.listen();
    Client.on(SESSION_KEY.UPDATE_CONVERSAION, (data) => {
        setChatData(data);
    });
    Client.on(SESSION_KEY.START, () => {
        setIsChecklistVisible(true);
    });

    const toggleChecklist = () => {
        setIsChecklistVisible(!isChecklistVisible);
    };

    const chatContainerRef = useRef(null);

    const scrollToBottom = () => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        Client.login("tmq.kurt.g@gmail.com", "P@ssword1");
        if (!chatData.length) {
            Client.getSession();
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatData]);

    const systemMessage = (message, time, index) => {
        return (
            <_Builtin.Block style={{
                backgroundColor: "#f0f0f0",
                color: "#333",
                padding: "10px 15px",
                margin: "10px 0",
                borderRadius: "5px",
                textAlign: "center",
                fontWeight: "bold",
                width: "calc(100% - 30px)",
                boxSizing: "border-box"
            }} tag="div" key={index}>
                <_Builtin.Block tag="div">
                    <_Builtin.Block tag="div">SYSTEM: {message} - {time}</_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
        );
    };

    // const chat = (isRight, message, time, index) => (
    //     <_Builtin.Block className={_utils.cx(_styles, "bubble-container", isRight ? "right" : "")} tag="div" key={index}>
    //         <_Builtin.Block className={_utils.cx(_styles, "card-bubble", isRight ? "white" : "")} tag="div">
    //             <_Builtin.Block tag="div">{message}</_Builtin.Block>
    //         </_Builtin.Block>
    //         <_Builtin.Block className={_utils.cx(_styles, "chat-details")} tag="div">
    //             <_Builtin.Block className={_utils.cx(_styles, "chat-time")} tag="div">
    //                 {time}
    //             </_Builtin.Block>
    //             <_Builtin.Block className={_utils.cx(_styles, "circle-divider")} tag="div" />
    //             {dropdownSuggestions()}
    //         </_Builtin.Block>
    //     </_Builtin.Block>
    // );
    const chat = (isRight, message, time, index) => {
    const isHTML = /<\/?[a-z][\s\S]*>/i.test(message); 
        return (
            <_Builtin.Block className={_utils.cx(_styles, "bubble-container", isRight ? "right" : "")} tag="div" key={index}>
                <_Builtin.Block className={_utils.cx(_styles, "card-bubble", isRight ? "white" : "")} tag="div">
                    <_Builtin.Block tag="div">
                        {isHTML ? (
                            <div dangerouslySetInnerHTML={{ __html: message }} />
                        ) : (
                            message
                        )}
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "chat-details")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "chat-time")} tag="div">
                        {time}
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "circle-divider")} tag="div" />
                    {dropdownSuggestions()}
                </_Builtin.Block>
            </_Builtin.Block>
    );};


    const clickHandler = (data = "") => {
        console.log("clicked", data);
    };

    const dropdownSuggestions = () => (
        <_Builtin.Block className={_utils.cx(_styles, "dropdown-suggestion")} tag="div">
            <_Builtin.DropdownWrapper className={_utils.cx(_styles, "dropdown-suggestion-div")} tag="div" delay={0} hover={false}>
                <_Builtin.DropdownToggle className={_utils.cx(_styles, "dropdown-suggestion-toggle")} tag="div">
                    <_Builtin.Block tag="div">{"Show suggestions"}</_Builtin.Block>
                    <_Builtin.Icon
                        className={_utils.cx(_styles, "icon-3")}
                        widget={{
                            type: "icon",
                            icon: "dropdown-toggle"
                        }}
                    />
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList tag="nav">
                    {DROPDOWN_OPTIONS.map((option, index) => (
                        <_Builtin.DropdownLink
                            key={index}
                            onClick={() => clickHandler(option.label)}
                            options={{
                                href: option.value
                            }}
                        >
                            {option.label}
                        </_Builtin.DropdownLink>
                    ))}
                </_Builtin.DropdownList>
            </_Builtin.DropdownWrapper>
        </_Builtin.Block>
    );

    return (
        <_Component className={_utils.cx(_styles, "page-wrapper")} tag="div">
            <SidebarNav />
            <_Builtin.Block className={_utils.cx(_styles, "main-content")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "page-top-nav")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "tophd-page-name")} tag="div">
                        <_Builtin.Block tag="div">{"Conversations"}</_Builtin.Block>
                        <_Builtin.Block className={_utils.cx(_styles, "icon-breadcrumbs")} tag="div">
                            <_Builtin.Image loading="lazy" width="auto" height="auto" alt="" src="/images/Asset-54.svg" />
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">{"Transcript"}</_Builtin.Block>
                    </_Builtin.Block>
                    <TopNavControls />
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "main-page-container")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "main-page-content-div")} tag="div">
                        <CustomerName />
                        <_Builtin.Block className={_utils.cx(_styles, "main-page-bot")} tag="div">
                            <_Builtin.Block className={_utils.cx(_styles, "convo-trasncript")} tag="div" ref={chatContainerRef}>
                                {chatData.map((chatItem, index) => {
                                    if (chatItem.status === 3)
                                        return systemMessage(chatItem.message, chatItem.time, index);
                                    return chat(chatItem.status === 2, chatItem.message, chatItem.time, index);
                                })}
                            </_Builtin.Block>
                            <_Builtin.Block className={_utils.cx(_styles, "transcript-timeline")} tag="div">
                                <TranscriptControls />
                                <Waveform />
                                <Emotions />
                            </_Builtin.Block>
                        </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "transcript-page-column")} tag="div">
                        <TrasncriptPageColumn />
                        <ColumnSidebar onToggleChecklist={toggleChecklist} />
                    </_Builtin.Block>
                    {isChecklistVisible && <Checklist />}
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
