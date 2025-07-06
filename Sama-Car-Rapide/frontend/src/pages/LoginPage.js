import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginUser } from '../features/auth/authSlice'; // Example auth slice

const LoginPage = () => {
  // const dispatch = useDispatch();
  const [telephone, setTelephone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation (can be expanded)
    if (!telephone || !password) {
      alert('Please enter telephone and password');
      return;
    }
    console.log('Logging in with:', { telephone, password });
    // dispatch(loginUser({ telephone, password }));
    // Handle login logic here
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="telephone">Telephone:</label>
          <input
            type="text"
            id="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
