"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Redirect if already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      router.push('/home');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/Auth/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Save login state
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);

      router.push('/home');
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f7f9fc',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h2 style={{
        marginBottom: '30px',
        color: '#333',
        fontSize: '28px',
        fontWeight: '600',
      }}>Welcome Back</h2>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        width: '350px',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#555',
          }}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#555',
          }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              fontSize: '14px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button type="submit" style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '12px 0',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
        }}>
          Login
        </button>

        <p style={{
          marginTop: '15px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#555',
        }}>
          Don't have an account?{' '}
          <a href="/register" style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: '500',
          }}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
