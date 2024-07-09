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
import { CALL_EVENTS } from "../../api/classes/client/callmanager/TwilioStreams";
import Draggable from "react-draggable";

const sampleChatData = [
    // {
    //     status: 2,
    //     message: "Hello, how can I help you today?",
    //     time: "12:00 PM"
    // },
    // {
    //     status: 1,
    //     message: "I'm having trouble with my account",
    //     time: "12:01 PM"
    // },
    // {
    //     status: 2,
    //     message: "I can help with that. What seems to be the problem?",
    //     time: "12:02 PM"
    // },
    // {
    //     status: 3,
    //     message: "I can't log in",
    //     time: "12:03 PM"
    // },
    // {
    //     status: 4,
    //     message: "I can help you reset your password. Please provide me with your email address.",
    //     time: "12:04 PM"
    // },
];

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
function Dialer({ twilioCall, onClose }) {
    const [number, setNumber] = useState('');
    const [currentCall, setCurrentCall] = useState(null);

    const makeCall = () => {
        if (twilioCall.isAValidPhoneNumber(number)) {
            const call = twilioCall.makeCall(number);
            setCurrentCall(call);
        } else {
            alert('Invalid phone number');
        }
    };

    const hangUp = () => {
        if (currentCall) {
            currentCall.disconnect();
            setCurrentCall(null);
        }
    };

    return (
        <Draggable handle=".modal-header">
            <div className="modal dialer">
                <div className="modal-header">
                    Dialer
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <input
                        type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Enter phone number"
                    />
                    <button onClick={makeCall} disabled={currentCall}>Call</button>
                    {currentCall && <button onClick={hangUp}>Hang Up</button>}
                </div>
            </div>
        </Draggable>
    );
}
function IncomingCall({ callData, onClose }) {
    const [callStatus, setCallStatus] = useState('incoming');
    const [duration, setDuration] = useState(0);
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        let timer;
        if (callStatus === 'active') {
            timer = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [callStatus]);

    useEffect(() => {
        if (Client.CallManager.IsMuted) {
            setMuted(true);
        } else {
            setMuted(false);
        }
    }, [Client.CallManager.IsMuted]);

    useEffect(() => {
        Client.CallManager.Event.on(CALL_EVENTS.DISCONNECT, () => {
            onClose();
        });
        Client.CallManager.Event.on(CALL_EVENTS.ACCEPT, () => {
            setCallStatus('active');
        });
    }, []);

    const acceptCall = () => {
        Client.CallManager.acceptIncomingCall();
    };

    const rejectCall = () => {
        Client.CallManager.endCall();
    };

    const formatDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Draggable handle=".modal-header">
            <div className="modal incoming-call">
                <div className="modal-header">
                    {callStatus === 'incoming' ? 'Incoming Call' : 'Active Call'}
                </div>
                <div className="modal-body">
                    <p>From: {callData.From}</p>
                    {callStatus === 'active' && (
                        <>
                            <p>Status: Active</p>
                            <p>Duration: {formatDuration(duration)}</p>
                            <p>Call SID: {callData.CallSid}</p>
                        </>
                    )}
                    {callStatus === 'incoming' && (
                        <button onClick={acceptCall}>Accept</button>
                    )}
                    <button onClick={rejectCall}>
                        {callStatus === 'incoming' ? 'Reject' : 'End Call'}
                    </button>
                    {callStatus === 'active' && (
                        <button onClick={() => {
                            console.log("muted", muted);
                            if (!muted) {
                                Client.CallManager.muteCall();
                            } else {
                                Client.CallManager.unmuteCall();
                            }
                        }}>{muted ? "Unmute" : "Mute"}</button>
                    )}
                </div>
            </div>
        </Draggable>
    );
}


// eslint-disable-next-line func-style
export function PageTranscript({ as: _Component = _Builtin.Block }) {
    const [isChecklistVisible, setIsChecklistVisible] = useState(false);
    const [chatData, setChatData] = useState(sampleChatData);

    const [incomingCall, setIncomingCall] = useState(null);
    const [showDialer, setShowDialer] = useState(false);

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
        Client.getToken().then(token => {
            console.log("token", token);
            Client.CallManager.initialize(token);
            Client.CallManager.Event.on(CALL_EVENTS.INCOMING, (call) => {
                console.log("incoming call", call);
                setIncomingCall(call.parameters);
            });
        });
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
                boxSizing: "border-box",
                fontSize: "1.6em"
            }} tag="div" key={index}>
                <_Builtin.Block tag="div">
                    <_Builtin.Block tag="div">SYSTEM: {message} - {time}</_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
        );
    };
    const coachMessage = (message, time, index) => {

        return (
            <_Builtin.Block className={_utils.cx(_styles, "bubble-container", "right")} tag="div" key={index}>
                <_Builtin.Block className={_utils.cx(_styles, "card-bubble", "white")} tag="div"
                    style={{ backgroundImage: "linear-gradient(#dbcc96, #fff)", fontSize: "1.6em" }}>
                    <_Builtin.Block tag="div">
                        <b>COACH:</b> {message}
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "chat-details")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "chat-time")} tag="div">
                        {time}
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "circle-divider")} tag="div" />
                </_Builtin.Block>
            </_Builtin.Block>
        );
    };
    const chat = (isRight, message, time, index) => {
        const isHTML = /<\/?[a-z][\s\S]*>/i.test(message);
        return (
            <_Builtin.Block className={_utils.cx(_styles, "bubble-container", isRight ? "right" : "")} tag="div" key={index}>
                <_Builtin.Block className={_utils.cx(_styles, "card-bubble", isRight ? "white" : "")} tag="div" style={{ fontSize: "1.6em" }}>
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
        );
    };


    const clickHandler = (data = "") => {
        console.log("clicked", data);
    };

    const toggleShowDialer = () => {
        setShowDialer(!showDialer);
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
                                    switch (chatItem.status) {
                                        case 3:
                                            return systemMessage(chatItem.message, chatItem.time, index);
                                        case 4:
                                            return coachMessage(chatItem.message, chatItem.time, index);
                                        default:
                                            return chat(chatItem.status === 2, chatItem.message, chatItem.time, index);
                                    }
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
                        <ColumnSidebar onToggleChecklist={toggleChecklist} setShowDialer={toggleShowDialer} />
                        {incomingCall && <IncomingCall callData={incomingCall} onClose={() => setIncomingCall(null)} />
                        }
                        {showDialer && <Dialer twilioCall={Client.CallManager.TwilioCall} onClose={() => setShowDialer(false)} />}
                    </_Builtin.Block>
                    {isChecklistVisible && <Checklist />}
                </_Builtin.Block>
            </_Builtin.Block>
        </_Component>
    );
}
