import Navbar from './components/Navbar';
import Main from './components/Main';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState, useEffect } from 'react';

function App() {  
  const [userID, setUserID] = useState(localStorage.getItem("forumToken"));
  const [username, setUsername] = useState(localStorage.getItem("forumUsername"))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home username={username} userID={userID} />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup setUserID={setUserID} setUsername={setUsername} />} />
      </Routes>
      
    </BrowserRouter>
  );
}

function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.userID) {
      navigate('/signup');
    }
  }, [props.userID]);

  return (
    <div className="App flex flex-col">
      <Navbar />
      <Main />
    </div>
  );
}


export default App;
