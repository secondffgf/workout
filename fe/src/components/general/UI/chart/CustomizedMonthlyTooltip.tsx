import WorkoutTooltipContent from '@/components/general/WorkoutTooltipContent'

interface CustomizedMonthlyTooltipProps {
	active?: boolean;
	payload?: any[];
}

export default function CustomizedMonthlyTooltip({ active, payload }: CustomizedMonthlyTooltipProps) {
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
