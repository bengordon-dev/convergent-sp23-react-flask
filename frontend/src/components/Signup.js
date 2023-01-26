import React from 'react'

function Signup() {
  return (
    <div className='bg-slate-500'>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center w-96 h-96 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <form className="flex flex-col items-center justify-center w-96 h-96">
            <input className="w-80 h-10 mt-10 border-2 border-gray-300 rounded-lg" type="text" placeholder="Username" />
{/*             <input className="w-80 h-10 mt-5 border-2 border-gray-300 rounded-lg" type="password" placeholder="Password" />
 */}            <button className="w-80 h-10 mt-5 bg-blue-500 rounded-lg text-white">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup