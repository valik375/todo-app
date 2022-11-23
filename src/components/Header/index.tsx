import React, {FC} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import routesHelper from '../../helpers/routeString.helper'
import {logout} from '../../helpers/firebase.helper'
import {IUser} from '../../types'

import defaultUserImage from '../../assets/images/account_image.svg'
import './index.scss'

const Header: FC = () => {

  const user: IUser = JSON.parse(localStorage.getItem('userData') || '{}')
  const navigate = useNavigate()

  const logoutUser = async ():Promise<void> => {
    await logout()
    navigate(routesHelper.login_page_path)
  }

  return (
    <div className="header">
      <div className="header__container container">
        <div className="header__wrapper">
          <Link to={routesHelper.home_page_path} className="header__title">ToDoApp</Link>
          <div className="header__user">
            <div className="header__user-info">
              <div className="header__user-name-wrapper">
                <div className="header__user-name">
                  <span>{user.displayName}</span>
                  <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_424_27)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.791986 0.276372C0.399986 0.632735 0.399986 1.20728 0.791986 1.56364L7.43999 7.60728C7.75199 7.89092 8.25599 7.89092 8.56799 7.60728L15.216 1.56364C15.608 1.20728 15.608 0.632735 15.216 0.276371C14.824 -0.0799926 14.192 -0.0799925 13.8 0.276371L7.99999 5.54183L2.19999 0.2691C1.81599 -0.0799908 1.17599 -0.079992 0.791986 0.276372Z" fill="#303030"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_424_27">
                        <rect width="8" height="16" fill="white" transform="translate(0 8) rotate(-90)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="header__user-nav">
                  <div className="header__user-nav-wrapper">
                    <Link to={routesHelper.settings_page_path} className="header__user-link">
                      <div className="header__user-link-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#fff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M20.8185 7.7745L20.0685 6.4755C19.6545 5.75775 18.7373 5.5125 18.0195 5.9265L17.625 6.1545C16.125 7.02 14.25 5.93775 14.25 4.206V3.75C14.25 2.92125 13.5788 2.25 12.75 2.25H11.25C10.4213 2.25 9.75004 2.92125 9.75004 3.75V4.206C9.75004 5.93775 7.87504 7.02075 6.37504 6.1545L5.98054 5.9265C5.26279 5.5125 4.34554 5.75775 3.93154 6.4755L3.18154 7.7745C2.76754 8.49225 3.01279 9.4095 3.73054 9.8235L4.12504 10.0515C5.62504 10.9178 5.62504 13.0822 4.12504 13.9485L3.73054 14.1765C3.01279 14.5905 2.76754 15.5078 3.18154 16.2255L3.93154 17.5245C4.34554 18.2422 5.26279 18.4875 5.98054 18.0735L6.37504 17.8455C7.87504 16.9793 9.75004 18.0623 9.75004 19.794V20.25C9.75004 21.0788 10.4213 21.75 11.25 21.75H12.75C13.5788 21.75 14.25 21.0788 14.25 20.25V19.794C14.25 18.0623 16.125 16.9793 17.625 17.8455L18.0195 18.0735C18.7373 18.4875 19.6545 18.2422 20.0685 17.5245L20.8185 16.2255C21.2325 15.5078 20.9873 14.5905 20.2695 14.1765L19.875 13.9485C18.375 13.0822 18.375 10.9178 19.875 10.0515L20.2695 9.8235C20.9873 9.4095 21.2333 8.49225 20.8185 7.7745Z" stroke="#fff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      Settings
                    </Link>
                    <div onClick={() => logoutUser()} className="header__user-link">
                      <div className="header__user-link-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_430_59)">
                            <path d="M20 6L18 6L18 4L6 4L6 20L18 20L18 18L20 18L20 21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22L5 22C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21L4 3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10535 4.73479 2 5 2L19 2C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3L20 6ZM18 13L11 13L11 11L18 11L18 8L23 12L18 16L18 13Z" fill="#fff"/>
                          </g>
                          <defs>
                            <clipPath id="clip0_430_59">
                              <rect width="24" height="24" fill="white" transform="translate(24 24) rotate(-180)"/>
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      Logout
                    </div>
                  </div>
                </div>
              </div>
              <div className="header__user-image">
                <img src={user.photoURL ? user.photoURL : defaultUserImage} alt="user"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
