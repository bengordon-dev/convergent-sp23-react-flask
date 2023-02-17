import Navbar from './Navbar';
import Main from './Main';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Home(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (!props.userID) {
      navigate('/login');
    }
  }, [props.userID]);

  useEffect(() => {
    if (props.userID) {
      fetch(`http://localhost:8080/userInfo/${props.userID}`).then((res) => (res.json())).then((res) => {
        if (res.error) {
          localStorage.removeItem('forumToken')
          props.setUserID(null)
          navigate('/login')
        }
        else {
          setUsername(res.username)
        }
      })
    }
  }, [])

  return (
    <div className="App flex flex-col">
      <Navbar username={username} />
      <Main userID={props.userID} username={username}/>
    </div>
  );
}
