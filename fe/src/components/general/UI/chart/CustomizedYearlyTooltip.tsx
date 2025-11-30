import WorkoutTooltipContent from 'components/general/WorkoutTooltipContent'

export default function CustomizedYearlyTooltip({ active, payload }) {
	if (active && payload && payload.length > 0) {
		const training = payload[0].payload
		const seconds = training.value
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		const time = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
		return (
		  <div className="border rounded border-gray-600">
				<div className="bg-gray-100 p-2 p-4">
					<p className="mb-2 text-sx">
						<span className="font-bold">Training Time:</span> {time} hours
					</p>
					<p className="mb-2 text-sx">
						<span className="font-bold">Calories:</span> {training.calories}
					</p>
					<p className="mb-2 text-sx">
						<span className="font-bold">Trainings:</span> {training.trainings}
					</p>
				</div>
			</div>
		)
	}
	return null
}
