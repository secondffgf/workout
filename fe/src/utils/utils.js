export function formatMonthlyChartData(payload) {
	const shortLabel = payload.length > 12
	let chartData = payload.map(workout => {
		let exercises = []
		if (workout.exercises && workout.exercises.length > 0) {
			exercises = [...(workout.exercises || [])].sort((a, b) => a.order - b.order)
		}
		return ({
			id: workout.id,
			date: workout.date,
			label: shortLabel ? workout.xaxisLabel.substring(0, 2) : workout.xaxisLabel,
			value: workout.time,
			time: workout.time,
			exercises: exercises,
			rounds: workout.rounds,
			comment: workout.comment
		})
	})

	chartData.sort((a, b) => new Date(a.date) - new Date(b.date))
	return chartData
}

export function formatYearlyChartData(payload) {
	let chartData = payload.map(workout => {
		return ({
			date: workout.date,
			label: workout.xaxisLabel,
			value: workout.time,
			calories: workout.calories,
			trainings: workout.trainings,
		})
	})

	chartData.sort((a, b) => new Date(a.date) - new Date(b.date))
	return chartData
}

export function getFirstDayAndLastDayOfMonth() {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth(); // 0-indexed: 0 = January

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	
	const diffToMonday = (firstDay.getDay() + 6) % 7;
	const diffToSunday = (7 - lastDay.getDay()) % 7;

	const monday = new Date(firstDay);
	monday.setDate(firstDay.getDate() - diffToMonday);
	
	const sunday = new Date(lastDay);
  sunday.setDate(lastDay.getDate() + diffToSunday);

	return {start: formatDate(monday), end: formatDate(sunday)}
}

export function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	
	return `${year}-${month}-${day}`
}
