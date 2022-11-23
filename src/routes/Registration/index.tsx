import React, {useState} from 'react'
import Loader from '../../components/Loader'
import NotificationMessage from '../../components/NotificationMessage'
import useForm from '../../hooks/useForm'
import {Link, useNavigate} from 'react-router-dom'
import {registration} from '../../helpers/firebase.helper'
import routesHelper from '../../helpers/routeString.helper'
import firebaseErrorHelper from '../../helpers/firebaseError.helper'
import FormInput from '../../components/FormInput'

import './index.scss'

const Registration = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errorText, setErrorText] = useState<string>('')
  const navigate = useNavigate()

  const createAccount = async (): Promise<void> => {
    try {
      setConfirmPassword('')
      if(values.password === values.confirmPassword) {
        setLoading(true)
        await registration(values.email, values.password, values.fullName)
        navigate(routesHelper.home_page_path)
      } else {
        setConfirmPassword('Passwords do not match!')
      }
    } catch (error: any) {
      setLoading(false)
      setErrorText(firebaseErrorHelper(error.code))
    }
  }

  const { changeHandler, values, errors, submitHandle } = useForm(createAccount)

  return (
    <div className="registration">
      {
        loading ? <Loader /> : ''
      }
      <NotificationMessage text={errorText} setText={setErrorText} messageType="error" />
      <div className="registration__wrapper">
        <h1 className="registration__title auth-title">Registration</h1>
        <p className="registration__text">You have account? Sign In</p>

        <form onSubmit={submitHandle} className="registration__form">
          <div className="registration__input-grout input-grout">
            <FormInput
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="John Smith"
              error={errors.fullName ? errors.fullName : ''}
              changeHandler={changeHandler}
            />
          </div>
          <div className="registration__input-grout input-grout">
            <FormInput
              label="Email"
              type="email"
              name="email"
              placeholder="you@gmail.com"
              error={errors.email ? errors.email : ''}
              changeHandler={changeHandler}
            />
          </div>
          <div className="registration__input-grout input-grout">
            <FormInput
              label="Password"
              type="password"
              name="password"
              placeholder="Enter 6 characters or more"
              error={errors.password ? errors.password : ''}
              changeHandler={changeHandler}
            />
          </div>
          <div className="registration__input-grout input-grout">
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Enter 6 characters or more"
              error={confirmPassword ? confirmPassword : ''}
              changeHandler={changeHandler}
            />
          </div>
          <button type="submit" className="registration__button button button_green">Registration</button>
        </form>
        <Link className="registration__link auth-link" to={routesHelper.login_page_path}>Login</Link>
      </div>
    </div>
  )
}

export default Registration
