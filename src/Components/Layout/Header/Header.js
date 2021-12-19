import React, { useContext } from 'react';
import utils from '../../../data/utils.json';
import './Header.scss';
import BtnIcon from '../../UI/BtnIcon/BtnIcon';
import UIContext from '../../../Context/UIContext';
import { NavLink } from 'react-router-dom';
import { useWindowDimensions } from '../../Utils/WindowDimensionsProvider';

const Header = (props) => {
    const uiCx = useContext(UIContext);
    const vpSize = useWindowDimensions();
    const headerBlackbar = (props.blackbars) ? ' blackbars ' : '';
    const lightTheme = (props.lightTheme) ? ' light-theme ' : '';

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const topNavRender = (vpSize.width < vpSize.breakpoints.md) ? (
        <div className="main-nav">
            <BtnIcon icon={"menu"} clicked={uiCx.drawerTogglerHandler} />
        </div>
    ) : (
        <ul className="list-unstyled main-nav">
            <li><NavLink to={utils.homeUrl} exact onClick={scrollToTop}>Home</NavLink></li>
            <li><NavLink to={utils.homeUrl + "/about"}>About</NavLink></li>
            <li><NavLink to={utils.homeUrl + "/projects"}>Recent Projects</NavLink></li>
            <li><NavLink to={utils.homeUrl + "/contact"}>Contact</NavLink></li>
            {/* <li><button onClick={() => uiCx.setPlayAudio(!uiCx.playAudio)}>Audio</button></li> */}
        </ul>
    );

    return (
        <div className={"Header " + headerBlackbar + lightTheme}>
            <NavLink onClick={scrollToTop} to={utils.homeUrl} exact className={'logo-wrapper'}>
                <span className={"icon-logo-ksa"}></span>
            </NavLink>
            {topNavRender}
            {!lightTheme && <div className="noise"></div>}
        </div>
    )
}

export default Header