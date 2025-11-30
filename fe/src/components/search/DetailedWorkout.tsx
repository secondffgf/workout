import {
	PieChart,
	Pie,
	Cell,
	Tooltip
} from "recharts";

const COLORS = ["#74d4ff", "#00c951", "#ff6900", "#c30027"];

const roundNumber = (num) => Math.round(num * 100) / 100

const calculatePercentageTime = (time, intensive, aero, anaero) => {
  const totalSeconds = time * 60;
	const intensiveInSecords = calculateSeconds(intensive)
	const intensivePercentage = (intensiveInSecords / totalSeconds) * 100
	const aeroInSecords = calculateSeconds(aero)
	const aeroPercentage = (aeroInSecords / totalSeconds) * 100
	const anaeroInSecords = calculateSeconds(anaero)
	const anaeroPercentage = (anaeroInSecords / totalSeconds) * 100
	const light = 100 - intensivePercentage - aeroPercentage - anaeroPercentage

	return [
		{ name: "Light", value: roundNumber(light) }, 
		{ name: "Intensive", value: roundNumber(intensivePercentage) },
		{ name: "Aerobish", value: roundNumber(aeroPercentage) },
		{ name: "Anaerobish", value: roundNumber(anaeroPercentage) },
	]
}

const calculateSeconds = (timeStr) => {
	const [minStr, secStr] = timeStr.split(':')
	const timeInSeconds = parseInt(minStr, 10) * 60
		+ parseInt(secStr, 10)
	return timeInSeconds
}

export default function DetailedWorkout({workout}) {
	if (!workout) {
		return (<div>
			Select Workout...
		</div>)
	}

	const data = calculatePercentageTime(
		workout.time,
		workout.intensive,
		workout.aero,
		workout.anaero
	)

	return (
		<div className="w-full flex flex-col justify-center items-center">
		  <div className="mt-4 flex justify-center text-gray-800 font-bold">
				<span>Workout Date: {workout.date}</span>
			</div>
		  <div className="mt-4 flex justify-between text-gray-600 font-bold w-full px-6">
				<span>Puls: {workout.puls}</span>
				<span>Max Puls: {workout.maxPuls}</span>
			</div>
			<PieChart width={200} height={200}>
				<Pie
					data={data}
					dataKey="value"
					cx="50%" cy="50%"
					outerRadius={100}
					startAngle={270}
					endAngle={-90}
					fill="#8884d8"
					innerRadius={50}
					outerRadius={80}
				>
					{data.map((entry, index) => (
						<Cell key={index} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		  <div className="mb-4 flex justify-between text-gray-600 font-bold w-full px-6">
				<span>Training Load: {workout.trainingLoad}</span>
				<span>Calories: {workout.calories}</span>
			</div>
		  <div className="mb-4 flex justify-center text-gray-800 font-bold">
				<span>Time: {workout.time}</span>
			</div>
		</div>
	)
}
