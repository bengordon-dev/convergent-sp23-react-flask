import Navbar from './components/Navbar';
import Main from './components/Main';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState, useEffect } from 'react';

/*
fetch("http://localhost:8080/createThread", 
{method: "post", body: JSON.stringify({creatorID: "", "category": "", title: ""})}).then((res) => res.json()).then((res) => console.log(res))

fetch("http://localhost:8080/reply/<threadID>",
{method: "post", body: JSON.stringify({creatorID: "", "content": "p"})}).then((res) => res.json()).then((res) => console.log(res))


fetch("http://localhost:8080/getAllThreads/<category>").then((res) => res.json()).then((res) => console.log(res))


fetch("http://localhost:8080/getAllPosts/<threadID>").then((res) => res.json()).then((res) => console.log(res))

*/

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
