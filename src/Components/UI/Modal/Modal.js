import React, { useState, useEffect } from 'react';
import './Modal.scss';
import UIContext from '../../../Context/UIContext';
import Backdrop from '../Backdrop/Backdrop';
import { useSpring, animated } from 'react-spring';

const Modal = (props) => {

    const UICx = React.useContext(UIContext);
    const [copied, setCopied] = useState(false);
    const [inputText, setInputText] = useState()

    useEffect(() => {
        setInputText("#soñandojuntos @natura." + UICx.countryText('full-country'))
    }, [])

    const fadeIn = useSpring({
        from: {
            transform: "translateY(-100vh)"
        },
        to: {
            transform: "translateY(0vh)"
        }
    });

    const handleClick = () => {
        UICx.setShowModal(false);
    }

    const copyToClipboard = () => {
        const copyText = document.getElementById("textToCopy");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        setCopied(true);
    }

    const renderCopyBtn = (!copied) ?
        <button onClick={copyToClipboard} className="btn btn-info">Copiar hashtag al portapapeles</button> :
        <button onClick={copyToClipboard} className="btn btn-light">¡Copiado!</button>;

    return (
        <Backdrop>
            <animated.div style={fadeIn} className="Modal">
                <div className="inner">
                    <header>
                        <div></div>
                        <button onClick={handleClick} className="btn text-light icon-cross"></button>
                    </header>
                    <section>
                        {props.children}
                    </section>
                    {props.share && <div className="footer">
                        <p>Asegúrate de compartir tu sueño con el hashtag </p>
                        <p className="mb-2">
                            <input id="textToCopy" className="transparent-input" type="text" value={inputText} /></p>
                        {/* <p className="text-primary"><strong>#soñandojuntos</strong></p>
                        <p>y</p>
                        <p className="text-primary"><strong>@natura.{UICx.countryText('full-country')}</strong></p> */}
                        {renderCopyBtn}
                    </div>}
                </div>
                <div className="interaction" onClick={handleClick}></div>
            </animated.div>
        </Backdrop>
    )
}

export default Modal