import WorkoutTooltipContent from 'components/general/WorkoutTooltipContent'

export default function CustomizedMonthlyTooltip({ active, payload }) {
	if (active && payload && payload.length > 0) {
		const training = payload[0].payload
		return (
		  <div className="border rounded border-gray-600">
			<WorkoutTooltipContent
				item={training}
			/>
			</div>
		)
	}
	return null
}
