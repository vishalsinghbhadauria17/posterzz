import React, { useEffect, useState } from 'react'
import { BsFillCartCheckFill } from 'react-icons/bs';
import { BiErrorCircle } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import './Payments.scss'
import { useDispatch } from 'react-redux';
import { resetCart } from '../../redux/cartSlice';
import Loader from '../loader/Loader';

function Payments() {
    const params=useParams();
    const status=params.status;
    const dispatch=useDispatch();
    const navigate = useNavigate(); 
    const [isAllowed, setIsAllowed] = useState(false);
    useEffect(() => {
        const paymentFlag = sessionStorage.getItem('payment_initiated');
        
        if (paymentFlag === 'true') {
            setIsAllowed(true); 
            if (status === 'success') {
                dispatch(resetCart());
            }
            sessionStorage.removeItem('payment_initiated');
        } else {
            navigate('/');
        }
    }, [status, dispatch, navigate]);
    const infoData={
        success:{   
            message: 'Your order has been placed',
            cta: 'Shop More',
            icon: <BsFillCartCheckFill/>,
        },
        failed:{
            message: 'Payment Failed',
            cta: 'Try Again',
            icon: <BiErrorCircle />,
        }
    };
    if (!isAllowed) {
        return <div className="loading-container"><Loader /></div>;
    }
  return (
    <div className='Payments'>
        <div className="icon">{infoData[status].icon}</div>
        <h2 className="message">{infoData[status].message}</h2>
        <button className="btn-primary" onClick={() => navigate('/')}>{infoData[status].cta}</button>
    </div>
  )
}

export default Payments