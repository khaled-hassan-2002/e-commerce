import style from './Notfound.module.css';
import error from './../../assets/error.svg'
function Notfound() {
    return <>
        <div className='h-[440px] flex justify-center items-center'>
            <img src={error} alt="" />
        </div>
    </>
}

export default Notfound