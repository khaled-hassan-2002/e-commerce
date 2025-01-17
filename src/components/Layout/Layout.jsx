import style from './Layout.module.css';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
function Layout() {
    return <>
        <Navbar />
        <div className="container mt-8  mx-auto px-4 py-20 lg:py-10">
            <Outlet />
        </div>
        <Footer />
    </>
}

export default Layout