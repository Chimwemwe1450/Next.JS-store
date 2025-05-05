'use client';

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Notification() {
  const { notification } = useContext(CartContext);

  if (!notification) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      zIndex: 1000,
    }}>
      {notification}
    </div>
  );
}

export default Notification;
