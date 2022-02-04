import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import {MdSearch} from 'react-icons/md'
import {isLoggedIn} from '../hooks/loginHooks'

import './navbar.css'
import { getNavbarData } from './navbarData'
import { getCookieData } from '../util/cookieHandler'


const NavBar = () => {
  // User have type => "Guest" | "Student" | "Admin" | "Tutor" //
  const [userType, setUserType] = useState("Guest")
  const navigate = useNavigate()
  const navbarDataList = getNavbarData(userType).map(item => (
    <button className={item.style} style={{marginRight: "3%"}} onClick={()=> navigate(item.path)}>
      {item.name}
    </button>     
  ))

  useEffect(() => {
    console.log(isLoggedIn())
    if(isLoggedIn()) {
      const {role} = getCookieData()
      setUserType(role)
    }
  },[])

  return (
    <div className='navbar'>
      <div className='left-side'>
        <button className='main-icon'>TutoReal</button>
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