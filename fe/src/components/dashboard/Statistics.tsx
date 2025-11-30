export default function Statistics({statistics, totalElements}) {
	return (
		<div className="w-3/4 mt-6 flex items-start justify-between font-semibold text-lg px-4">
			<div>
				{statistics.exerciseTime}
			</div>
			<div>
				{statistics.calories} ccal
			</div>
			<div>
				{totalElements} trainings
			</div>
		</div>
	)
}
