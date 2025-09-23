  import React from "react";
  import { AiOutlineClose } from "react-icons/ai";
  import "./Cart.scss";
  import Cartitem from "../cartitem/Cartitem";
  import { useSelector } from "react-redux";
  import { BsCartX } from "react-icons/bs";
  import {axiosClient} from '../../utils/axiosClient'
  import {loadStripe} from '@stripe/stripe-js'; 

  function Cart({ onClose }) {
    const cart = useSelector((state) => state.cart.cart);
    let totalPrice = 0;
    cart.forEach((item) => (totalPrice += item.quantity * item.price));
    const isCartEmpty=cart.length===0;
    async function handleCheckout() {
      try {
        const response= await axiosClient.post('/orders',{
        products:cart
      });
      const stripe=await loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);;
      sessionStorage.setItem('payment_initiated', 'true');
      await stripe.redirectToCheckout({
        sessionId:response.data.stripeId 
      })
      } catch (error) {
        console.log(error);
        
      }
      
      
    }
    return (
      <div className="Cart">
        <div className="overlay" onClick={onClose}></div>
        <div className="cart-content">
          <div className="header">
            <h3>Shopping Cart</h3>
            <div className="close-btn" onClick={onClose}>
              <AiOutlineClose />
              Close
            </div>
          </div>
          <div className="cart-items">
            {cart.map((item) => (
              <Cartitem key={item.key} cart={item} />
            ))}
          </div>
        {isCartEmpty ? (<div className="empty-cart-info">
            <div className="icon">
              <BsCartX />
            </div>
            <h4>Cart is Empty</h4>
          </div>): (<div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-message">Total:</h3>
              <h3 className="total-value">₹ {totalPrice}</h3>
            </div>
            <div className="checkout btn-primary" onClick={handleCheckout}>Checkout now</div>
          </div>)}
          
          
        </div>
      </div>
    );
  }

  export default Cart;
