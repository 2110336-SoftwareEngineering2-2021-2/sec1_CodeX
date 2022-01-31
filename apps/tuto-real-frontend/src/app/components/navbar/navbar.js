import React from 'react'
import { useNavigate} from 'react-router-dom'
import {MdSearch} from 'react-icons/md'

import './navbar.css'
import { getNavbarData } from './navbarData'


const NavBar = () => {
  // User have type => "Guest" | "User" | "Admin" | "Tutor" //
  const userType = "Guest"
  const navigate = useNavigate()
  const navbarDataList = getNavbarData(userType).map(item => (
    <button key={item.id} className={item.style} style={{marginRight: "3%"}} onClick={()=> navigate(item.path)}>
      {item.name}
    </button>     
  ))

  return (
    <div className='navbar shadow'>
      <div className='left-side'>
        <button className='main-icon' onClick={() => navigate('/')}>TutoReal</button>
        <div className='search-bar'>
          <MdSearch size="5%" color='gray' style={{marginLeft: "2%"}} />
          <input type='text' placeholder='Search to find your interested tutor.'></input>
        </div>
      </div>
      <div className='right-side'>
        {navbarDataList}
      </div>
    </div>
  )
}

export default NavBar