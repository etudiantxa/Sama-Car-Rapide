import React from 'react';
// import { Link } from 'react-router-dom'; // Will be used when routes are set up
// import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../features/auth/authSlice'; // Example

const Navbar = () => {
  // const { isAuthenticated } = useSelector((state) => state.auth); // Example
  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0', marginBottom: '1rem' }}>
      {/* Using <a> tags for now, will switch to <Link> later */}
      <a href="/" style={{ marginRight: '10px' }}>Sama Car Rapide</a>
      <a href="/" style={{ marginRight: '10px' }}>Home</a>
      {/*
      {isAuthenticated ? (
        <>
          <a href="/profile" style={{ marginRight: '10px' }}>Profile</a>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <a href="/login" style={{ marginRight: '10px' }}>Login</a>
      )}
      */}
      <a href="/login" style={{ marginRight: '10px' }}>Login (Placeholder)</a>
      <a href="/booking" style={{ marginRight: '10px' }}>Book (Placeholder)</a>
    </nav>
  );
};

export default Navbar;
