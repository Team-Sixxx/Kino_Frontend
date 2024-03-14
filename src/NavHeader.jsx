import React from 'react';
import { NavLink } from 'react-router-dom';

const NavHeader = () => {
  return (
    <nav className="nav-header">
      <ul>
        <li>
        <h1 style={{ fontStyle: 'italic' }}>Team KINO</h1>
        </li>
      </ul>
      <ul>
      <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/movies" activeClassName="active">Movies</NavLink>
        </li>
      </ul>
      <ul style={{ paddingLeft: '10px' }}>

        <li>
          <NavLink to="/login" activeClassName="active">Login</NavLink>
        </li>
        <li>
          <NavLink to="/logout" activeClassName="active">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavHeader;
