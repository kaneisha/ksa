import React, { useContext, useEffect, useState } from 'react';
import utils from '../../../data/utils.json';
import VideoContainer from '../../UI/VideoContainer/VideoContainer';
import './Home.scss';
import UIContext from '../../../Context/UIContext';
import HomeIcons from '../HomeIcons/HomeIcons';
import { useSpring, animated } from 'react-spring';
import ParalaxContainer from '../../UI/ParalaxContainer/ParalaxContainer';
import VideoParalaxContainer from '../../UI/VideoParalaxContainer/VideoParalaxContainer';

const Home = (props) => {
    const uiCx = useContext(UIContext);

    // const stageKeys = Object.keys(uiCx.homeStages);
    // let stageClasses = "";
    // stageKeys.map((i) => {
    //     if (uiCx.homeStages[i]) stageClasses = stageClasses + " stage-" + i;
    // })

    const scrollToElem = uiCx.scrollToElem;

    const [loaded, setLoaded] = useState(false);
    const showSpring = useSpring({
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0px)" : "translateY(500px)"
    });

    useEffect(() => {
        setLoaded(true);
        // setTimeout(() => {
        // }, 1200)

        uiCx.setUseBlackbars(true);
        uiCx.setUseBackground(true);
    }, [])

    return (
        <div className="Home">
            <VideoParalaxContainer scrollPos={props.scrollPos} idName="home-video-01">
                <VideoContainer
                    video={'advocates'}
                    videoMobile={'advocates-v'}
                    stage={null}
                    blackBars={true}
                    arrowNext={() => scrollToElem("home-video-02")}
                />
            </VideoParalaxContainer>
            <ParalaxContainer scrollPos={props.scrollPos}>
                <HomeIcons blockName="homeIcons-01">
                    <h1>DOCUMENTARIES</h1>
                </HomeIcons>
            </ParalaxContainer>
            <VideoParalaxContainer scrollPos={props.scrollPos} idName="home-video-02">
                <VideoContainer video={'orson'} videoMobile={'orson-v'} stage='01' />
            </VideoParalaxContainer>
            {/* <VideoContainer video={'Orson sound v4'} stage='01' idName="home-video-02" /> */}
            <ParalaxContainer scrollPos={props.scrollPos}>
                <HomeIcons blockName="homeIcons-02">
                    <h3>CULTURE & ART</h3>
                    <h3>SOCIAL ISSUES</h3>
                    <h3>SCIENCE & THE WORLD</h3>
                </HomeIcons>
            </ParalaxContainer>
            <VideoParalaxContainer scrollPos={props.scrollPos} idName="home-video-03">
                <VideoContainer video={'la'} videoMobile={'la-v'} stage='02' />
            </VideoParalaxContainer>
            {/* <VideoContainer video={'Moon sound v3'} stage='02' idName="home-video-03" /> */}
            {/* <ParalaxContainer scrollPos={props.scrollPos} offset={20}>
                <HomeIcons>
                    <h3>CULTURE & ART</h3>
                    <h3>SOCIAL ISSUES</h3>
                    <h3>SCIENCE & THE WORLD</h3>
                </HomeIcons>
            </ParalaxContainer> */}
            <div className={'home-sidebar'}>
                <button onClick={() => scrollToElem("home-video-01")}><span className={(uiCx.currentStage === "home-video-01") ? "icon-circle" : "icon-circle-empty"}></span></button>
                <button onClick={() => scrollToElem("home-video-02")}><span className={(uiCx.currentStage === "home-video-02") ? "icon-circle" : "icon-circle-empty"}></span></button>
                <button onClick={() => scrollToElem("home-video-03")}><span className={(uiCx.currentStage === "home-video-03") ? "icon-circle" : "icon-circle-empty"}></span></button>
            </div>
        </div>
    )
}

export default Home