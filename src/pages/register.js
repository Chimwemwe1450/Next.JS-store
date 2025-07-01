"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // For routing

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To capture any errors
  const router = useRouter(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure input values are not empty
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
  
    const userData = {
      username,
      email,
      password, 
    };
  
    try {
      // Send POST request to the registration API
      const response = await fetch('http://localhost:3000/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      // Handle successful registration
      if (response.ok) {
        console.log('Registration successful');
        router.push('/login'); // Redirect to login page
      } else {
        // Handle errors if the response is not OK
        const errorData = await response.json();
        setError(errorData.message || 'Something went wrong during registration');
      }
    } catch (error) {
      // Handle network or unexpected errors
      setError('An error occurred during registration');
      console.error(error);
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
      }}>Create Your Account</h2>
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
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#555',
          }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '5px',
              border: '1px solid #ddd',
              boxSizing: 'border-box',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
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
              boxSizing: 'border-box',
              fontSize: '14px',
              transition: 'border-color 0.3s ease',
            }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
        <button type="submit" style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '12px 0',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}>
          Register
        </button>
        <p style={{
          marginTop: '15px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#555',
        }}>
          Already have an account?{' '}
          <a href="/login" style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: '500',
          }}>
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
