import React, { useEffect, useRef, useContext } from 'react';
import utils from '../../../data/utils.json';
import Slider from "react-slick";
import PreLoader from '../../UI/PreLoader/PreLoader';
import UIContext from '../../../Context/UIContext';
import './About.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "../../../data/about.json";
import ReactHtmlParser from 'react-html-parser';
import Header from '../../Layout/Header/Header';
import BtnIcon from '../../UI/BtnIcon/BtnIcon';

const About = () => {
    const uiCx = useContext(UIContext);

    const slider = useRef(null);
    const gallery = ['img1.jpg', 'DSCN2541.jpg', 'DSCN2544.jpg', 'IMG_0847.jpg','btsOB.jpg','Screen_Shot_2020-10-02.png'];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
        variableWidth: true,
        pauseOnDotsHover: true,
        arrows: false
    }

    const renderSlides = gallery.map((item, index) => <img key={index} src={require('../../../assets/img/about/' + item)} alt="" />);

    useEffect(() => {
        uiCx.setUseBlackbars(false);
        uiCx.setUseBackground(true);
    }, [])


    /* <div className="photo-box">
        <div className="grow-1"><img src={require('../../../assets/img/2x/img-2.jpg')} alt="" /></div>
        <div className="grow-2"><img src={require('../../../assets/img/2x/img-3.jpg')} alt="" /></div>
        <div className="grow-1"><img src={require('../../../assets/img/2x/img-4.jpg')} alt="" /></div>
    </div> */

    return (
        <div className="About">
            <Slider
                ref={slider}
                {...settings}
                className="FeaturedSlider">
                {renderSlides}
            </Slider>
            <div className="fluid-images dual-col-wrapper-desktop colored-strong">
                <div className="dual-col-row">
                    <div><h2>{data['about-main'].title}</h2></div>
                    <div>
                        {ReactHtmlParser(data['about-main'].body)}
                    </div>
                </div>
            </div>
            <div className="about-button-wrapper">
                <BtnIcon clicked={() => uiCx.scrollToElem("ksa-bios")} icon={"arrow-down"} />
            </div>

            <div className="bg-primary text-white position-relative over-navbar" id='ksa-bios'>
                <Header lightTheme />
                <div className="fluid-images dual-col-wrapper">
                    <div className="dual-col-row">
                        <div><img src={require('../../../assets/img/1x/img-5.jpg')} alt="" /></div>
                        <div>
                            <h3>{data['about-remi'].title}</h3>
                            <div>
                                {ReactHtmlParser(data['about-remi'].body)}
                            </div>
                        </div>
                    </div>
                    <div className="dual-col-row">
                        <div><img src={require('../../../assets/img/1x/img-6.jpg')} alt="" /></div>
                        <div>
                            <h3>{data['about-caroline'].title}</h3>
                            <div>
                                {ReactHtmlParser(data['about-caroline'].body)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About