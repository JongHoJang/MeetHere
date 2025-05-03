import React from 'react'

interface Option {
  label: string
  value: number
}

interface DropdownInputFieldProps {
  label: string
  id: string
  name: string
  placeholder: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
  options: Option[]
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
  <div className="flex flex-col mb-5 w-full">
    <label htmlFor={id} className="mb-1 text-sm">
      {label}
    </label>
    <select
      id={id}
      name={name}
      onChange={onChange}
      className={`border-[1px] border-solid border-sub-d-black rounded-[4px] px-4 py-3 text-sm sm:py-4 sm:text-base ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export default DropdownInputField
