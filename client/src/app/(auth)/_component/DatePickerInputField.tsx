'use client'

import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface InputFieldProps {
  label: string
  id: string
  name: string
  placeholder: string
  className?: string
  onChange?: (date: Date | null) => void
  defaultDate?: Date
}

const DatePickerInputField: React.FC<InputFieldProps> = ({
  label,
  id,
  placeholder,
  onChange,
  defaultDate = new Date('1994-01-01'),
  className,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    if (onChange) onChange(date)
  }

  return (
    <div className="flex flex-col mb-5 w-full">
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <DatePicker
        id={id}
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={placeholder}
        openToDate={defaultDate}
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        className={`border-[1px] border-solid border-sub-d-black rounded-[4px] px-4 py-4 text-sm ${className}`}
        wrapperClassName="w-full"
        minDate={new Date('1900-01-01')}
        maxDate={new Date()}
      />
    </div>
  )
}

export default DatePickerInputField
