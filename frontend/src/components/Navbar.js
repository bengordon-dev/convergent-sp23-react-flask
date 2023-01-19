import React from 'react'

function Navbar() {
  return (
    <header className='w-full h-16 bg-pink-800 flex flex-row justify-between items-center montserrat'>
        <h2 className='flex ml-44 font-semibold text-xl text-white'>Posts/Threads</h2>
        <div className='flex items-center mr-44 cursor-default'>
          <p className='text-white font-bold mx-4 text-lg'>John Doe</p>
          <div alt="avatar" className='bg-white rounded-lg w-10 h-10 mr-2 flex text-center justify-center cursor-pointer'>
            <div className="text-lg p-1 font-semibold">JD</div>
          </div>
        </div>
    </header>
  )
}

export default Navbar