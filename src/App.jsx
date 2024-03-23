import "./App.css";
// import React from 'react';
import { Route, Routes, UNSAFE_useScrollRestoration } from "react-router-dom";
import Layout from "./Layout";

import Home from "./Home";
import Movies from "./Movies.jsx";
import UserPage from "./UserPage.jsx";
import { useAuth } from "./AuthProvider"; // Importer useAuth-hook'en

//import MovieLayout from "./movie/MovieLayout"
//import Movie from "./movie/Movie";

//import Login from "./security/Login";
//import Logout from "./security/Logout"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/" element={<Movies />} />
        <Route path="/user/" element={<UserPage />} />

        <Route path="*" element={<h2>Not Found</h2>} />
      </Routes>
    </Layout>
  );
}

//<Route path="/movie" element={<MovieLayout/>}>
//  <Route path=":id" element={<Movie />} />
//</Route>

//<Route path="/login" element={<Login />} />
//<Route path="/logout" element={<Logout />} />
