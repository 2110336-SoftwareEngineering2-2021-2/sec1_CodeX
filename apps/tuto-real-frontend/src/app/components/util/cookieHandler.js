import Cookies from 'universal-cookie'

const cookie = new Cookies()
const EXPIRE_DAY = 3 // Days

export const getCookieData = () => {
  const email = cookie.get('email')
  const role = cookie.get('role')
  return {email, role}
}

export const setCookieData = (email, role) => {
  const cookieExpireDate = new Date()
  cookieExpireDate.setDate(cookieExpireDate.getDate() + EXPIRE_DAY)
  cookie.set('email', email, {path: "/", expires: cookieExpireDate})
  cookie.set('role',  role, {path: "/", expires: cookieExpireDate})
}

export const removeCookieData = () => {
  cookie.remove('email')
  cookie.remove('role')
}