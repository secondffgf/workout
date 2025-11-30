import { useState } from 'react'
import { registerLocale } from 'react-datepicker'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Portal } from "react-overlays"
import enGB from "date-fns/locale/en-GB"

const CalendarContainer = ({children}) => {
	const el = document.getElementById("calendar-portal")
	return <Portal container={el}>{children}</Portal>
}

registerLocale('en-GB', enGB)


export default function SkyDatePicker({id, selectedDate, setSelectedDate, label = "Pick a date:"}) {
	return (
		<div className="flex flex-col gap-1 my-4 rounded-xl w-fit">
			<label
				htmlFor={id}
				className="tex-sm font-semibold text-stone-500"
			>
				{label}
			</label>
			<DatePicker
			  id={id}
				selected={selectedDate}
				onChange={(date) => setSelectedDate(date)}
				className="w-full p-1 border-b-2 rounded-sm border-sky-300 bg-sky-200 text-stone-600 focus:outline-none focus:border-sky-600"
				calendarClassName="bg-sky-50"
				showMonthDropdown
				showYearDropdown
				dropdownMode="select"
				popperPlacement="top-start"
				placeholderText="mm/dd/yyyy"
				popperContainer={CalendarContainer}
				locale="en-GB"
				autoComplete="off"
			/>
		</div>
	)
}
