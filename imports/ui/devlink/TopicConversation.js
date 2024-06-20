"use client";
import React, { useEffect, useRef } from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./TopicConversation.module.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Exporting from "highcharts/modules/exporting";
import HighchartsMore from "highcharts/highcharts-more";
Exporting(Highcharts);
HighchartsMore(Highcharts);

import "../stylesheets/highchart.scss";

const _interactionsData = JSON.parse(
    '{"events":{"e-233":{"id":"e-233","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-28","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-234"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"25181cfa-0032-558a-f115-f94669d851ee","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"25181cfa-0032-558a-f115-f94669d851ee","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718384851609}},"actionLists":{"a-28":{"id":"a-28","title":"[open] convo column","actionItemGroups":[{"actionItems":[{"id":"a-28-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".topic-page-column-div.conversation","selectorGuids":["b5a6f072-ff94-d963-3927-24c971ffb1fa","4dabd16d-ec70-13fe-2da9-4269025137e6"]},"value":"block"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718384857653}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

// eslint-disable-next-line func-style
export function TopicConversation({ as: _Component = _Builtin.Block }) {
    _interactions.useInteractions(_interactionsData, _styles);
    const chartContainerRef = useRef(null);

    const options = {
        chart: {
            type: "packedbubble",
            height: "100%",
            zoomType: "xy",
            events: {
                click: function (event) {
                    document.querySelector("#topic-column").style.display = "block";
                }
            }
        },
        title: {
            text: null
        },
        plotOptions: {
            packedbubble: {
                minSize: "60%",
                maxSize: "120%",
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: "{point.name}",
                    style: {
                        color: "black",
                        textOutline: "none",
                        fontWeight: "normal",
                        fontSize: "1rem", // Increase font size for labels
                        width: "90px", // Limit the width of the label to wrap inside the circle
                        textAlign: "center" // Align labels to the center
                    },
                    allowOverlap: true, // Allow labels to overlap
                    padding: 5, // Add padding between label and bubble
                    align: "center", // Align labels to the center horizontally
                    verticalAlign: "middle" // Align labels to the middle vertically
                }
            }
        },
        legend: {
            enabled: false // Remove legend
        },
        series: [
            {
                name: "Technical Support",
                data: [
                    {
                        name: "Software Issues",
                        value: 767.1
                    },
                    {
                        name: "Hardware Problems",
                        value: 20.7
                    },
                    {
                        name: "Installation Assistance",
                        value: 97.2
                    },
                    {
                        name: "Configuration Help",
                        value: 111.7
                    },
                    {
                        name: "Error Messages",
                        value: 158.1
                    }
                ]
            },
            {
                name: "Billing and Payments",
                data: [
                    {
                        name: "Billing Inquiries",
                        value: 8.2
                    },
                    {
                        name: "Payment Plans",
                        value: 9.2
                    },
                    {
                        name: "Payment Processing Issues",
                        value: 13.1
                    },
                    {
                        name: "Refunds",
                        value: 14.1
                    },
                    {
                        name: "Billing Disputes",
                        value: 14.1
                    }
                ]
            },
            {
                name: "Product Support",
                data: [
                    {
                        name: "Product Information",
                        value: 409.4
                    },
                    {
                        name: "Product Features",
                        value: 34.1
                    },
                    {
                        name: "Product Usage Guidance",
                        value: 7.1
                    }
                ]
            }
        ]
    };

    return (
        <_Component className={_utils.cx(_styles, "topic-discovery-main-content")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "topic-main-container")} tag="div">
                <div className="code-embed" style={{ width: "100%", height: "100%" }}>
                    <HighchartsReact highcharts={Highcharts} options={options} ref={chartContainerRef} />
                </div>
            </_Builtin.Block>
        </_Component>
    );
}
