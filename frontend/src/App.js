import Navbar from './components/Navbar';
import Main from './components/Main';
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      
    </BrowserRouter>
  );
}

function Home() {
  const [user, setUser] = useState(null);

  if (!user) {
    window.location.href = '/signup';
  }

  return (
    <div className="App flex flex-col">
      <Navbar />
      <Main />
    </div>
  );
}


export default App;
