import { useState } from "react";

const UserPage = () => {
  // Fetch user information from an API or any other data source
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    age: 30,
    // Add more properties as needed
  });

  const handleEmailChange = (event) => {
    setUser({ ...user, email: event.target.value });
  };

  return (
    <div>
      <h1>User Information</h1>
      <p>Name: {user.name}</p>
      <p>
        Email: <input type="text" value={user.email} onChange={handleEmailChange} />
      </p>
      <p>Age: {user.age}</p>
      <button>edit</button>
      {/* Add more JSX elements to display additional user information */}
    </div>
  );
};

export default UserPage;
