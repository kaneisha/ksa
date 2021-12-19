import React, { useState, useContext, useEffect } from 'react';
import './Contact.scss';
import PreLoader from '../../UI/PreLoader/PreLoader';
import Form from '../../UI/Form/Form';
import UIContext from '../../../Context/UIContext';

const Contact = ({ match, ...props }) => {
    const uiCx = useContext(UIContext);
    // const { slug: indexSlug } = match.params;
    const [data, setData] = useState(null);
    const [sendedState, setSendedState] = useState(false);

    React.useEffect(() => {
        setData(true);
    });

    const formFields = {
        name: {
            "label": "Name",
            "type": "text",
            "required": true,
        },
        email: {
            "label": "Mail",
            "type": "email",
            "required": true,
        },
        subject: {
            "label": "Subject",
            "type": "text",
            "required": false,
        },
        comment: {
            "label": "Message",
            "type": "textarea",
            "required": true,
        },
    }

    const send = <>Send</>;
    const sended = <>
        <div className="sended alert alert-success">Message Sent! <span className="icon-checkmark icon text-success"></span></div>
    </>;
    const error = <>
        Please verify the required fields (<strong>*</strong>).
        <span className="icon-close icon-secondary text-white"></span>
    </>;

    // Form State
    const sectionRender = (data) ?
        <Form data={formFields} sended={sended} error={error} send={send} targetUrl={'contact'} handleSended={setSendedState} /> :
        <PreLoader />;

    useEffect(() => {
        uiCx.setUseBlackbars(false);
        uiCx.setUseBackground(false);
    }, [])

    const renderContactInfo = (!sendedState) ? <p>
        <strong>email</strong><br /> <a href='mailto:info@ksaproductions.com' className="text-dark">info@ksaproductions.com</a> <br />
        <strong>phone</strong><br /> + 1 323 466 0931<br />
        {/* <strong>fax</strong> +1 323 466 4849 */}
    </p> : null;

    return (
        <div className="Contact">
            <div className="contact__inner">
                <div className="contact__sidebar body-text">
                    <h2 className="title">contact us</h2>
                    {/* <p class='big-font'>For locations pictures and a bid or further information, please contact us.</p> */}
                    <div className="hide-mobile">{renderContactInfo}</div>
                </div>
                <div className="contact__main">
                    {sectionRender}
                </div>
                <div className="show-mobile body-text contact__sidebar mt-4">{renderContactInfo}</div>
            </div>
        </div>
    )
}

export default Contact