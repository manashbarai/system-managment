import React from 'react'
import '../Landingpage.css'
import '../Responsive.css'

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



import Qualcomm from '../Images/2560px-Qualcomm-Logo 1.svg'
import Unzo from '../Images/1280px-Dunzo_Logo 1.svg'
import Atlassian from '../Images/2560px-Atlassian-logo 1.svg'
import Gojek from '../Images/Gojek_logo_2022 1.svg'
import Walmart from '../Images/Walmart-Logo 1.png'







const CrousalSection = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 7000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [

            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1285,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1061,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const sliderSettings = {
        dots: true,
        customPaging: function (i) {
            return <div className="custom-dot"></div>;
        },
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        horizontal: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const backgroundImages = [
        '../Images/Banner_11zon.jpg',
        '../Images/Banner_11zon.jpg',
        '../Images/Banner_11zon.jpg',
        '../Images/Banner_11zon.jpg',
    ];
    return (
        <div className='container'>
            <div className='sl_secondHeading'>
                <h4 className='sl_Companies'>COMPANIES</h4>
                <h2 className='sl_Trust'>Over <span className='sl_Number'>300,000</span> Companies Trust Us</h2>
                <p className='sl_Para2'>From startups to global giants, Finreify CRM empowers teams to extend<br /> the breadth and depth of their customer relationships</p>
            </div>
            <div className='mt-5 sl_Carousel'>
                <Slider {...settings}>
                    <div className='sl_Qualcomm'>
                        <img src={Qualcomm} alt="Qualcomm" />
                    </div>
                    <div className='sl_Unzo'>
                        <img src={Unzo} alt="Unzo" />
                    </div>
                    <div className='sl_Atlassian'>
                        <img src={Atlassian} alt="Atlassian" />
                    </div>
                    <div className='sl_Gojek'>
                        <img src={Gojek} alt="Gojek" />
                    </div>
                    <div className='sl_Walmart'>
                        <img src={Walmart} alt="Walmart" />
                    </div>
                    <div className='sl_Qualcomm'>
                        <img src={Qualcomm} alt="Qualcomm" />
                    </div>
                    <div className='sl_Unzo'>
                        <img src={Unzo} alt="Unzo" />
                    </div>
                </Slider>

            </div>
        </div>
      
  )
}

export default CrousalSection
