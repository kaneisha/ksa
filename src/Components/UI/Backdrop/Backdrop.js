import React from 'react';
import UIContext from '../../../Context/UIContext';
import './Backdrop.scss';
import { useSpring, animated } from 'react-spring';

const Backdrop = (props) => {
    const UICx = React.useContext(UIContext);

    const fadeIn = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
    });

    return (
        <animated.div style={fadeIn} className={"Backdrop " + (UICx.showModal && 'show')}>{props.children}</animated.div>
    )
}

export default Backdrop