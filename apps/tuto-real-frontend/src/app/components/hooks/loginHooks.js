import {useState} from 'react'
import { client } from '../../axiosConfig'
import { getCookieData, removeCookieData, setCookieData } from '../util/cookieHandler'

export const useLogin = ({setError, onSuccessLogin}) => {
  const [isLoading, setLoading] = useState(false)

  const onLogin = (email, password) => {
    setLoading(true)

    client({
      method: "POST",
      url: "/auth/signin",
      body: {
        email,
        password
      }
    }).then(({data}) => {
      setCookieData(data.email, data.role)
      if(onSuccessLogin) onSuccessLogin()
      setLoading(false)
    }).catch(({response}) => {
      console.log(response)
      if(setError) setError(true)
      setLoading(false)
    })
  }

  return {isLoading, onLogin}
}

export const onLogout = ({setError, onSuccessLogout}) => {
  console.log("Logging out...")
  try {
    removeCookieData()
    if(onSuccessLogout) onSuccessLogout()
  } catch {
    if(setError) setError(true)
  }
}

export const isLoggedIn = () => {
  try {
    const {email, role} = getCookieData()
    console.log(email, role)
    if(email && role) return true
  } catch {
    return false
  }
  return false
}