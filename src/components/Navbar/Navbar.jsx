import style from './Navbar.module.css';
import logo from '../../assets/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './../../context/UserContext';


function Navbar() {
    let { userToken, setuserToken } = useContext(UserContext)
    let navigate = useNavigate()

    function signout() {
        localStorage.removeItem('UserToken')
        setuserToken(null)
        navigate('login')
    }
    return <>


        <nav className="bg-slate-300 fixed top-0 left-0 right-0 border-gray-200 z-50">
            <div className="flex flex-wrap justify-around gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
                <div className="flex gap-4 items-center">
                    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} width={100} className="h-8" alt="Flowbite Logo" />
                    </Link>
                    {userToken ?
                        <ul className='flex gap-4'>
                            <li><NavLink className='text-slate-500 font-semibold duration-300 hover:text-black ' to="">Home</NavLink></li>
                            <li><NavLink className='text-slate-500 font-semibold duration-300 hover:text-black ' to="cart">Cart</NavLink></li>
                            <li><NavLink className='text-slate-500 font-semibold duration-300 hover:text-black ' to="products">products</NavLink></li>
                            <li><NavLink className='text-slate-500 font-semibold duration-300 hover:text-black ' to="categories">Categories</NavLink></li>
                            <li><NavLink className='text-slate-500 font-semibold duration-300 hover:text-black ' to="brands">Brands</NavLink></li>
                        </ul> : null}
                </div>

                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <ul className='flex gap-4'>
                        <li><i className='fab fa-facebook'></i></li>
                        <li><i className='fab fa-youtube'></i></li>
                        <li><i className='fab fa-instagram'></i></li>
                        <li><i className='fab fa-linkedin'></i></li>
                        <li><i className='fab fa-twitter'></i></li>
                    </ul>
                    <ul className='flex gap-3'>

                        {userToken ?
                            <li onClick={signout} className=' cursor-pointer'><span className='hover:text-red-600 hover:font-semibold duration-300'>signout</span></li> : <>
                                <li><Link to='login'>Login</Link></li>
                                <li><Link to='register'>register</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>


    </>
}

export default Navbar