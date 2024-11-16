import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { Main } from "./components/Main";
import { useState } from "react";


function App() {

  const [user, setUser] = useState(null);  // Store the user state globally

  return (
    <Router>  
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;


