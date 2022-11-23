import React, {createRef, FC, useState, ChangeEvent} from 'react'
import Loader from '../Loader'
import {setFirebaseData} from '../../helpers/firebase.helper'
import useForm from '../../hooks/useForm'
import {ISubtaskArray, ITask} from '../../types'
import useFirebasePathHelper from '../../hooks/useFirebasePathHelper'

import './index.scss'
import FormInput from "../FormInput";

interface CreateTaskProps {
  modalState: boolean,
  closeModalBackdrop: (event: ChangeEvent<HTMLDivElement>) => void
  closeModal: () => void
}

const CreateTask: FC<CreateTaskProps> = ({ modalState, closeModalBackdrop, closeModal }) => {

  const [loading, setLoading] = useState<boolean>(false)
  const [subtaskArray, setSubtaskArray] = useState<Array<ISubtaskArray>>([])
  const firebasePathHelper = useFirebasePathHelper()
  const taskTitleInput = createRef<HTMLInputElement>()
  const deadlineInput = createRef<HTMLInputElement>()
  const subtaskInput = createRef<HTMLInputElement>()


  const removeSubtask = (subtaskIndex: number): void => {
    setSubtaskArray(subtaskArray.filter((item: any, index: number) => index !== subtaskIndex))
  }

  const addSubTask = (): void => {
    if(values.subtask !== '') {
      setSubtaskArray([...subtaskArray, {
        subtask: values.subtask
      }])
      subtaskInput.current!.value = ''
    }
  }

  const createTask = async (): Promise<void> => {
    try {
      const taskId: number = Date.now()
      setLoading(true)
      const taskData: ITask = {
        id: taskId,
        title: values.taskTitle,
        time: values.taskDeadline,
        status: false,
        subtaskArray: subtaskArray
      }
      taskTitleInput.current!.value = ''
      deadlineInput.current!.value = ''
      subtaskInput.current!.value = ''
      setSubtaskArray([])
      await setFirebaseData(`${firebasePathHelper.user_tasks_path}/${taskId}`, taskData)
      setLoading(false)
    } catch (error) {
      throw error
    }
  }

  const { changeHandler, values, errors, submitHandle } = useForm(createTask)

  return (
    <div onClick={(event: any) => closeModalBackdrop(event)} className={`create-task__backdrop ${modalState ? 'visible' : ''}`}>
      {
        loading ?  <Loader/> : ''
      }
      <div className="create-task">
        <div className="create-task__header">
          <div className="create-task__title">Create Task</div>
          <div onClick={closeModal} className="create-task__close">
            <svg className="create-task__close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="create-task__close-icon" d="M4.00007 2.16359L10.0001 8.16359L16.0001 2.18178C16.239 1.93868 16.5686 1.80687 16.9092 1.81814C17.593 1.86232 18.1377 2.40705 18.1819 3.09087C18.1852 3.41923 18.0537 3.73468 17.8183 3.96359L11.8001 9.99996L17.8183 16.0363C18.0537 16.2652 18.1852 16.5807 18.1819 16.909C18.1377 17.5929 17.593 18.1376 16.9092 18.1818C16.5686 18.193 16.239 18.0612 16.0001 17.8181L10.0001 11.8363L4.01825 17.8181C3.77934 18.0612 3.4497 18.193 3.10916 18.1818C2.41189 18.1454 1.85461 17.5881 1.81825 16.8909C1.81498 16.5625 1.94643 16.247 2.18189 16.0181L8.20007 9.99996L2.1637 3.96359C1.9348 3.73159 1.81007 3.41668 1.81825 3.09087C1.86243 2.40705 2.40716 1.86232 3.09098 1.81814C3.4288 1.80214 3.75807 1.92723 4.00007 2.16359Z" fill="#303030"/>
            </svg>
          </div>
        </div>
        <form onSubmit={submitHandle} className="create-task__form">

          <div className="create-task__input-grout input-grout">
            <FormInput
              label="Task Title"
              type="text"
              name="taskTitle"
              reference={taskTitleInput}
              placeholder="Go Shop"
              error={errors.taskTitle ? errors.taskTitle : ''}
              changeHandler={changeHandler}
            />
          </div>
          <div className="create-task__input-grout input-grout">
            <FormInput
              label="Task Deadline"
              type="date"
              name="taskDeadline"
              reference={deadlineInput}
              error={errors.taskDeadline ? errors.taskDeadline : ''}
              changeHandler={changeHandler}
            />
          </div>
          <div className="create-task__add-subtask input-grout">
            <FormInput
              label="Subtask"
              type="text"
              name="subtask"
              placeholder="Buy Milk"
              reference={subtaskInput}
              error={errors.subtask ? errors.subtask : ''}
              changeHandler={changeHandler}
            />
            <div onClick={addSubTask} className="create-task__add-subtask-button button button_green">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 12H19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="create-task__subtask-wrapper" style={subtaskArray.length === 0 ? {display: "none"}: {}}>
            <div className="create-task__subtask-title">Subtasks</div>
            {
              subtaskArray.map((item: any, index: number) => {
                return (
                  <div key={index} className="create-task__subtask-item">
                    <div className="create-task__subtask-item-text">{item.subtask}</div>
                    <div onClick={() => removeSubtask(index)} className="create-task__subtask-item-button button button_red">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.7347 1.09737H17.7783V0.953699C17.7783 0.545658 17.4474 0.214813 17.0394 0.214813H10.9611C10.553 0.214813 10.2222 0.545658 10.2222 0.953699V1.09737H4.26574C3.8577 1.09737 3.52686 1.42822 3.52686 1.83626V4.75443C3.52686 5.16247 3.8577 5.49332 4.26574 5.49332H23.7347C24.1428 5.49332 24.4736 5.16247 24.4736 4.75443V1.83626C24.4736 1.42822 24.1428 1.09737 23.7347 1.09737Z" fill="white"/>
                        <path d="M22.6247 6.99069H5.37609C4.96805 6.99069 4.63721 7.32154 4.63721 7.72958V27.0463C4.63721 27.4543 4.96805 27.7852 5.37609 27.7852H22.6247C23.0328 27.7852 23.3636 27.4543 23.3636 27.0463V7.72958C23.3636 7.32154 23.0328 6.99069 22.6247 6.99069ZM10.4907 25.1262C10.4907 25.5342 10.1599 25.8651 9.75182 25.8651H9.06409C8.65605 25.8651 8.3252 25.5342 8.3252 25.1262V9.6497C8.3252 9.24166 8.65605 8.91082 9.06409 8.91082H9.75182C10.1599 8.91082 10.4907 9.24166 10.4907 9.6497V25.1262ZM15.0833 25.1262C15.0833 25.5342 14.7525 25.8651 14.3444 25.8651H13.6567C13.2487 25.8651 12.9178 25.5342 12.9178 25.1262V9.6497C12.9178 9.24166 13.2487 8.91082 13.6567 8.91082H14.3444C14.7525 8.91082 15.0833 9.24166 15.0833 9.6497V25.1262ZM19.6756 25.1262C19.6756 25.5342 19.3448 25.8651 18.9367 25.8651H18.249C17.841 25.8651 17.5101 25.5342 17.5101 25.1262V9.6497C17.5101 9.24166 17.841 8.91082 18.249 8.91082H18.9367C19.3448 8.91082 19.6756 9.24166 19.6756 9.6497V25.1262Z" fill="white"/>
                      </svg>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <button type="submit" className="create-task__create-button button button_green">Create Task</button>

        </form>
      </div>
    </div>
  )
}

export default CreateTask
