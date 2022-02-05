import {onLogout} from '../hooks/loginHooks'

const guestData = [
  {
    icon: "",
    name: "Log in",
    path: "/login",
    style: "secondary-button"
  },
  {
    icon: "",
    name: "Create New Account",
    path: "/register",
    style: "primary-button"
  },
]

const userData = [
  {
    id: 1,
    icon: "",
    name: "Send Report",
    path: "/",
    style: "secondary-button"
  },
  {
    id: 2,
    icon: "",
    name: "Booking",
    path: "/",
    style: "primary-button"
  },{
    id: 3,
    icon: "",
    name: "Raiden Shougun",
    path: "/",
    style: "secondary-button"
  },
  {
    id: 4,
    icon: "",
    name: "Sign out",
    path: "/login",
    style: "secondary-button"
  },

]

const tutorData = []

const adminData = []

export const getNavbarData = (userType) => {
  switch(userType) {
    case 'Guest': return guestData
    case 'Student': return userData
    case 'Tutor': return tutorData
    case 'Admin': return adminData
    default: return guestData
  }
}
