import { useParams, Link } from 'react-router-dom';
import style from './ProductDetails.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Slider from "react-slick";


function ProductDetails() {
    let { id, category } = useParams()
    const [details, setdetails] = useState(null)
    const [isloading, setisloading] = useState(true)
    const [error, seterror] = useState(null)
    const [relatedproducts, setrelatedproducts] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: false,
        arrows: false
    };

    function ProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((res) => {
                setdetails(res.data.data)
                setisloading(false)
            })
            .catch((res) => {
                seterror('Failed to load product details. Please try again later.')
                setisloading(false)
            })
    }

    function AllProducts() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then((res) => {
                let related = res.data.data.filter((product) => product.category.name === category)
                setrelatedproducts(related)
            })
            .catch((res) => { })
    }

    useEffect(() => {
        ProductDetails(id)
        AllProducts()
    }, [id, category])

    if (error) {
        return <div className="text-red-500 text-center mt-4 text-xl font-semibold">{error}</div>;
    }


    return <>
        <div className='flex flex-wrap py-2 items-center'>
            {isloading ? <span className="loader"></span> : <>
                <div className='w-1/4'>
                    <Slider {...settings}>
                        {details?.images.map((src) => <img key={details?.id} className='w-full' src={src} alt={details?.title || 'Product Image'} />
                        )}
                    </Slider>
                </div>
                <div className='w-3/4 p-3'>
                    <h4 className='font-semibold text-lg'>{details?.title}</h4>
                    <h3 className='text-sm font-light my-3'>{details?.description}</h3>
                    <h3 className='text-green-500 font-medium mb-2'>{details?.category.name}</h3>
                    <div className='flex justify-between items-center mb-3'>
                        <span>{details?.price}EGP</span>
                        <i className='fas fa-star text-yellow-500'><span className='text-sm ms-1 text-black'>{details?.ratingsAverage}</span></i>
                    </div>
                    <button className='btn'>Add To Cart</button>
                </div>
            </>}
        </div>

        <h2 className='text-4xl font-semibold ms-5 '>Related Products</h2>
        <div className='flex flex-wrap py-2'>
            {relatedproducts.map((product) => (
                <div key={product.id} className='w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 mb-2'>
                    <div className='product ms-4 p-2'>
                        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                            <img src={product.imageCover} className='w-full' alt={product.title || 'Product'} />
                            <h3 className='text-green-500 font-medium ms-1 my-1'>{product.category.name}</h3>
                            <h4 className='ms-1'>{product.title.split(' ').slice(0, 2).join(' ')}</h4>
                            <div className='flex justify-between items-center my-2 mx-1'>
                                <span>{product.price}EGP</span>
                                <i className='fas fa-star text-yellow-500'><span className='text-sm ms-1 text-black'>{product.ratingsAverage}</span></i>
                            </div>
                        </Link>
                        <button className='btn'>Add To Cart</button>
                    </div>
                </div>
            ))
            }
        </div >
    </>
}

export default ProductDetails