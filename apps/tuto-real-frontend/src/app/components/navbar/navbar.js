import { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import {MdSearch} from 'react-icons/md'

import { getNavbarData } from './navbarData'
import { useAuth } from '../../auth'
import './navbar.css'


const NavBar = () => {
  // User have type => "Guest" | "Student" | "Admin" | "Tutor" //
  const [userType, setUserType] = useState("Guest")
  const navigate = useNavigate()
  
  const { logOut, _id, role, firstName, lastName } = useAuth()
  const navbarDataList = getNavbarData(userType).map(item => (
    <button 
      key={item.id} 
      className={item.style} 
      style={{marginRight: "2%"}} 
      onClick={() => handleButton(item.name, item.path, item.param)}>
        {item.icon}
        <p style={{width: "-webkit-fill-available"}}>{item.name !== "User Name"? item.name: `${firstName} ${lastName}`}</p>
    </button>     
  ))

  useEffect(() => {
    if(role) setUserType(role)
    else setUserType("Guest")
  },[role])

  const handleButton = (name, path, param) => {
    if(name === "Sign out") {
      console.log("Logging out....")
      logOut()
    }
    if(param) {
      if(param === "_id") navigate(`${path}/${_id}`)
    } else navigate(path)
  }

  return (
    <div className='navbar'>
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