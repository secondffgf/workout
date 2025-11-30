import { useContext } from 'react'
import { CurrentPeriodContext } from '@/context/CurrentPeriodContextProvider'
import { SlBadge } from "react-icons/sl";

const greenShades = [
	'bg-yellow-200',
	'bg-yellow-300',
	'bg-yellow-400',
	'bg-yellow-500',
	'bg-yellow-600',
	'bg-green-400',
	'bg-green-500',
	'bg-green-600',
	'bg-green-700',
	'bg-green-800',
	'bg-green-900',
];

const caloriesGoal = 1950

function colorShade(num, min, max) {
	let colors = greenShades

	if (num === 'undefined' || num == null) return colors[0]

	if (num <= min) return colors[0]
	if (num >= max) return colors[colors.length - 1]

	const ratio = (num - min) / (max - min)
	const index = Math.floor(ratio * (colors.length - 1))
	return colors[index]
}

export default function Badge({ ...props }) {
	const { state } = useContext(CurrentPeriodContext)

	let classes = 'w-10 h-10 text-white p-2 rounded '
  const calories = state?.statistics?.calories ?? 0
	classes += colorShade(calories, 200, caloriesGoal)
  const percentage = Math.round(calories / caloriesGoal * 100)
	return (
		<div {...props} title={`${percentage}% achieved this week`}>
			<SlBadge
				className={classes}
			/>
		</div>
	)
}
