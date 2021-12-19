import React, { useContext, useEffect, useRef, useState } from 'react';
import './VideoContainer.scss';
import handleViewport from 'react-in-viewport';
import utils from '../../../data/utils';
import { useSpring, animated } from "react-spring";
import UIContext from '../../../Context/UIContext';
import BtnIcon from '../BtnIcon/BtnIcon';
import { useWindowDimensions } from '../../Utils/WindowDimensionsProvider';
import enableInlineVideo from 'iphone-inline-video';
import lerp from 'lerp';

const VideoContainer = (props) => {

    const { inViewport, forwardedRef } = props;
    const videoRef = useRef(null);
    const vpSize = useWindowDimensions();
    const [videoFile, setVideoFile] = useState(null);
    const [posterFile, setPosterFile] = useState(null);
    const [volumeIcon, setVolumeIcon] = useState(false);

    const [loaded, setLoaded] = React.useState(false);
    const uiCx = useContext(UIContext);

    if (forwardedRef) {
        if (videoRef.current != null) {
            if (inViewport) {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(_ => { })
                        .catch(error => { });
                }

            } else {
                videoRef.current.pause();
            }
        }
    }

    const videoSpring = useSpring({
        opacity: loaded ? 1 : 0
    });

    const handleLoaded = () => {
        setLoaded(true);
    }

    React.useEffect(() => {
        videoRef.current.addEventListener("loadeddata", handleLoaded);
        enableInlineVideo(videoRef.current);

        return () => {
            videoRef.current.removeEventListener("loadeddata", handleLoaded);
        }
    }, []);

    useEffect(() => {
        const videoFilePath = (vpSize.width < vpSize.breakpoints.md)
            ? require('../../../assets/video/v03/' + props.videoMobile + '.mp4')
            : require('../../../assets/video/v03/' + props.video + '.mp4');
        setVideoFile(videoFilePath);

        const videoPosterPath = (vpSize.width < vpSize.breakpoints.md)
            ? require('../../../assets/video/' + props.videoMobile + '.jpg')
            : require('../../../assets/video/' + props.video + '.jpg');
        setPosterFile(videoPosterPath)
    }, [vpSize.width])

    const blackBarsClass = (props.blackBars) ? ' black-bars' : '';
    const arrowNext = (props.arrowNext) ? <>
        <div className="blackbar-button-wrapper">
            <BtnIcon clicked={props.arrowNext} icon={"arrow-down"} />
        </div>
    </> : null;

    // useEffect(() => {
    //     setVolumeIcon(!videoRef.current.muted);
    // }, [videoRef.current.muted]);

    let handleAudio = null;
    if (videoRef !== null) {
        handleAudio = () => {
            const currentVideo = videoRef.current;
            const newMuted = !currentVideo.muted

            // Set Muted 
            if (!newMuted) {
                currentVideo.muted = newMuted;
                currentVideo.volume = 0;
            }

            setVolumeIcon(!newMuted);

            // Fade In/Out
            const lerpStep = 0.01;
            const maxVolume = 0.6;
            const currentVolume = (newMuted) ? maxVolume : 0;
            const targetVolume = (newMuted) ? 0 : maxVolume;

            let lerpAlpha = 0;

            const fadeInterval = setInterval(() => {
                currentVideo.volume = lerp(currentVolume, targetVolume, lerpAlpha);

                lerpAlpha = lerpAlpha + lerpStep;

                // Clear interval
                if (lerpAlpha > 1) {
                    clearInterval(fadeInterval);

                    currentVideo.muted = newMuted;
                    setVolumeIcon(!newMuted);
                }

            }, 10);
        }
    }

    return (
        <div
            className={"VideoContainer " + blackBarsClass}
        // id={props.idName}
        >
            <div className="video-overlay" ref={forwardedRef}></div>
            <animated.video
                style={videoSpring}
                ref={videoRef}
                src={videoFile}
                type="video/mp4"
                muted="muted"
                playsInline
                poster={posterFile}
                loop></animated.video>
            <div className="audio-controls">
                <BtnIcon className="btn-audio" clicked={handleAudio} icon={(volumeIcon) ? "volume-high" : "volume-low"} />
            </div>
            {arrowNext}
        </div>
    );
};

export default handleViewport(VideoContainer);
