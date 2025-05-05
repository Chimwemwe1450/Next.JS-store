'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../../context/CartContext';

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();
  return product;
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function loadProduct() {
      const product = await getProduct(id);
      setProduct(product);
    }
    loadProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}  // ✅ FIXED here
        style={{ maxWidth: '300px', maxHeight: '300px', objectFit: 'contain' }}
      />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <button
        onClick={() => addToCart(product)}
        style={{
          marginTop: '20px',
          padding: '8px 12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
