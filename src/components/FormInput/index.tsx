import React, {FC} from 'react';

interface FormInputProps {
  label: string,
  type: string,
  name: string,
  placeholder?: string,
  error: string,
  reference?: any,
  changeHandler: (event: any) => void
}

const FormInput:FC<FormInputProps> = ({
  label,
  type,
  name,
  placeholder,
  error,
  changeHandler,
  reference
}) => {
  return (
    <div className="form-input__input-group input-group">
      <label className="form-input__label label">{label}</label>
      <input
        onChange={changeHandler}
        type={type}
        name={name}
        ref={reference}
        className="form-input__input input"
        placeholder={placeholder}
      />
      {
        error ? <div className="form-input__form-error form-error">{error}</div> : ''
      }
    </div>
  )
}

export default FormInput
