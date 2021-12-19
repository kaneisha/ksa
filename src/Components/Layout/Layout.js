import React from 'react';
import utils from '../../data/utils.json';
import Sidedrawer from './Sidedrawer/Sidedrawer';
import './Layout.scss';

const Layout = (props) => {
    return (
        <div className="Layout">
            {props.children}
            <Sidedrawer />
            <div className="noise"></div>
        </div>
    )
}

export default Layout