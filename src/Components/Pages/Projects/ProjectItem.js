import React, { useState, useEffect, useRef } from 'react';
import utils from '../../../data/utils.json';
import { useMeasure } from "react-use";
import './Projects.scss';
import { useSpring, animated } from 'react-spring';
import { useWindowDimensions } from '../../Utils/WindowDimensionsProvider';

const Projects = (props) => {
    // const defaultHeight = props.projectHeight + "px";

    const [ref, { height }] = useMeasure();
    const [isOpen, setIsOpen] = useState(null);
    const [defaultHeight, setDefaultHeight] = useState(100);
    const [contentHeight, setContentHeight] = useState(100);
    const [titleHeight, setTitleHeight] = useState(100);
    const [thumbnailOffset, setThumbnailOffset] = useState(50);
    const thumbnail = useRef(null);
    const title = useRef(null);
    const vpSize = useWindowDimensions();

    // Image load
    const requestImageFile = require.context('../../../assets/img', true);

    // Animations
    const expand = useSpring({
        // config: { friction: 10 },
        height: isOpen ? `${contentHeight}px` : `${defaultHeight + thumbnailOffset}px`
    });

    // Get height
    useEffect(() => {
        //Sets initial height
        setContentHeight(height);

        //Adds resize event listener
        window.addEventListener("resize", setContentHeight(height));
        window.addEventListener("resize", setDefaultHeight(thumbnail.current.offsetHeight));
        window.addEventListener("resize", setTitleHeight(title.current.offsetHeight));

        // Clean-up
        return window.removeEventListener("resize", setContentHeight(height));
    }, [height]);

    useEffect(() => {
        setIsOpen(props.projectId === props.collapsed);
        // console.log(thumbnail.current.offsetHeight)
        // setDefaultHeight(thumbnail.current.offsetHeight + "px")
    }, [props.collapsed])

    useEffect(() => {
        setTitleHeight(title.current.offsetHeight);
    });

    useEffect(() => {
        const newOffset = (vpSize.width < vpSize.breakpoints.lg)
            ? 25
            : 50;
        setThumbnailOffset(newOffset);
    }, [vpSize.width]);

    return (
        <animated.div style={expand} className={"ProjectItem " + (!isOpen && 'collapsed')} id={'project-' + props.projectId}>
            <div className="project-inner" ref={ref}>
                <div className="flex">
                    <div className="project-sidebar fluid-images">
                        <img onClick={() => props.clicked(props.projectId)}
                            className={"interactive project-image__id-" + props.projectId}
                            src={requestImageFile(`./${props.image}`)}
                            alt={props.title}
                            ref={thumbnail}
                            onLoad={() => setDefaultHeight(thumbnail.current.offsetHeight)}
                        />
                    </div>
                    <div className="project-body body-text" style={(isOpen) ? { transform: 'translateY(0px)' } : { transform: 'translateY(' + ((defaultHeight / 2) - (titleHeight / 2)) + 'px)' }}>
                        <h1 className="title interactive" ref={title} onClick={() => props.clicked(props.projectId)}><span className="title-inner">{props.projectTitle}</span><span className="icon"> <span className="plus">+</span><span className="minus">-</span> </span></h1>
                        <div className="project-body-inner">
                            {props.children}
                        </div>
                    </div>
                    {
                        props.trailer &&
                        <div className="project-trailer fluid-images">
                            {/* {image && <img src={image} alt="" />} */}
                            <img src={requestImageFile(`./${props.poster}`)} alt="" />
                        </div>
                    }
                </div>
                {(props.video && <video poster={requestImageFile(`./${props.poster}`)} controls src={requestImageFile(`./${props.video}`)} type="video/mp4"></video>)}
                <p>&nbsp;</p>
            </div>
        </animated.div>
    )

};

export default Projects