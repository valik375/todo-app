import routesHelper from '../helpers/routeString.helper'
import Home from './Home'
import Login from './Login'
import Registration from './Registration'
import Task from './Task'
import Settings from './Settings'
import ResetPassword from './ResetPassword'

const routes = [
  {
    name: routesHelper.login_page_name,
    path: routesHelper.login_page_path,
    element: <Login/>,
    layout: 'auth'
  },
  {
    name: routesHelper.registration_page_name,
    path: routesHelper.registration_page_path,
    element: <Registration/>,
    layout: 'auth'
  },
  {
    name: routesHelper.home_page_name,
    path: routesHelper.home_page_path,
    element: <Home/>,
    layout: 'app'
  },
  {
    name: routesHelper.task_page_name,
    path: `${routesHelper.task_page_path}/:id`,
    element: <Task/>,
    layout: 'app'
  },
  {
    name: routesHelper.settings_page_name,
    path: routesHelper.settings_page_path,
    element: <Settings/>,
    layout: 'app'
  },
  {
    name: routesHelper.reset_password_page_name,
    path: routesHelper.reset_password_page_path,
    element: <ResetPassword/>,
    layout: 'auth'
  },
]

export default routes
