import {useState} from 'react'

const useFirebasePathHelper = () => {

  const [uid, setUid] = useState<string>(JSON.parse(localStorage.getItem('uid') || '{}'))
  const [firebasePathHelper, setFirebasePathHelper] = useState<any>({
    user_tasks_path: `/${uid}/tasks`,
    user_image_path: `/${uid}`,
  })

  return (
    firebasePathHelper
  )
}

export default useFirebasePathHelper;