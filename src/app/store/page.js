'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useContext, Suspense } from 'react';
import { CartContext } from '../../context/CartContext';
import Link from 'next/link';

async function getProducts(category, sort) {
  let url = 'https://fakestoreapi.com/products';
  if (category) {
    url += `/category/${category}`;
  }
  const res = await fetch(url);
  let products = await res.json();

  if (sort === 'priceAsc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'priceDesc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'nameAsc') {
    products.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'nameDesc') {
    products.sort((a, b) => b.title.localeCompare(a.title));
  }

  return products;
}

function StoreContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function loadProducts() {
      const products = await getProducts(category, sort);
      setProducts(products);
    }
    loadProducts();
  }, [category, sort]);

  return (
    <div>
      <h1>Store</h1>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              width: '300px',
              margin: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '500px'
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>

            {/* View Details on bottom left */}
            <Link
              href={`/store/${product.id}`}
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                padding: '8px 12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              View Details
            </Link>

            {/* Add to Cart on bottom right */}
            <button
              onClick={() => addToCart(product)}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
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
        ))}
      </div>
    </div>
  );
}

// Wrap your StoreContent component with Suspense
export default function Store() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreContent />
    </Suspense>
  );
}
