'use client'

import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerInputFieldProps {
  label: string
  id: string
  selectedDate: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  className?: string
}

const DatePickerInputField: React.FC<DatePickerInputFieldProps> = ({
  label,
  id,
  selectedDate,
  onChange,
  placeholder = '생년월일을 선택해주세요',
  className,
}) => {
  return (
    <div className="flex flex-col mb-5">
      <label
        htmlFor={id}
        className="mb-1 text-sm sm:text-base font-medium text-gray-700"
      >
        {label}
      </label>
      <DatePicker
        id={id}
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        className={`w-full border-[1px] border-solid border-sub-d-black rounded-[4px]
                    px-4 py-3 text-sm sm:py-4 sm:text-base  ${className}`}
      />
    </div>
  )
}

export default DatePickerInputField
