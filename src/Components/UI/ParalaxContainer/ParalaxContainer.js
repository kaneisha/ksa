import React, { useEffect, useState, useContext } from 'react';
import { handleViewport } from 'react-in-viewport';
import utils from '../../../data/utils.json';
import './ParalaxContainer.scss';
import useWindowScrollPosition from "@rehooks/window-scroll-position";
import useWindowSize from "@rehooks/window-size";
import UIContext from '../../../Context/UIContext';
import { useWindowDimensions } from '../../Utils/WindowDimensionsProvider';

const ParalaxContainer = (props) => {
    const uiCx = useContext(UIContext);
    const offset = (!props.offset) ? 0 : props.offset;
    let { inViewport, forwardedRef } = props;
    // const [scrollPosition, setScrollPosition] = useState(0);
    // console.log(scrollPosition.y)

    const vpSize = useWindowDimensions();

    const options = {
        throttle: 0
    };

    // window scroll position
    const scrollPosition = useWindowScrollPosition(options);

    // const handleScroll = (event) => {
    //     // const amount = event.target.body.scrollTop;
    //     const amount = window.scrollY;

    //     // console.log(amount)
    //     setScrollPosition(amount);
    // }

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     // document.body.style.setProperty('--scroll',window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    // }, []);

    const windowSize = useWindowSize();

    const [translateAmount, setTranslateAmount] = useState(0);

    const getTranslateAmount = () => {
        if (inViewport && vpSize.width >= vpSize.breakpoints.lg) {
            // get the element top position
            const elementTop = forwardedRef.current.offsetTop;

            // get scroll position
            const scrollPos = scrollPosition.y;
            // const scrollPos = props.scrollPos;

            // get window height
            const windowHeight = windowSize.innerHeight;

            // calculate position zero of the element
            let currentAmount = ((elementTop) - scrollPos) - (windowHeight / 1.9);
            currentAmount = (currentAmount / 1.1) + offset;

            setTranslateAmount(currentAmount);
        } else {
            inViewport = false;
        }
    }

    useEffect(() => {
        getTranslateAmount();
    }, [])

    useEffect(() => {
        getTranslateAmount();
        // setTranslateAmount(windowSize.y - scrollPosition);

        // if (scrollPosition > 0) {
        //     uiCx.setUseBlackbars(false);
        // } else {
        //     uiCx.setUseBlackbars(true);
        // }
    }, [scrollPosition, windowSize]);

    return (
        <div className={'ParalaxContainer ' + ((!inViewport && vpSize.width >= vpSize.breakpoints.lg) && 'hidden')} ref={forwardedRef}>
            <div className="pc__size-block">
                <div className="size-inner">
                    {props.children}
                </div>
                <div className="paralax-mask">
                    <div className="pc__visible-block">
                        {/* <div className="paralax-mask"> */}
                        <div className="inner" style={{ transform: 'translateY(' + translateAmount + 'px)' }}>
                            {props.children}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default handleViewport(ParalaxContainer);