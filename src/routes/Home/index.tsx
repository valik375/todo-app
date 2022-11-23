import React, {useEffect, useState, ChangeEvent} from 'react'
import TaskCard from '../../components/TaskCard'
import CreateTask from '../../components/CreateTask'
import Loader from '../../components/Loader'
import firebase from 'firebase'
import {ITask} from '../../types'
import useFirebasePathHelper from '../../hooks/useFirebasePathHelper'

import './index.scss'

const Home = () => {

  const [modalState, setModalState] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [taskData, setTaskData] = useState<Array<ITask>>([])
  const [sortedTaskData, setSortedTaskData] = useState<Array<ITask>>([])
  const firebasePathHelper = useFirebasePathHelper()

  const closeModalBackdrop = (event: ChangeEvent<HTMLDivElement>):void => {
    if (event.target.className === 'create-task__backdrop visible') {
      setModalState(false)
    }
  }

  const closeModal = ():void => {
    setModalState(false)
  }

  const sortTasks = (event: ChangeEvent<HTMLSelectElement>): void => {
    const sortBy = event.target.value === 'done' ? true : event.target.value === 'inProgress' ? false : ''
    if (sortBy !== '') {
      setSortedTaskData(taskData.filter((task: ITask) => task.status === sortBy))
    } else {
      setSortedTaskData(taskData)
    }
  }

  useEffect(() => {
    (async (): Promise<void> => {
      const tasksURL = firebase.database().ref(`${firebasePathHelper.user_tasks_path}`)
      const isData = (await tasksURL.once('value')).val()
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isData === null ? setIsLoading(false) : ''
      tasksURL.on('child_added', (snap) => {
        setIsLoading(true)
        setTaskData((currentState: any) => {
          let updatedState = [...currentState]
          updatedState.push(snap.val())
          setSortedTaskData(updatedState)
          setIsLoading(false)
          return updatedState
        })
      })
    })();
  }, [])

  return (
    <div className="home">
      {
        isLoading ? <Loader /> : ''
      }
      <div className="home__container container">
        <div className="home__nav">
          <select onChange={(event: any) => sortTasks(event)} className="home__nav-select select" defaultValue="all">
            <option value="all">All</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button onClick={() => setModalState(true)} className="home__nav-button button button_green">Create task</button>
        </div>
        <div className="home__wrapper">
          <CreateTask
            closeModalBackdrop={closeModalBackdrop}
            closeModal={closeModal}
            modalState={modalState}
          />
          {
            sortedTaskData.length ? sortedTaskData.map((item: any, index: number) => {
              return <TaskCard key={index} task={item} />
            }) : <div className="home__message">You have no tasks!</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Home
