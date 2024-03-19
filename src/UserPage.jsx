import React from "react";
import { useState, useEffect } from "react";
// import useAxios from 'axios-hooks';
import FormDialog from "./FormDialog";


import "./index.css";

const UserPage = () => {

  console.log('UserPage');
  // const [{ data, loading, error }] = useAxios('http://localhost:3000/users');

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error!</p>;
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    username: 'johndoe123',
    // Andre brugerinformationer
  });

  const handleUpdateUserData = (updatedData) => {
    setUserData(updatedData);
    // Logik til at opdatere brugerdata på serveren kan tilføjes her
  };
  
  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Password: {userData.password}</p>
      <p>Username: {userData.username}</p>
      {/* Andre brugerinformationer */}
      <FormDialog userData={userData}/>
    </div>
  );
  
  
};

export default UserPage;
