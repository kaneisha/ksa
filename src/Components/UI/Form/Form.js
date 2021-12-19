import React, { useEffect, useContext, useRef } from 'react';
import utils from '../../../data/utils.json';
import './Form.scss';
import axios from 'axios';
import UIContext from '../../../Context/UIContext';
import ReactHtmlParser from 'react-html-parser';
// import ReCAPTCHA from "react-google-recaptcha";

const Form = (props) => {
    const fields = props.data;
    const fieldNames = (fields) ? Object.keys(fields) : null;
    const uiCx = useContext(UIContext);

    // Build form state
    const stateValues = (fieldNames) ? fieldNames.reduce((a, b) => (a[b] = '', a), {}) : null;
    const [values, setValues] = React.useState({ ...stateValues });
    const [captcha, setCaptcha] = React.useState(false);

    // UI State
    const [loading, setLoading] = React.useState(false);
    const [formValid, setFormValid] = React.useState(false);
    const [showError, setShowError] = React.useState(false);
    const [sended, setSended] = React.useState(false);

    const handleChange = name => (event, newValue) => {

        switch (fields[name].type) {
            case 'checkbox':
                const nextCheck = event.target.checked;
                setValues({ ...values, [name]: nextCheck });
                break;
            case 'textarea':
                const nextValue = ReactHtmlParser(event.target.value);
                const stringValue = (Array.isArray(nextValue)) ? nextValue[0] : nextValue;
                const resultValue = (stringValue != null) ? stringValue : '';

                if (fields[name].limit) {
                    if (resultValue.length <= fields[name].limit) {
                        setValues({ ...values, [name]: resultValue });
                    }
                } else {
                    setValues({ ...values, [name]: resultValue });
                }

                break;
            default:
                const nextVal = (newValue === undefined) ? event.target.value : newValue;
                setValues({ ...values, [name]: nextVal });
        }
    };

    const sendForm = (values) => {

        const url = utils.server;
        const formData = new FormData();
        Object.keys(values).map(key => {
            return formData.append(key, values[key]);
        });

        if (props.useCaptcha) {
            formData.append('recaptcha', captcha);
        }

        // Add recaptcha
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        return axios.post(url, formData, config)
    }

    const validateForm = () => {

        let valid = true;

        if (props.useCaptcha) {
            if (!captcha) valid = false;
        }

        if (fields) {
            Object.keys(fields).map(key => {
                if (fields[key]['required']) {
                    switch (fields[key].type) {
                        case 'checkbox':
                            return (values[key]) ? null : valid = false
                        default:
                            return (values[key].length > 0) ? null : valid = false
                    }
                } else {
                    return null;
                }
            });
        }

        setFormValid(valid);
    }

    const recaptchaChange = (value) => {
        setCaptcha(value);
    }

    const onFormSubmit = (e) => {
        validateForm();
        e.preventDefault();
        setShowError(false);

        if (formValid) {
            setLoading(true);
            sendForm(values).then((response) => {
                setLoading(false);
                if (response.data.success) {
                    setSended(true);
                    props.handleSended(true);
                } else {
                    setFormValid(false);
                }
            });
        } else {
            setShowError(true);
        }
    }

    useEffect(() => {
        if (props.values) {
            setValues({ ...stateValues, ...props.values });
        }
        validateForm();
    }, []);

    useEffect(() => {
        validateForm();
    }, [values, captcha]);

    const renderFields = (fieldNames) ? fieldNames.map((name, index) => {
        switch (fields[name].type) {
            case 'textarea':
                return <div key={"formField-" + index} className="form-field input--textarea" key={'field--' + name}>
                    {/* <label htmlFor={'form-' + name}>{fields[name].label}</label> */}
                    <textarea
                        placeholder={fields[name].label + ((fields[name].required) ? ' *' : '')}
                        className="form-control"
                        id={"form-" + name}
                        value={values[name]} cols="30" rows="6"
                        name={name} id={"form_" + name} type={fields[name].type}
                        onChange={handleChange(name)} ></textarea>
                </div>
            case 'checkbox':
                return <div key={'field--' + name}>
                    <div key={"formField-" + index} className={"form-field input--checkbox form-check form-check-inline"}>
                        <input
                            className="form-check-input"
                            checked={values[name]}
                            name={name} id={"form_" + name}
                            id={'form-' + name}
                            type={fields[name].type}
                            onChange={handleChange(name)} />
                        {/* <label htmlFor={'form-' + name} className="form-check-label">
                            <span className="text">{fields[name].label}</span>
                        </label> */}
                    </div>
                </div>
            default:
                return <div key={"formField-" + index} className={"form-field input--text " + (fields[name].short && 'short-width')} key={'field--' + name}>
                    {/* <label htmlFor={'form-' + name}>{fields[name].label}</label> */}
                    <input
                        placeholder={fields[name].label + ((fields[name].required) ? ' *' : '')}
                        className="form-control"
                        id={'form-' + name}
                        value={values[name]}
                        name={name}
                        id={"form-" + name} type={fields[name].type}
                        onChange={handleChange(name)} />
                </div>
        }
    }) : null;

    // const renderCaptcha = (props.useCaptcha) ?
    //     <div className="form__recaptcha">
    //         <ReCAPTCHA
    //             sitekey="6Lf_pckZAAAAAM5HN7YGmghMOZgy64E2lUkftATH"
    //             onChange={recaptchaChange}
    //         />
    //     </div> : null;

    return (
        <div className="Form">
            {(sended)
                ? <p className="body-text">Thank you! Your message was sent successfully.</p>
                : <form onSubmit={onFormSubmit} className="styled-form" name={"contact-form"}>
                    {renderFields}
                    {/* {renderCaptcha} */}
                    <div className="mt-2 mb-3">{props.footer}</div>
                    {showError && <div className="form__error alert alert-warning">{props.error}</div>}
                    <div className="form__actions text-center mb-3">
                        {(!loading)
                            ? <>
                                <button type="submit" className={"submit btn " + ((formValid) ? ' btn-primary' : ' btn-gray')}>
                                    {props.send}
                                </button>
                            </>
                            : <div className="sending submit">
                                <strong>Sending </strong>
                            </div>
                        }
                    </div>
                </form>
            }
        </div>
    )
}

export default Form