<<<<<<< HEAD
import React from "react";
import { useState, useEffect } from "react";
// import useAxios from 'axios-hooks';
import FormDialog from "./FormDialog";


import "./index.css";
=======
import { useState } from "react";
import FormDialog from "./components/FormDialog";
>>>>>>> 74c8575e18b83626bb4ea97ff09214d8a9a8e71b

const UserPage = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    username: "johndoe123",
  });

<<<<<<< HEAD
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
  
=======
  const handleUpdateUserData = (updatedData) => {
    setUserData(updatedData);
    // Her kan du tilføje logik til at opdatere brugerdata på serveren
  };

>>>>>>> 74c8575e18b83626bb4ea97ff09214d8a9a8e71b
  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Password: {userData.password}</p>
      <p>Username: {userData.username}</p>
      {/* Andre brugerinformationer */}
<<<<<<< HEAD
      <FormDialog userData={userData}/>
    </div>
  );
  
  
=======
      <FormDialog userData={userData} onUpdateUserData={handleUpdateUserData} />
    </div>
  );
>>>>>>> 74c8575e18b83626bb4ea97ff09214d8a9a8e71b
};

export default UserPage;
