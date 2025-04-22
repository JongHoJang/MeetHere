import React from 'react'

interface InputFieldProps {
  label: string | React.ReactNode
  id: string
  name: string
  type: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  defaultValue?: string
  value?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  onChange,
  defaultValue,
  className,
  value,
}) => (
  <div className="flex flex-col mb-5">
    <label
      htmlFor={id}
      className="mb-1 text-sm sm:text-base font-medium text-gray-700"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      className={`border-[1px] border-solid border-sub-d-black rounded-[4px]
                  px-4 py-3 text-sm
                  sm:py-4 sm:text-base
                  ${className}`}
      value={value}
      required
    />
  </div>
)

export default InputField
