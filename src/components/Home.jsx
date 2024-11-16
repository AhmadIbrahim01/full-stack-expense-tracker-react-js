import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Main } from './Main';


const Home = ({ user }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
  }

  return (
    <div className="home-container">
      {user ? (
        <>
          <Main username={user.username}/>
        </>
      ) : (
        <h2>Please log in to access the home page. <a href="/Login">Login here</a> </h2>
      )}
    </div>
  );
};

export default Home;
