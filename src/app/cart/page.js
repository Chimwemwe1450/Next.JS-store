'use client';

import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';

export default function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getTotal,
    orderItem,
    notification,
  } = useContext(CartContext);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmitOrder = () => {
    orderItem(1); // Replace 1 with actual user ID if available
  };

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Cart</h1>

      {notification && (
        <div style={{ backgroundColor: '#d4edda', padding: '10px', marginBottom: '10px' }}>
          {notification}
        </div>
      )}

      {isClient ? (cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', margin: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ maxWidth: '80px', maxHeight: '80px', marginRight: '20px' }}
              />
              <div>
                <h3 style={{ marginBottom: '5px' }}>{item.name}</h3>
                <p style={{ marginBottom: '5px' }}>Price: ${item.price}</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor={`quantity-${item.id}`} style={{ marginRight: '5px' }}>
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id={`quantity-${item.id}`}
                    value={item.quantity}
                    min="0"
                    onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                    style={{ width: '60px', marginRight: '10px', padding: '5px', border: '1px solid #ccc' }}
                  />
                  <button onClick={() => removeFromCart(item.id)} style={{ padding: '5px 10px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '20px', padding: '10px', borderTop: '2px solid #ccc' }}>
            <h2 style={{ marginBottom: '10px' }}>Total: ${getTotal().toFixed(2)}</h2>
            <button onClick={handleSubmitOrder} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
              Submit Order
            </button>
          </div>
        </div>
      )) : null}
    </div>
  );
}
