import React, { useEffect, useState } from 'react'


function Navbar(props) {
  return (
    <header className='w-full h-16 bg-pink-800 flex flex-row justify-between items-center montserrat'>
        <h2 className='flex ml-44 font-semibold text-xl text-white'>TX Conv Forum</h2>
        <div className='flex items-center mr-44 cursor-default'>
          <p className='text-white font-bold mx-4 text-lg'>{props.username}</p>
          <div alt="avatar" className='bg-white rounded-lg w-10 h-10 mr-2 flex text-center justify-center cursor-pointer'>
            <div className="text-2xl py-1 font-bold">&#8677;</div>
          </div>
        </div>
    </header>
  )
}

export default Navbar