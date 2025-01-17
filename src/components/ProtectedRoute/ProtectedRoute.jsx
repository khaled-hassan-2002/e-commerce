import { Navigate } from 'react-router-dom';
import style from './ProtectedRoute.module.css';

function ProtectedRoute(props) {
    if (localStorage.getItem('UserToken')) {
        return props.children
    } else {
        return <Navigate to={'login'} />
    }
}

export default ProtectedRoute