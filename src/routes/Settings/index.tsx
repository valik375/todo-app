import React, {createRef, useEffect, useState, ChangeEvent} from 'react'
import NotificationMessage from '../../components/NotificationMessage'
import Loader from '../../components/Loader'
import {updateUserEmail, updateUserProfile, uploadImageToStore} from '../../helpers/firebase.helper'
import useForm from '../../hooks/useForm'
import useFirebasePathHelper from '../../hooks/useFirebasePathHelper'
import {IUser} from '../../types'
import {Link} from 'react-router-dom'
import routesHelper from '../../helpers/routeString.helper'

import defaultImage from '../../assets/images/account_image.svg'
import './index.scss'
import FormInput from "../../components/FormInput";

interface userImageBase64Type {
  name: string,
  size: number,
  url: any,
  errorMessage: string
}

const Settings = () => {

  const userData: IUser = JSON.parse(localStorage.getItem('userData') || '{}')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [notificationStatus, setNotificationStatus] = useState<string>('')
  const [userImageBase64, setUserImageBase64] = useState<userImageBase64Type>({
    name: 'Default Image',
    size: 1370,
    url: userData.photoURL ? userData.photoURL : defaultImage,
    errorMessage: ''
  })
  const [image, setImage] = useState<any>({})
  const firebasePathHelper = useFirebasePathHelper()
  const fullNameInput = createRef<HTMLInputElement>()
  const emailInput = createRef<HTMLInputElement>()

  const toBase64 = (file: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

  const uploadUserImage = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files![0]
    setImage(file)
    const fileName = file.name
    const fileSize = file.size

    if (fileSize > 5000000) {
      setUserImageBase64({
        name: 'Error',
        size: 0,
        url: defaultImage,
        errorMessage: 'File to big! Max file size 5Mb.'
      })
    } else {
      const imageUrl: any = await toBase64(file)
      setUserImageBase64({
        name: fileName,
        size: fileSize,
        url: imageUrl,
        errorMessage: ''
      })
      event.target.value = ''
    }
  }

  function byteConverter(bytes: number, decimals?: number): string {
    const K_UNIT = 1024
    const SIZES = ["Bytes", "KB", "MB"]

    if(bytes === 0) {
      return '0 Byte'
    }

    let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT))
    return parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i]
  }

  const changeUserData = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const imageUrl = image.size ? await uploadImageToStore(`${firebasePathHelper.user_image_path}/photoURL`, image) : userData.photoURL
      const updatedUserData = {
        displayName: values.fullName,
        photoURL: imageUrl,
      }
      await updateUserProfile(updatedUserData)
      const email =  values.email === undefined ? userData.email : values.email
      if (email !== userData.email) {
        await updateUserEmail(values.email)
      }
      setIsLoading(false)
      setText('Your profile updated successfully!')
      setNotificationStatus('success')
    } catch (error) {
      setText('Something went wrong!')
      setNotificationStatus('error')
    }
  }

  const { changeHandler, values, errors, submitHandle } = useForm(changeUserData)

  useEffect(() => {
    if (fullNameInput.current && emailInput.current) {
      fullNameInput.current.value = userData.displayName
      emailInput.current.value = userData.email
    }
  }, [])

  return (
    <div className="settings">
      {
        isLoading ? <Loader /> : ''
      }
      <NotificationMessage text={text} messageType={notificationStatus} setText={setText} />
      <div className="settings__container">
        <form onSubmit={submitHandle} className="settings__form">
          <div className="settings__image-wrapper">
            <label htmlFor="userImage" className="settings__label image-label">
              <img
                src={userImageBase64.url}
                alt={userImageBase64.name}
                className="settings__image"
              />
            </label>
            <div className="settings__image-info">
              <div className="settings__image-name">
                File name: <strong>{userImageBase64.name}</strong>
              </div>
              <div className="settings__image-size">
                File size: <strong>{byteConverter(userImageBase64.size, 2)}</strong>
              </div>
              {
                userImageBase64.errorMessage ? <div className="settings__image-error">{userImageBase64.errorMessage}</div> : ''
              }
            </div>
            <input
              onChange={(event: any) => uploadUserImage(event)}
              id="userImage"
              type="file"
              className="settings__input image-input"
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="settings__input-group input-group">
            <FormInput
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Full Name"
              reference={fullNameInput}
              error={errors.fullName ? errors.fullName : ''}
              changeHandler={changeHandler}
            />
          </div>
          <div className="settings__input-group input-group">
            <FormInput
              label="Email"
              type="email"
              name="email"
              placeholder="Email"
              reference={emailInput}
              error={errors.email ? errors.email : ''}
              changeHandler={changeHandler}
            />
          </div>
          <button type="submit" className="settings__button button button_green">Update Profile</button>
        </form>
        <Link
          to={routesHelper.reset_password_page_path}
          className="settings__change-password-button button button_green"
        >Change password</Link>
      </div>
    </div>
  )
}

export default Settings
