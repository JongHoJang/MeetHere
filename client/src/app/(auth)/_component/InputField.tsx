import React from 'react'

interface InputFieldProps {
  label: string
  id: string
  name: string
  type: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  defaultValue?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  onChange,
  defaultValue,
  className,
}) => (
  <div className="flex flex-col mb-5">
    <label htmlFor={id} className="mb-1 text-[14px]">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      className={`border-[1px] border-solid border-sub-d-black rounded-[4px] px-4 py-4 text-[14px] ${className}`}
      required
    />
  </div>
)

export default InputField
