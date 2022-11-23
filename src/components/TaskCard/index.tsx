import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import routesHelper from '../../helpers/routeString.helper'

import './index.scss'
import done from '../../assets/images/done.svg'
import inProgress from '../../assets/images/in_progress.svg'

interface TaskCardProps {
  readonly task: any
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {


  const currentStatus = (status: boolean): string | undefined => {
    return status ? done : inProgress
  }

  return (
    <Link to={`${routesHelper.task_page_name}/${task.id}`} className="task-card">
      <div className="task-card__wrapper">
        <h2 className="task-card__title">{task.title}</h2>
        <div className="task-card__status">
          <img src={currentStatus(task.status)} alt="Status icon"/>
        </div>
      </div>
    </Link>
  )
}

export default TaskCard
