import Navbar from './components/Navbar';
import Main from './components/Main';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState, useEffect } from 'react';
import Home from './components/Home';


function App() {  
  const [userID, setUserID] = useState(localStorage.getItem("forumToken"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home userID={userID} />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup setUserID={setUserID} />} />
      </Routes>
      
    </BrowserRouter>
  );
}


export default App;
