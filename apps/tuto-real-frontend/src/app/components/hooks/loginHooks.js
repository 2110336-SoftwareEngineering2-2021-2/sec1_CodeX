import {useState} from 'react'
import { client } from '../../axiosConfig'
import Cookies from 'universal-cookie'

const useLogin = (setError) => {
  const [isLoading, setLoading] = useState(false)
  const cookie = new Cookies()

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

      const cookieExpireDate = new Date()
      cookieExpireDate.setDate(cookieExpireDate.getDate() + 3)
      cookie.set('email', data.email, {path: "/", expires: cookieExpireDate})
      cookie.set('role',  data.role, {path: "/", expires: cookieExpireDate})

      setLoading(false)
      
    }).catch(({response}) => {
      console.log(response)
      setError(true)
      setLoading(false)
    })
  }

  const onLogout = () => {
    setLoading(true)
    try {
      cookie.remove('email')
      cookie.remove('role')
    } catch {
      setError(true)
    }
    setLoading(false)
  }

  return {isLoading, onLogin, onLogout}
}

export default useLogin