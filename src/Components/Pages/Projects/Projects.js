import React, { useEffect, useState, useContext } from 'react';
import utils from '../../../data/utils.json';
import ProjectItem from './ProjectItem';
import UIContext from '../../../Context/UIContext';
import { scrollToPrevAccordeon } from '../../Utils/ScrollToPosition/ScrollToPosition';
import { useWindowDimensions } from '../../Utils/WindowDimensionsProvider';
import './Projects.scss';
import projectsData from '../../../data/projects.json';
import ReactHtmlParser from 'react-html-parser';

import image1 from '../../../assets/img/2x/The Advocates Press Notes.jpg';
import image2 from '../../../assets/img/2x/orson.jpg';
import image3 from '../../../assets/img/2x/voyage.jpg';
import image4 from '../../../assets/img/2x/ksa-default.jpg';

import videoPoster from '../../../assets/img/1x/poster.jpg';
import trailer from '../../../assets/video/trailer.mp4';

const Projects = () => {
    const uiCx = useContext(UIContext);
    const [open, setOpen] = useState(null);
    const vpSize = useWindowDimensions();

    useEffect(() => {
        // setOpen(0);
        uiCx.setUseBlackbars(false);
        uiCx.setUseBackground(true);
        setTimeout(() => {
            setOpen(0)
        }, 200)
    }, [])

    // open animation
    let projectHeight = 80;
    let scrollOffset = 0;
    if (vpSize.width > vpSize.breakpoints['md']) {
        projectHeight = 140;
        scrollOffset = 20;
    }
    if (vpSize.width > vpSize.breakpoints['xl']) {
        projectHeight = 240;
        scrollOffset = 40;
    }

    const handleClick = (id) => {
        const targetId = (open === id) ? null : id;
        setOpen(targetId);
        scrollToPrevAccordeon(id, projectHeight - scrollOffset);
    }

    const renderProjects = (projectsData.length) ? projectsData.map(((project, id) =>
        <ProjectItem
            key={"project-" + id}
            collapsed={open}
            image={project.image}
            projectTitle={project.title}
            projectId={id}
            clicked={handleClick}
            setCollapsed={setOpen}
            video={(project.trailer) ? project.trailer : null}
            poster={(project["trailer-poster"]) ? project["trailer-poster"] : null}
            projectHeight={projectHeight}
        >
            <div className="colored-strong">
                {ReactHtmlParser(project.body)}
            </div>
        </ProjectItem>
    )) : null;

    return (
        <div className="Projects">
            {renderProjects}
        </div>
    )
}

export default Projects