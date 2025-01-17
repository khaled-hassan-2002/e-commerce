import style from './Slider.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import React from "react";
import Slider from "react-slick";


function SliderCategory() {
    const [categories, setcategories] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 7,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false
    };
    function GetGategories() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
            .then((res) => {
                setcategories(res.data.data)
            })
            .catch()
    }

    useEffect(() => {
        GetGategories()
    }, [])

    return <>
        <h2 className='my-3 capitalize font-semibold text-gray-600'>Shop popular categories</h2>
        <Slider {...settings}>
            {categories.map((category) => <div className='py-5' key={category._id}>
                <img src={category.image} className='w-full h-[200px] object-contain' alt="" />
                <h4>{category.name}</h4>
            </div>)}
        </Slider>
    </>
}

export default SliderCategory
