import './App.css';
import Home from './components/hom'
import SignIn from './components/signIn'
import SignUp from './components/signUp'
import SignOut from './components/signOut'

import React, { useEffect, } from 'react';


import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    console.log(authToken)
    if (authToken) {
      navigate('/home')
    } else {
      navigate('/signin')
    }
  }, [])
  return (

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="home" element={<Home />}></Route>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signout" element={<SignOut />} />
    </Routes>
  );
}

export default App;
