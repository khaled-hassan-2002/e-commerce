import style from './Products.module.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooka/useProducts';


function Products() {
    let { data, isError, error, isLoading, isFetching } = useProducts()


    if (isLoading) {
        return <div className='flex  my-14'>
            <span className="loader"></span>
        </div>
    }
    if (isError) {
        return <div className='text-red-600 text-center my-7 font-semibold text-3xl'>{error.message}</div>
    }
    return <>
        <div className='flex flex-wrap py-2'>
            {data?.data.data.map((product) => (
                <div key={product.id} className='w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 mb-2'>
                    <div className='product ms-4 p-2'>
                        <Link to={`productdetails/${product.id}/${product.category.name}`}>
                            <img src={product.imageCover} className='w-full' alt="" />
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

export default Products