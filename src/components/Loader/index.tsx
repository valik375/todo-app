import React, {FC} from 'react'

import './index.scss'

const Loader: FC = () => {
  return (
    <div className="loader">
      <div className="loader__wrapper">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
