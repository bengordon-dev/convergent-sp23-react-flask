import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("forumToken")) {
      navigate('/')
    }
  }, [])

  function login(e) {
    e.preventDefault()
    const username = e.target[0].value
    fetch("http://localhost:8080/{insert route here}", {
      method: "post",
      body: JSON.stringify({username: username})
    }).then((res) => res.json()).then((res) => {
      if (res.success) {
        localStorage.setItem("forumToken", res.token)
        navigate('/')
      }
    })
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-800 montserrat">
      <div className="flex flex-col items-center justify-center w-96 h-auto bg-white rounded-lg shadow-lg p-12">
        <h1 className="text-3xl font-bold">Login</h1>
        <form className="flex flex-col items-center justify-center" onSubmit={(e) => login(e)}>
          <input className="w-80 h-10 mt-10 border-2 border-gray-300 rounded-lg px-2" type="text" placeholder="Username" />
          <button type="submit" className="w-80 h-10 mt-5 bg-pink-700 hover:bg-pink-800 rounded-lg text-white">Log In</button>
        </form>
        <div>
          <p className="text-sm mt-4">Don't have an account? <a className="text-pink-700 font-bold" href="/signup">Signup</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login