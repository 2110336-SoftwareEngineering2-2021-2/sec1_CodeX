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

const userData = [
  {
    icon: "",
    name: "Log in",
    path: "/login",
  },
  {
    icon: "",
    name: "Create New Account",
    path: "/register",
  },
]

const tutorData = [
  {
    icon: "",
    name: "Log in",
    path: "/login",
  },
  {
    icon: "",
    name: "Create New Account",
    path: "/register",
  },
]

const adminData = [
  {
    icon: "",
    name: "Log in",
    path: "/login",
  },
  {
    icon: "",
    name: "Create New Account",
    path: "/register",
  },
]

export const getNavbarData = (userType) => {
  switch(userType) {
    case 'Guest': return guestData
    case 'User': return userData
    case 'Tutor': return tutorData
    case 'Admin': return adminData
    default: return guestData
  }
}
