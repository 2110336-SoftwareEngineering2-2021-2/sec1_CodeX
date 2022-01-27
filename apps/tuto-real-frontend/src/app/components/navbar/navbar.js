import React from 'react'
import {Link} from 'react-router-dom'
import { getNavbarData } from './navbarData'


const NavBar = () => {
  // User have type => "Guest" | "User" | "Admin" | "Tutor" //
  const userType = "Guest"
  const navbarDataList = getNavbarData(userType).map(item => (
    <Link to={item.path} >{item.name}</Link>
  ))


  return (
    <>
      <div style={{'flexDirection': 'column'}}>
        <button>TutoReal</button>
        <input type='text' placeholder='Search to find your interested tutor.' />
      </div>
      <div>
        {navbarDataList}
      </div>
    </>
  )
}

export default NavBar