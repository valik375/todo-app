import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import routesHelper from '../helpers/routeString.helper'

const ProtectedRoute = () => {
  const userId = localStorage.getItem('uid')

  return userId ? (<Outlet/>) : (<Navigate to={routesHelper.login_page_path} replace/>)
}

export default ProtectedRoute
