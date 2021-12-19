import React from 'react'
import { NavLink } from 'react-router-dom';
import './BtnIcon.scss';

const BtnIcon = (props) => {
    const classes = "BtnIcon icon-" + props.icon;

    // const clickHandler = () => {
    //     window.scrollTo(0, 0);
    //     if (UICx.showDrawer) {
    //         UICx.drawerTogglerHandler();
    //     }
    // }

    return (props.isExternal) ? (
        <a className={classes} href={props.target}></a>
    ) : (
        (!props.target) ? (
            <button className={classes} onClick={props.clicked}></button>
        ) : (
            <NavLink className={classes} to={props.target} onClick={props.clicked} exact></NavLink>
        )
    );
}

export default BtnIcon