import {useState} from 'react';

const useForm = (callback: any) => {

  const [values, setValues] = useState<any>({})
  const [errors, setErrors] = useState<any>({})

  const validate = (event: any, inputName: string, inputValue: any) => {

    switch (inputName){
      case 'fullName':
        if(inputValue.length <= 4) {
          setErrors({
            ...errors,
            fullName: 'User name have 5 letters!'
          })
        } else if (inputValue.match(/[0-9]/)) {
          setErrors({
            ...errors,
            fullName: 'Full name must not have numbers!'
          })
        } else {
          const errorObj = errors
          delete errorObj.fullName
          setErrors(errorObj)
        }
        break
      case 'email':
        const validateEmail = inputValue.toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        if(!validateEmail){
          setErrors({
            ...errors,
            email: 'You enter wrong email!'
          })
        } else {
          const errorObj = errors
          delete errorObj.email
          setErrors(errorObj)
        }
        break
      case 'password':
        if(inputValue.length < 6) {
          setErrors({
            ...errors,
            password: 'Password must be more than 6 characters long.'
          })
        } else if (inputValue.search(/[a-z]/i) < 0) {
          setErrors({
            ...errors,
            password: 'Your password must contain at least one letter.'
          })
        } else if (inputValue.search(/[0-9]/) < 0) {
          setErrors({
            ...errors,
            password: 'Your password must contain at least one digit.'
          })
        } else {
          const errorObj = errors
          delete errorObj.password
          setErrors(errorObj)
        }

        break
      case 'loginPassword':
        if(inputValue.length < 6) {
          setErrors({
            ...errors,
            loginPassword: 'Password must be more than 6 characters long.'
          })
        } else {
          const errorObj = errors
          delete errorObj.loginPassword
          setErrors(errorObj)
        }
        break
      case 'taskTitle':
        if(inputValue.length < 0) {
          setErrors({
            ...errors,
            taskTitle: 'This required field!'
          })
        } else {
          const errorObj = errors
          delete errorObj.taskTitle
          setErrors(errorObj)
        }
        break
      case 'taskDeadline':
        if(inputValue.length < 0) {
          setErrors({
            ...errors,
            taskDeadline: 'This required field!'
          })
        } else {
          const errorObj = errors
          delete errorObj.taskDeadline
          setErrors(errorObj)
        }
        break
      case 'subtask':
        if(inputValue.length < 0) {
          setErrors({
            ...errors,
            subtask: 'This required field!'
          })
        } else {
          const errorObj = errors
          delete errorObj.subtask
          setErrors(errorObj)
        }
        break
      default:
        break
    }
  }

  const changeHandler = (event: any) => {
    event.persist()

    const inputName = event.target.name
    const inputValue = event.target.value

    validate(event, inputName, inputValue)

    setValues({
      ...values,
      [inputName]: inputValue,
    })
  }

  const submitHandle = (event: any) => {
    if(event) {
      event.preventDefault()
    }

    if(Object.keys(errors).length === 0) {
      callback()
    }
  }

  return {
    values,
    errors,
    changeHandler,
    submitHandle
  }
}

export default useForm;
