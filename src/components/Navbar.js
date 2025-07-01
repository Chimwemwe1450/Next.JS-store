'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

async function getCategories() {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }
    loadCategories();

    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/home">Home store</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/store">Store</Link>
            </li>
            <li
              className="nav-item dropdown"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
              style={{ position: 'relative' }}
            >
              <span className="nav-link dropdown-toggle" style={{ cursor: 'pointer' }}>
                Categories
              </span>
              {showCategories && (
                <ul
                  className="dropdown-menu show"
                  style={{
                    display: 'block',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 1000
                  }}
                >
                  {categories.map((category) => (
                    <li key={category}>
                      <Link className="dropdown-item" href={`/store?category=${category}`}>
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/cart">Cart</Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            {isLoggedIn ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" href="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
