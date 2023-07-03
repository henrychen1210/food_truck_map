import React, { useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtaGVucnljaGVuIiwiYSI6ImNsaXAydmZ3NzBrcnIzY256c3h6Y295ZHQifQ.a3KtDSOe2Qplv086h6Nm3Q';

export default function App() {
  

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      
      <nav>
        <img src="./hamburger.png" alt="" />
        <Link to="/">  Home  </Link>

        {!isAuth ? (
          <Link to="/login" className="login">  Login  </Link>
        ) : (
          <>
            <Link to="/createpost">  Post  </Link>
            <button onClick={signUserOut}>  Log Out  </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/editpost" element={<EditPost isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

      </Routes>
    </Router>
  );
}