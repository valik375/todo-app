import React, {FC, useState} from 'react'
import Loader from '../../components/Loader'
import NotificationMessage from '../../components/NotificationMessage'
import {Link, useNavigate} from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { login } from '../../helpers/firebase.helper'
import routesHelper from '../../helpers/routeString.helper'
import FormInput from '../../components/FormInput'

import './index.scss'

const Login:FC = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [errorText, setErrorText] = useState<string>('')
  const navigate = useNavigate()

  const authorization = async ():Promise<void> => {
    try {
      setLoading(true)
      await login(values.email, values.loginPassword)
      navigate(routesHelper.home_page_path)
      setErrorText('')
    } catch (error) {
      setLoading(false)
      setErrorText('Something  went wrong!')
    }
  }

  const { changeHandler, values, errors, submitHandle } = useForm(authorization)

  return (
    <div className="login">
      {
        loading ? <Loader /> : ''
      }
      <NotificationMessage text={errorText} setText={setErrorText} messageType="error"/>
      <div className="login__wrapper">
        <h1 className="login__title auth-title">Login</h1>
        <p className="login__text">Doesn't have an account yet? Sign Up</p>
        <form onSubmit={submitHandle} className="login__form">
          <div className="login__input-grout input-grout">
            <FormInput
              label="Email"
              type="email"
              name="email"
              placeholder="you@gmail.com"
              error={errors.email ? errors.email : ''}
              changeHandler={changeHandler}
            />
          </div>
          <div className="login__input-grout input-grout">
            <FormInput
              label="Password"
              type="password"
              name="loginPassword"
              placeholder="Enter 6 characters or more"
              error={errors.loginPassword ? errors.loginPassword : ''}
              changeHandler={changeHandler}
            />
          </div>
          <Link to={routesHelper.reset_password_page_path} className="login__reset-password">Forgot Password?</Link>
          <button type="submit" className="login__button button button_green">Login</button>
        </form>
        <Link className="login__link auth-link" to={routesHelper.registration_page_path}>Registration</Link>
      </div>
    </div>
  )
}

export default Login
