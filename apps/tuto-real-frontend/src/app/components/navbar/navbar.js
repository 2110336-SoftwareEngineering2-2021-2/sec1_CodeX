import React from 'react'
import {Link} from 'react-router-dom'
import {MdSearch} from 'react-icons/md'

import './navbar.css'
import { getNavbarData } from './navbarData'


const NavBar = () => {
  // User have type => "Guest" | "User" | "Admin" | "Tutor" //
  const userType = "Guest"
  const navbarDataList = getNavbarData(userType).map(item => (
    <Link to={item.path} >{item.name}</Link>
  ))

  return (
    <div className='Navbar'>
      <div className='LeftSide'>
        <button className='MainIcon'>TutoReal</button>
        <div className='SearchBar'>
          <MdSearch />
          <input  type='text' placeholder='Search to find your interested tutor.'></input>
        </div>
      </div>
      <div className='RightSide'>
        {navbarDataList}
      </div>
    </div>
  )
}

export default NavBar