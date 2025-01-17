import style from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from './../../../node_modules/axios/lib/axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './../../context/UserContext';


function Login() {
    let navigate = useNavigate()
    let { userToken, setuserToken } = useContext(UserContext)


    const [apires, setapires] = useState('')
    const [network, setnetwork] = useState('')
    const [isloaing, setisloaing] = useState(false)



    async function handlelogin(values) {
        setisloaing(true)
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            setisloaing(false)
            setnetwork('')
            if (data.message === 'success') {
                localStorage.setItem('UserToken', data.token)
                setuserToken(data.token)
                navigate('/e-commerce')
            }
        } catch (error) {
            setisloaing(false)
            if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
                setnetwork('No internet connection. Please check your network and try again.')
            } else {
                setapires(error?.response?.data?.message)
                setnetwork('')
            }
        }
    }


    let validationSchema = yup.object().shape({
        email: yup.string().email('not valid email').required('email is required'),
        password: yup.string().required('password is required').min(6, 'min length is 6'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: handlelogin
    })
    return <>
        <h2 className='text-4xl font-bold text-emerald-500 my-7 text-center'>Login Now</h2>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                    <span className="font-medium">{formik.errors.email}</span>
                </div> : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password </label>
                {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                    <span className="font-medium">{formik.errors.password}</span>
                </div> : null}
            </div>
            <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-1 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                {isloaing ?
                    <div role="status">
                        <svg aria-hidden="true" className="me-2 inline w-7 h-7 text-gray-300 animate-spin dark:text-gray-400 fill-red-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    : 'submit'}
            </button>
            <p className='mt-2'>Dont have acount? <Link className='font-semibold' to='/register'>Register</Link></p>
            {apires ? <div className="p-4 my-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                <span className="font-medium">{apires}</span>
            </div> : null}
            {network ? <div className="p-4 my-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                <span className="font-medium">{network}</span>
            </div> : null}
        </form>
    </>
}

export default Login