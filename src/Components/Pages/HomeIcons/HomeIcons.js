import React, { useEffect, useContext } from 'react';
import utils from '../../../data/utils.json';
import handleViewport from 'react-in-viewport';
import './HomeIcons.scss';
import UIContext from '../../../Context/UIContext';

const HomeIcons = (props) => {

    const { inViewport, forwardedRef } = props;
    const uiCx = useContext(UIContext);

    // useEffect(() => {
    //     uiCx.updateStages(props, inViewport);
    // }, [inViewport])

    return (
        <div className="HomeIcons" ref={forwardedRef} id={props.blockName}>
            <div className="inner">
                {/* <h1 className="primary-title">DOCUMENTARIES</h1> */}
                <div className="secondary-title">
                    {props.children}
                </div>
                <div className="icons">
                    <div><img className="img-fluid" src={require('../../../assets/img/home/Cannes-Classics.png')} alt="" /></div>
                    <div><img className="img-fluid" src={require('../../../assets/img/home/DTLAFF-LAURELS-2019.png')} alt="" /></div>
                    <div><img className="img-fluid" src={require('../../../assets/img/home/LAFF18_Laurel_OfficialSelection.png')} alt="" /></div>
                    <div><img className="img-fluid" src={require('../../../assets/img/home/SRSociallyRelevantFilmFestivalNewYork-2020.png')} alt="" /></div>
                    <div><img className="img-fluid" src={require('../../../assets/img/home/Tibeca-Film-Festibal.png')} alt="" /></div>
                    <div><img className="img-fluid" src={require('../../../assets/img/home/woodstock-2018.png')} alt="" /></div>
                </div>
            </div>
        </div>
    )
}

export default handleViewport(HomeIcons)