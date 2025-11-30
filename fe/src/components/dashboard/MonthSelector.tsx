import WorkoutSelect from 'components/general/UI/WorkoutSelect'

const shortMonthNames = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const currentDate = new Date()

export default function MonthSelector({
		selectedMonth,
		onChange,
		startDate
}) {
	const currentYear = currentDate.getFullYear()
	const currentMonth = currentDate.getMonth() // starts from 0
	let options = []
	const [startYear, startMonth] = startDate.split('-').map(Number);

	let month = startMonth - 1
	let year = startYear

	while (year < currentYear || (year === currentYear && month <= currentMonth)) {
		let option = `${shortMonthNames[month]} ${year}`
		options.push({ value: option, label: option })

		month++
		if (month > 11) {
			month = 0
			year++
		}
	}
	options = options.reverse()

	return (
		<WorkoutSelect
			selectedOption={selectedMonth}
			handleChange={onChange}
			options={options}
		/>
	)
}
