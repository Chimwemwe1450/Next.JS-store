'use client';

import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => Number(item.id) === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        Number(item.id) === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.title,
          image: product.image,
          price: product.price,
          quantity: 1
        }
      ]);
    }

    setNotification(`${product.title} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      setCart(cart.map(item =>
        Number(item.id) === productId ? { ...item, quantity } : item
      ));
    } else {
      removeFromCart(productId);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const orderItem = async (userId = 1) => {
    if (cart.length === 0) {
      setNotification('Your cart is empty!');
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const orderItems = cart.map(item => ({
      itemName: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const orderPayload = {
      userId: userId,
      items: cart.map(item => ({
        itemName: item.name,
        price: item.price,
        quantity: item.quantity,
        order: null,
        productId: item.id
      }))
    };

    console.log("Sending order:", orderPayload);

    try {
      const response = await fetch('http://localhost:5169/api/OrderItems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        setNotification('Order placed successfully!');
        clearCart();
      } else {
        const err = await response.json();
        setNotification(err.message || 'Order failed!');
      }
    } catch (error) {
      console.error('Order error:', error);
      setNotification('Failed to place order. Please try again.');
    }

    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        notification,
        orderItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
