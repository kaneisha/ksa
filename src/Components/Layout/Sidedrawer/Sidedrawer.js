import React, { useContext } from 'react';
import './Sidedrawer.scss';
import UIContext from '../../../Context/UIContext';
import { useSpring, animated } from 'react-spring';
import { NavLink } from 'react-router-dom';
import BtnIcon from '../../UI/BtnIcon/BtnIcon';
import utils from '../../../data/utils.json';

const Sidedrawer = () => {
    const handleClick = () => {
        if (UICx.showDrawer) UICx.setShowDrawer(false);
    }

    const UICx = React.useContext(UIContext);
    const drawerSpring = useSpring({
        right: UICx.showDrawer ? "0%" : "-100%"
    });

    return (
        <animated.div style={drawerSpring} className="SideDrawer">
            <div className="Header drawer-header">
                <NavLink onClick={handleClick} to={utils.homeUrl} exact className={'logo-wrapper'}>
                    <span className={"icon-logo-ksa"}></span>
                </NavLink>
                <div className="main-nav">
                    <BtnIcon icon={"cross"} clicked={handleClick} />
                </div>
            </div>
            <ul className="list-unstyled drawer-nav">
                <li><NavLink onClick={handleClick} to={utils.homeUrl} exact>Home</NavLink></li>
                <li><NavLink onClick={handleClick} to={utils.homeUrl + "/about"}>About</NavLink></li>
                <li><NavLink onClick={handleClick} to={utils.homeUrl + "/projects"}>Recent Projects</NavLink></li>
                <li><NavLink onClick={handleClick} to={utils.homeUrl + "/contact"}>Contact</NavLink></li>
            </ul>
        </animated.div>
    );
};

export default Sidedrawer;
