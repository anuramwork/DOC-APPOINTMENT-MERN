import React from 'react'
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img className='w-' src={assets.logo} alt="" />
      <ul>
        <NavLink>
            <li>HOME</li>
            <li>ALL DOCTORS</li>
            <li>ABOUT</li>
            <li>CONTACT</li>
        </NavLink>
      </ul>
      <div>
        <button>Create account</button>
      </div>
    </div>
  )
}

export default Navbar
