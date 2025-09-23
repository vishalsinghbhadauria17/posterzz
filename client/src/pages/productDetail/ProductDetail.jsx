import React, { useEffect, useState } from 'react'
import dummyImg from '../../assets/naruto.jpeg'
import './ProductDetail.scss'
import { useParams } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';
function ProductDetail() {
  const dispatch=useDispatch()
  const params=useParams();
  const [product,setProduct]=useState(null);
  const cart = useSelector(state => state.cart.cart);
  const quantity = cart.find(item => item.key === params.productId)?.quantity || 0;

  async function fetchData() {
    const productResponse=await axiosClient.get(`/products?filters[key][$eq]=${params.productId}&populate=*`);    
    if(productResponse.data.data.length>0){
      setProduct(productResponse.data.data[0])
    }
  }
  useEffect(()=>{
    setProduct(null);
    fetchData()
  },[params.productId])
  if(!product){
    return <div className="loading"><Loader/></div>
  }
  return (
    <div className='ProductDetail'>
      <div className="container">
        <div className="product-layout">
          <div className="product-img center">
            <div className="img-container">
              <img src={product?.image?.url} alt={product?.title} />
            </div>
            
          </div>
          <div className="product-info">
            <h1 className="heading">{product?.title}</h1>
            <h3 className='price'>₹ {product?.price}</h3>
            <p className="discription">
              {product?.desc}
            </p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span className='btn decrement' onClick={()=>dispatch(removeFromCart(product))}>-</span>
                <span className='quantity'>{quantity}</span>
                <span className='btn increment'  onClick={()=>dispatch(addToCart(product))}>+</span>
              </div>
              <button className="btn-primary add-to-cart" onClick={() => dispatch(addToCart(product))}>Add to cart</button>
            </div>
            <div className="return-policy">
              <ul>
                <li>This product is made to order and is typically printed in 3-6 working days. Your entire order will ship out together.</li>
                <li>Since this product is printed on demand especially for you, it is not eligible for cancellations and returns. Read our Return Policy.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail