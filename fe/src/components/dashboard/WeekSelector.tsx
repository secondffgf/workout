import { useState } from 'react'
import WorkoutSelect from 'components/general/UI/WorkoutSelect'

function formatDate(date, includeYear = false) {
	const d = date.getDate().toString().padStart(2, '0');
	const m = (date.getMonth() + 1).toString().padStart(2, '0');
	if (includeYear) {
		const y = date.getFullYear().toString().slice(-2);
		return `${d}.${m}.${y}`;
	} else {
		return `${d}.${m}`;
	}
}

// startDate in format "yyyy-mm-dd
function getWeekRangesFrom(startDate) {
	const result = [];
	const currentYear = new Date().getFullYear();
	const today = new Date();
				  
	// Clone startDate and set to start of the week (Monday)
	let start = new Date(startDate);
	// Adjust to Monday: getDay() returns 0 (Sun) to 6 (Sat)
	let day = start.getDay();
	const diffToMonday = day === 0 ? -6 : 1 - day; // Sunday treated as 7th day

	start.setDate(start.getDate() + diffToMonday);
	start.setHours(0, 0, 0, 0);
	
	while (start <= today) {
		const end = new Date(start);
		end.setDate(end.getDate() + 6);
		end.setHours(23, 59, 59, 999);

		// Check if either start or end year differs from current year
		const startYear = start.getFullYear();
		const endYear = end.getFullYear();
		const includeYear = (startYear !== currentYear) || (endYear !== currentYear);

		const formattedStart = formatDate(start, includeYear);
		const formattedEnd = formatDate(end, includeYear);

    let week = `${formattedStart} - ${formattedEnd}`
		result.push({ value: week, label: week });

		// Move to next week
		start.setDate(start.getDate() + 7);
	}

	return result;
}

export default function WeekSelector({ startDate, onSelect, selectedWeek }) {
	let options = getWeekRangesFrom(startDate)
	options = options.reverse()

	return (
		<WorkoutSelect
			selectedOption={selectedWeek}
			handleChange={onSelect}
			options={options}
		/>
	)
}
