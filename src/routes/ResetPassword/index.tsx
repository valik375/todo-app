import React, {createRef, FC, useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import NotificationMessage from '../../components/NotificationMessage'
import useForm from '../../hooks/useForm'
import Loader from '../../components/Loader'
import FormInput from '../../components/FormInput'
import firebaseErrorHelper from '../../helpers/firebaseError.helper'
import {logout, resetPasswordByEmail} from '../../helpers/firebase.helper'
import routesHelper from '../../helpers/routeString.helper'
import {IUser} from '../../types'

import './index.scss'


const ResetPassword: FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEmailSend, setIsEmailSend] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>('')
  const emailInput = createRef<HTMLInputElement>()
  const navigate = useNavigate()

  const userData: IUser = JSON.parse(localStorage.getItem('userData') || '{}')

  const logoutUser = async ():Promise<void> => {
    setIsLoading(true)
    await logout()
    navigate(routesHelper.login_page_path)
  }

  const resetPassword = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await resetPasswordByEmail(values.email ? values.email : userData.email).then(() => {
        setIsEmailSend(true)
        setIsLoading(false)
      })
    } catch (error: any) {
      setIsLoading(false)
      setMessageText(firebaseErrorHelper(error.code))
    }
  }

  const { changeHandler, values, errors, submitHandle } = useForm(resetPassword)

  useEffect(() => {
    if (userData.email && emailInput.current !== null) {
      emailInput.current.value = userData.email
    }
  }, [emailInput])

  return (
    <div className="reset-password">
      {
        isLoading ? <Loader /> : ''
      }
      <NotificationMessage text={messageText} messageType="error" setText={setMessageText} />
      <div className="reset-password__wrapper">
        {
          isEmailSend ? (
            <div className="reset-password__success">
              <div className="reset-password__success-icon">
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6.82759L6.57412 11.2637C6.98637 11.6635 7.64989 11.6347 8.026 11.2008L16 2" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="reset-password__success-text">
                We send you reset password link.
                <br/>
                Check pleas your email!
              </div>
              <button onClick={logoutUser} className="reset-password__success-button button button_green">Continue</button>
            </div>
            ) : (
            <form onSubmit={submitHandle} className="reset-password__form">
              <h1 className="reset-password__title auth-title">Reset Password</h1>
              <p className="reset-password__text">Enter your email to reset password.</p>
              <div className="reset-password__input-group input-group">
                <FormInput
                  label="Email"
                  type="email"
                  name="email"
                  reference={emailInput}
                  placeholder="you@gmail.com"
                  error={errors.email ? errors.email : ''}
                  changeHandler={changeHandler}
                />
              </div>
              <button type="submit" className="reset-password__button button button_green">Reset</button>
              <Link
                to={userData.uid ? routesHelper.settings_page_path : routesHelper.login_page_path}
                className="reset-password__link auth-link"
              >{userData.uid ? 'Back to Settings' : 'Back to Login'}</Link>
            </form>
          )
        }
      </div>
    </div>
  );
};

export default ResetPassword
