import React from 'react'

interface DropdownInputFieldProps {
  label: string
  id: string
  name: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  options: string[]
}

const DropdownInputField: React.FC<DropdownInputFieldProps> = ({
  label,
  id,
  name,
  placeholder,
  onChange,
  className,
  options,
}) => (
  <div className="flex flex-col mb-5">
    <label htmlFor={id} className="mb-1 text-[14px]">
      {label}
    </label>
    <select
      id={id}
      name={name}
      onChange={onChange}
      className={`border-[1px] border-solid border-sub-d-black rounded-[4px] px-4 py-4 text-[14px] ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

export default DropdownInputField
