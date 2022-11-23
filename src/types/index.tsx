export interface IUser {
  displayName: string,
  uid: string,
  email: string,
  photoURL: string
}

export interface ISubtaskArray {
  subtask: string,
}

export interface ITask {
  id: number,
  status: boolean,
  time: string,
  title: string,
  subtaskArray: ISubtaskArray[]
}