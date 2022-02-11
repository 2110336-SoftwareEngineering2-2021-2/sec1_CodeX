import {
  MdWarning, 
  MdOutlineMenuBook, 
  MdPersonOutline, 
  MdOutlineListAlt, 
  MdSchool,
  MdAdminPanelSettings
} from 'react-icons/md'
import COLORS from '../../constants/color'

const renderIcon = (Icon) => {
  return (
    <Icon size="2vw" color={COLORS.primary} style={{marginRight: "inherit"}} />
  )
}

const guestData = [
  {
    id: 1,
    icon: "",
    name: "Log in",
    path: "/login",
    style: "secondary-button"
  },
  {
    id: 2,
    icon: "",
    name: "Create New Account",
    path: "/register",
    style: "primary-button"
  },
]

const studentData = [
  {
    id: 1,
    icon: renderIcon(MdWarning),
    name: "Send Report",
    path: "/", // need to connect
    style: "tertiary-button"
  },
  {
    id: 2,
    icon: renderIcon(MdOutlineMenuBook),
    name: "Booking",
    path: "/", // need to connect
    style: "tertiary-button"
  },
  {
    id: 3,
    icon: renderIcon(MdPersonOutline),
    name: "User Name", // Will be set to User's name in navbar
    path: "/profile",
    param: "_id",
    style: "tertiary-button"
  },
  {
    id: 4,
    icon: "",
    name: "Sign out", // Log out function will be added in navbar
    path: "/",
    style: "secondary-button"
  },
]

const tutorData = [
  {
    id: 1,
    icon: renderIcon(MdWarning),
    name: "Send Report",
    path: "/", // need to connect
    style: "tertiary-button"
  },
  {
    id: 2,
    icon: renderIcon(MdOutlineListAlt),
    name: "Booking Request",
    path: "/", // need to connect
    style: "tertiary-button"
  },
  {
    id: 3,
    icon: renderIcon(MdOutlineMenuBook),
    name: "Booking",
    path: "/", // need to connect
    style: "tertiary-button"
  },
  {
    id: 4,
    icon: renderIcon(MdSchool),
    name: "User Name", // Will be set to User's name in navbar
    path: "/profile",
    param: "_id",
    style: "tertiary-button"
  },
  {
    id: 5,
    icon: "",
    name: "Sign out", // Log out function will be added in navbar
    path: "/",
    style: "secondary-button"
  },
]

const adminData = [
  {
    id: 1,
    icon: renderIcon(MdWarning),
    name: "User's Report",
    path: "/", // need to connect
    style: "tertiary-button"
  },
  {
    id: 2,
    icon: renderIcon(MdOutlineListAlt),
    name: "Promote Submission",
    path: "/requestList",
    style: "tertiary-button"
  },
  {
    id: 3,
    icon: renderIcon(MdAdminPanelSettings),
    name: "Administrator", // Will be set to User's name in navbar
    path: "/", // ???????
    style: "tertiary-button"
  },
  {
    id: 4,
    icon: "",
    name: "Sign out", // Log out function will be added in navbar
    path: "/",
    style: "secondary-button"
  },
]

export const getNavbarData = (userType) => {
  switch(userType) {
    case 'Guest': return guestData
    case 'Student': return studentData
    case 'Tutor': return tutorData
    case 'Admin': return adminData
    default: return guestData
  }
}
