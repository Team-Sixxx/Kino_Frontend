import { useState } from "react";
import FormDialog from "./FormDialog";

const UserPage = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    username: "johndoe123",
  });

  const handleUpdateUserData = (updatedData) => {
    setUserData(updatedData);
    // Her kan du tilføje logik til at opdatere brugerdata på serveren
  };

  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Password: {userData.password}</p>
      <p>Username: {userData.username}</p>
      {/* Andre brugerinformationer */}
      <FormDialog userData={userData} onUpdateUserData={handleUpdateUserData} />
    </div>
  );
};

export default UserPage;
