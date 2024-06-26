import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import RoleChecker from "./components/RoleChecker.jsx";
import Login from "./components/Login.jsx";
import Logout from "./components/logout.jsx";
import AdminPanel from "./components/adminPanel.jsx";
import Home from "./Home";
import Movies from "./Movies.jsx";
import SeatSelectorPage from "./SeatSelectorPage.jsx";
import "./scss/styles.scss";
import Movie from "./Movie";

//import Login from "./security/Login";
//import Logout from "./security/Logout"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/" element={<Movies />} />
        <Route path="/select/:id" element={<SeatSelectorPage />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="*" element={<h2>Not Found</h2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/admin"
          element={
            <RoleChecker roles={["ADMIN"]}>
              <AdminPanel />
            </RoleChecker>
          }
        />
      </Routes>
    </Layout>
  );
}

//<Route path="/login" element={<Login />} />
//<Route path="/logout" element={<Logout />} />
