import WorkoutSelect from 'components/general/UI/WorkoutSelect'
import { useState } from 'react'

export default function YearSelector({
		startYear,
		onChange,
		selectedYear
}) {
	const currentYear = new Date().getFullYear()
	const years = []
	for (let i = startYear; i <= currentYear; i++) {
		years.push({ value: i, label: i })
	}

	return (
		<WorkoutSelect
			selectedOption={selectedYear}
			handleChange={onChange}
			options={years}
		/>
	)
}
