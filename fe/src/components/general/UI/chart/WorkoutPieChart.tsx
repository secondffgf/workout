import {
	PieChart,
	Pie,
	Tooltip
} from "recharts";
	
const COLORS = ["#74d4ff", "#00c951", "#ff6900", "#c30027"];

const roundNumber = (num: number) => Math.round(num * 100) / 100

const calculatePercentageTime = (time: number, intensive: string, aero: string, anaero: string) => {
  const totalSeconds = time * 60;
	const intensiveInSecords = calculateSeconds(intensive)
	const intensivePercentage = (intensiveInSecords / totalSeconds) * 100
	const aeroInSecords = calculateSeconds(aero)
	const aeroPercentage = (aeroInSecords / totalSeconds) * 100
	const anaeroInSecords = calculateSeconds(anaero)
	const anaeroPercentage = (anaeroInSecords / totalSeconds) * 100
	const light = 100 - intensivePercentage - aeroPercentage - anaeroPercentage

	return [
		{ name: "Light", value: roundNumber(light), fill: COLORS[0] }, 
		{ name: "Intensive", value: roundNumber(intensivePercentage), fill: COLORS[1] },
		{ name: "Aerobish", value: roundNumber(aeroPercentage), fill: COLORS[2] },
		{ name: "Anaerobish", value: roundNumber(anaeroPercentage), fill: COLORS[3] },
	]
}

const calculateSeconds = (timeStr: string) => {
	const [minStr, secStr] = timeStr.split(':')
	const timeInSeconds = parseInt(minStr, 10) * 60
		+ parseInt(secStr, 10)
	return timeInSeconds
}

interface DetailedWorkoutProps {
	workout: {
		date: string;
		puls: number;
		maxPuls: number;
		time: number;
		intensive: string;
		aero: string;
		anaero: string;
		trainingLoad: number;
		calories: number;
	} | null;
}

export default function WorkoutPieChart({ workout }: DetailedWorkoutProps) {
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
					startAngle={270}
					endAngle={-90}
					fill="#8884d8"
					innerRadius={50}
					outerRadius={80}
				/>
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
