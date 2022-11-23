import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Loader from '../../components/Loader'
import {getFirebaseData, removeFirebaseData, setFirebaseData} from '../../helpers/firebase.helper'
import routesHelper from '../../helpers/routeString.helper'
import useFirebasePathHelper from '../../hooks/useFirebasePathHelper'
import {ITask} from '../../types'

import inProgress from '../../assets/images/in_progress.svg'
import done from '../../assets/images/done.svg'
import './index.scss'


const Task = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [task, setTask] = useState<ITask | ''>('')
  const {id} = useParams()
  const navigate = useNavigate()
  const firebasePathHelper = useFirebasePathHelper()

  const finishTask = async (): Promise<void> => {
    if(task !== '') {
      setIsLoading(true)
      const data = task
      data.status = !data.status
      await setFirebaseData(`${firebasePathHelper.user_tasks_path}/${id}`, data)
      navigate(routesHelper.home_page_path)
    }
  }

  const removeTask = async ():Promise<void> => {
    const isRemove: boolean = window.confirm("Do you wont to remove this task?")
    if(isRemove) {
      setIsLoading(true)
      await removeFirebaseData(`${firebasePathHelper.user_tasks_path}/${id}`)
      navigate(routesHelper.home_page_path)
    }

  }

  useEffect(() => {
    (async ():Promise<void> => {
      setIsLoading(true)
      setTask(await getFirebaseData(`${firebasePathHelper.user_tasks_path}/${id}`))
      setIsLoading(false)
    })();
  }, [])

  return (
    <div className="task">
      {
        isLoading ? <Loader/> : task !== '' ? (
          <div className="task__container container">
            <div className="task__header">
              <div className="task__header-wrapper">
                <h1 className="task__title">{task.title}</h1>
                <div className="task__date">{task.time}</div>
              </div>
              <div className="task__status">
                <img src={task.status ? done : inProgress} alt="Task Status"/>
              </div>
            </div>
            <div className="task__wrapper">
              {
                task.subtaskArray ? task.subtaskArray.map((item: any, index: number) => {
                  return (
                    <div key={index} className="task__sub-item">
                      {index + 1}) {item.subtask}
                    </div>
                  )
                }): ''
              }
              <div className="task__button-wrapper">
                <button onClick={finishTask} className="task__button button button_green">
                  {
                    task.status ? 'Mark as in progress' : 'Mark as finished'
                  }
                </button>
                <button onClick={removeTask} className="task__button button button_red">Remove task</button>
              </div>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default Task
