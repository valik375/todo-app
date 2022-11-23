import React, {FC, useEffect} from 'react'

import errorIcon from '../../assets/images/error_icon.svg'
import warningIcon from '../../assets/images/warning_icon.svg'
import successIcon from '../../assets/images/success_icon.svg'
import './index.scss'

interface ErrorMessageProps {
  text: string,
  messageType: string,
  setText: (value: string) => void,
}

const ErrorMessage: FC<ErrorMessageProps> = ({text, setText, messageType}) => {

  const messageIcon: string = messageType === 'error' ? errorIcon : messageType === 'warning' ? warningIcon : successIcon

  useEffect((): any => {
    setTimeout(() => {
      setText('')
    }, 5000)
  }, [text])

  return (
    <div className={`error-message ${text.length ? 'visible' : ''} ${messageType}`}>
      <div className="error-message__icon">
        <img src={messageIcon} alt="Icon"/>
      </div>
      <div className="error-message__wrapper">
        <div className="error-message__text">{text}</div>
      </div>
    </div>
  )
}

export default ErrorMessage
