// import './styles/App.css';
// import Login from './components/Login.jsx';
// function App() {
//   return (
//     <div className="App">
//       <Login/>
//     </div>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';    // Correct path to Login.jsx
import Register from './components/Register';  // Correct path to Register.jsx

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;


