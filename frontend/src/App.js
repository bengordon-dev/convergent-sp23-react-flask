import Navbar from './components/Navbar';
import Main from './components/Main';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState, useEffect } from 'react';

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
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/signup');
    }
  }, [user]);

  return (
    <div className="App flex flex-col">
      <Navbar />
      <Main />
    </div>
  );
}


export default App;
