import { useContext } from 'react';
import style from './Home.module.css';
import { UserContext } from './../../context/UserContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import SliderCategory from './../Slider/SliderCategory';
import MainSlider from '../MainSlider/MainSlider';

function Home() {


    return <>
        <MainSlider />
        <SliderCategory />
        <RecentProducts />
    </>
}

export default Home
