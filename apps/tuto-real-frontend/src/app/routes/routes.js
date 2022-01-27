import React from 'react'
import {Route, Routes} from 'react-router-dom'

import RegistrationPage from '../pages/RegistrationPage'

export default function MainRoute() {
  return (
    <Routes>
      <Route exact path="/register" element={RegistrationPage} />

    </Routes>
  )
}