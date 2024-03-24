import { NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

export default function NavHeader() {
  const auth = useAuth();
  return (
    <nav className="nav-header">
      <ul>
        <li>
          <h1 style={{ fontStyle: "italic" }}>Team KINO</h1>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Movies</NavLink>
        </li>
        <li>
          <NavLink to="/user">User</NavLink>
        </li>
      </ul>
      <ul style={{ paddingLeft: "10px" }}>
        {!auth.isLoggedIn() ? (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        ) : (
          <>
            {auth.username && <li>Logged in as {auth.username}</li>}

            <li>
              <NavLink to="/logout">Logout</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
