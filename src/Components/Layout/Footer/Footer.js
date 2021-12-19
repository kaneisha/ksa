import React from 'react';
import utils from '../../../data/utils.json';
import './Footer.scss';

const Footer = (props) => {

    const footerBg = (props.useBackground) ? ' useBackground ' : ' noBg';

    return (
        <div className={"Footer " + footerBg}>
            <p className="copyright">
                <strong>© KSA. All rights reserved.</strong>
            </p>
            {props.useBackground && <div className="noise"></div>}
        </div>
    )
}

export default Footer