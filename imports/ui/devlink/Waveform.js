"use client";
import React, { useEffect, useRef } from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Waveform.module.css";
import WaveSurfer from "wavesurfer.js";
import axios from "axios";
// eslint-disable-next-line func-style
export function Waveform({ as: _Component = _Builtin.Block }) {
    const waveSurferRef = useRef(null);

    useEffect(() => {
        const initializeWaveSurfer = async () => {
            const wavesurfer1 = WaveSurfer.create({
                container: "#waveform1",
                waveColor: "#cacaca",
                progressColor: "#957df3",
                height: 120,
                barWidth: 2,
                barGap: 1,
                barRadius: 2,
                barHeight: 3
            });
            const wavesurfer2 = WaveSurfer.create({
                container: "#waveform2",
                waveColor: "#cacaca",
                progressColor: "#957df3",
                height: 120,
                barWidth: 2,
                barGap: 1,
                barRadius: 2,
                barHeight: 3
            });

            try {
                const response = await axios({
                    method: "post",
                    url: "https://8359-180-190-252-52.ngrok-free.app/audio",
                    responseType: "blob"
                });

                const audioBlob = response.data;
                const objectUrl = URL.createObjectURL(audioBlob);
                wavesurfer1.load(objectUrl);
                wavesurfer2.load(objectUrl);

                // Clean up the object URL to free up memory
                return () => {
                    URL.revokeObjectURL(objectUrl);
                    wavesurfer.destroy();
                };
            } catch (error) {
                console.error("Error loading audio:", error);
            }

            let isWaveform1Ready = false;
            let isWaveform2Ready = false;

            const playBoth = function () {
                if (isWaveform1Ready && isWaveform2Ready) {
                    wavesurfer1.play();
                    wavesurfer2.play();
                    updateDurationInfo(); // Update duration info when playing starts
                }
            };
            // Event listeners for when audio files are ready
            wavesurfer1.on("ready", function () {
                isWaveform1Ready = true;
            });
            wavesurfer2.on("ready", function () {
                isWaveform2Ready = true;
                // Add regions to waveform2
                wavesurfer2.addRegion({
                    id: "region1",
                    start: 8.5,
                    end: 9,
                    color: "rgba(255, 0, 0, 0.2)",
                    waveColor: "rgba(255, 0, 0, 0.5)",
                    drag: false,
                    resize: false,
                    height: 120
                });
                wavesurfer2.addRegion({
                    id: "region2",
                    start: 37.5,
                    end: 38,
                    color: "rgba(0, 255, 0, 0.2)",
                    waveColor: "rgba(0, 255, 0, 0.5)",
                    drag: false,
                    resize: false,
                    height: 120
                });
                // Handle region interaction
                wavesurfer2.on("region-click", function (region, e) {
                    e.stopPropagation(); // Prevent waveform click event
                    region.play(); // Play the region when clicked
                });
                wavesurfer2.on("region-in", function (region) {
                    wavesurfer2.setWaveColor(region.options.waveColor); // Change wave color when entering region
                });
                wavesurfer2.on("region-out", function (region) {
                    wavesurfer2.setWaveColor("#cacaca"); // Restore original wave color when exiting region
                });
            });

            const togglePlayPause = function () {
                if (wavesurfer1.isPlaying() && wavesurfer2.isPlaying()) {
                    wavesurfer1.pause();
                    wavesurfer2.pause();
                } else {
                    wavesurfer1.play();
                    wavesurfer2.play();
                }
            };
            // Assign the toggle function to the button
            document.getElementById("playButton").addEventListener("click", togglePlayPause);
            // Function to update duration information
            const updateDurationInfo = function () {
                const totalDuration = wavesurfer1.getDuration() + wavesurfer2.getDuration();
                const current1 = wavesurfer1.getCurrentTime();
                const current2 = wavesurfer2.getCurrentTime();
                const currentTime = current1 + current2;
                document.getElementById("durationInfo").textContent = `${formatTime(currentTime)} | ${formatTime(totalDuration)}`;
            };
            // Format time to mm:ss
            const formatTime = function (timeInSeconds) {
                const minutes = Math.floor(timeInSeconds / 60);
                const seconds = Math.floor(timeInSeconds % 60);
                const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                return formattedTime;
            };
            // Update duration info continuously while playing
            wavesurfer1.on("audioprocess", updateDurationInfo);
            wavesurfer2.on("audioprocess", updateDurationInfo);
            // Update duration info initially
            updateDurationInfo();
        };
        initializeWaveSurfer();
    }, []);
    return (
        <_Component className={_utils.cx(_styles, "waveform-div")} tag="div">
            <_Builtin.Block className={_utils.cx(_styles, "trasncript-people-label")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "waveform-label-div")} tag="div">
                    <_Builtin.Block tag="div">{"Agent"}</_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "waveform-label-div")} tag="div">
                    <_Builtin.Block tag="div">{"Customer"}</_Builtin.Block>
                </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "trasncript-wave-div")} tag="div">
                <_Builtin.Block className={_utils.cx(_styles, "trasncript-percentage-indicator")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "trasncript-percentage")} tag="div">
                        <_Builtin.Block tag="div">{"64%"}</_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block className={_utils.cx(_styles, "trasncript-percentage")} tag="div">
                        <_Builtin.Block tag="div">{"36%"}</_Builtin.Block>
                    </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "waveform-container")} tag="div">
                    <_Builtin.Block className={_utils.cx(_styles, "agent-waveform")} tag="div" id="waveform1" ref={waveSurferRef} />
                    <_Builtin.Block className={_utils.cx(_styles, "customer-waveform")} tag="div" id="waveform2" />
                </_Builtin.Block>
                <_Builtin.Block className={_utils.cx(_styles, "trasncript-divider")} tag="div" />
            </_Builtin.Block>
        </_Component>
    );
}
