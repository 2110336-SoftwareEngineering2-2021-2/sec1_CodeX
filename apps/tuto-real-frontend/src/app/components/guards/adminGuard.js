import React, { FC }  from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../auth'

const withAdminGuard = (WrappedComponent) => {
  return function AdminGuard(props) {
    const { currentUser, role } = useAuth()
    if(currentUser && role === "Admin") {
      return <WrappedComponent {...props} />
    } else {
      return <Navigate to="/" />
    }
  }
}

export default withAdminGuard