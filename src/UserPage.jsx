import React from "react";
import { useState, useEffect } from "react";
import useAxios from 'axios-hooks';

import "./index.css";

const UserPage = () => {

  console.log('UserPage');
  const [{ data, loading, error }] = useAxios('http://localhost:3000/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  
  return (
    <div>
  
      {data.map(user => (
        <div key={user.id}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
        </div>
      ))}
    </div>
  )
  
};

export default UserPage;
