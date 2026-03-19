import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.cost.substring(1)) * item.quantity), 0);
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.map(item => (
        <div key={item.name} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="item-details">
            <h3>{item.name}</h3>
            <p>Unit Price: {item.cost}</p>
            <div className="quantity-controls">
              <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
            </div>
            <button onClick={() => dispatch(removeItem(item.name))}>Delete</button>
          </div>
        </div>
      ))}
      <button>Continue Shopping</button>
      <button onClick={() => alert('Coming Soon')}>Checkout</button>
    </div>
  );
}

export default CartItem;
