import { useState, useEffect } from "react";
import axios from "axios";

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleEmailChange = (event) => {
    setUser({ ...user, email: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const handleUsernameChange = (event) => {
    setUser({ ...user, username: event.target.value });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>User Information</h1>
      <p>
        Username: <input type="text" value={user.username} onChange={handleUsernameChange} />
      </p>
      <p>
        Email: <input type="text" value={user.email} onChange={handleEmailChange} />
      </p>
      <p>
        Password: <input type="password" value={user.password} onChange={handlePasswordChange} />
      </p>
    </div>
  );
};

export default UserPage;
