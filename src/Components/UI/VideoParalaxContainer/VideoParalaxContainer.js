import React, { useEffect, useState, useContext } from 'react';
import { handleViewport } from 'react-in-viewport';
import utils from '../../../data/utils.json';
import './VideoParalaxContainer.scss';
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import useWindowSize from "@rehooks/window-size";
import UIContext from '../../../Context/UIContext';
import { useWindowDimensions } from '../../Utils/WindowDimensionsProvider';

const VideoParalaxContainer = (props) => {
    const offset = (!props.offset) ? 0 : props.offset;
    const { inViewport, forwardedRef } = props;
    const uiCx = useContext(UIContext);

    const options = {
        throttle: 0
    };

    const scrollPosition = useWindowScrollPosition(options);
    const windowSize = useWindowSize();
    const vpSize = useWindowDimensions();

    const [translateAmount, setTranslateAmount] = useState(0);

    const getTranslateAmount = () => {
        // if (inViewport) {
        // get the element top position
        const elementTop = forwardedRef.current.offsetTop;

        // get scroll position
        const scrollPos = scrollPosition.y;
        // const scrollPos = props.scrollPos;

        // get window height
        const windowHeight = windowSize.innerHeight;

        // calculate position zero of the element
        // let currentAmount = elementTop;
        // console.log(currentAmount)

        let currentAmount = ((elementTop) - scrollPos);
        currentAmount = (currentAmount * 0.6) + offset;

        if (vpSize.width >= vpSize.breakpoints.lg) {
            setTranslateAmount(currentAmount);
        } else {
            setTranslateAmount(0);
        }

        // }
    }

    useEffect(() => {
        getTranslateAmount();
    }, [])

    useEffect(() => {
        if (vpSize.width >= vpSize.breakpoints.lg) {
            getTranslateAmount();
        }
        // setTranslateAmount(windowSize.y - scrollPosition.y);
    }, [scrollPosition, windowSize]);

    // style={{ transform: 'translateY(' + translateAmount + 'px)' }}

    useEffect(() => {
        if (inViewport) uiCx.setCurrentStage(props.idName);
    }, [inViewport])

    return (
        <div className={'VideoParalaxContainer ' + (!inViewport && 'hidden')} ref={forwardedRef} id={props.idName}>
            <div className="paralax-mask">
                <div className="inner" style={{ transform: 'translateY(' + translateAmount + 'px)' }}>
                    {/* <div className="pc__visible-block"> */}
                    {props.children}
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default handleViewport(VideoParalaxContainer);