import React from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();

    const uname = (e.target[0].value)

    fetch("http://localhost:8080/createAccount", {method: "post", body: JSON.stringify({username: uname})})
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("forumToken", res._id)
      localStorage.setItem("forumUsername", res.username)
      props.setUserID(res._id)
      props.setUsername(res.username)
      navigate('/');
    })

  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-800 montserrat">
      <div className="flex flex-col items-center justify-center w-96 h-auto bg-white rounded-lg shadow-lg p-12">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <form className="flex flex-col items-center justify-center" onSubmit={(e) => signup(e)}>
          <input className="w-80 h-10 mt-10 border-2 border-gray-300 rounded-lg px-2" type="text" placeholder="Username" />
          <button type="submit" className="w-80 h-10 mt-5 bg-pink-700 hover:bg-pink-800 rounded-lg text-white">Sign Up</button>
        </form>
        <div>
          <p className="text-sm mt-4">Already have an account? <a className="text-pink-700 font-bold" href="/login">Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default Signup