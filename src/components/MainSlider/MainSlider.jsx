import style from './MainSlider.module.css';
import slide1 from '../../assets/slider-image-1.jpeg'
import slide2 from '../../assets/slider-image-2.jpeg'
import slide3 from '../../assets/slider-image-3.jpeg'
import slide4 from '../../assets/grocery-banner.png'
import slide5 from '../../assets/grocery-banner-2.jpeg'
import Slider from "react-slick";

function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        arrows: false
    };
    return <>
        <div className="flex flex-wrap my-4">
            <div className="w-3/4">
                <Slider {...settings}>
                    <img src={slide1} className='w-full h-[300px] object-cover' alt="" />
                    <img src={slide4} className='w-full h-[300px] object-cover' alt="" />
                    <img src={slide5} className='w-full h-[300px] object-cover' alt="" />
                </Slider>
            </div>
            <div className="w-1/4">
                <img src={slide2} className='w-full h-[150px]' alt="" />
                <img src={slide3} className='w-full h-[150px]' alt="" />
            </div>
        </div>

    </>
}

export default MainSlider