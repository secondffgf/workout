import { useContext } from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts'
import { type CurrentPeriodState, CurrentPeriodContext } from '@/context/CurrentPeriodContextProvider'

const estimates = [642, 481, 385, 321, 275]

function darkenHexColor(hex: string, factor = 0.35) {
// Remove the leading '#' if present
	hex = hex.replace(/^#/, '');

// Parse r, g, b values
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);
	
// Apply the factor to darken
	r = Math.floor(r * factor);
	g = Math.floor(g * factor);
	b = Math.floor(b * factor);
	
// Make sure values stay within 0-255
	r = Math.max(0, Math.min(255, r));
	g = Math.max(0, Math.min(255, g));
	b = Math.max(0, Math.min(255, b));
	
// Convert back to hex
	const newHex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b)
		.toString(16)
		.slice(1);
	
	return newHex;
}

const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any[]; label: string }) => {
	if (active && payload && payload.length) {
    const ordered = [...payload].sort((a, b) => {
      const order = ["goal", "actual"];
      return order.indexOf(a.dataKey) - order.indexOf(b.dataKey);
    });

		return (
			<div className="bg-white border rounded p-2 shadow">
				<p className="font-semibold">{label}</p>
				{ordered.map((entry, index) => (
					<p key={`item-${index}`} style={{ color: entry.color }} className="mt-1">
						{entry.name}: {entry.value}
					</p>
				))}
			</div>
		)
	}	
	return null
}

const CaloriesEstimateChart = () => {
  const { state }: { state: CurrentPeriodState } = useContext(CurrentPeriodContext);

  const chartData = [...Array(5)].map((_, i) => {
		const workoutsPerWeek = i + 3
		let averageCaloriesPerWorkout = 0
		let averageCaloriesPerWorkoutPrevWeek = 0
		if (state.currentWeek?.length > 0)  {
			const workoutsSlice = state.currentWeek
				.slice(0, workoutsPerWeek)
			const caloriesSum = workoutsSlice
				.map((w: { calories: number }) => w.calories)
				.reduce((a, b) => a + b, 0)
			averageCaloriesPerWorkout = Math.round(caloriesSum / workoutsPerWeek)
		}
		if (state.prevWeek?.length > 0)  {
			const workoutsSlicePrevWeek = state.prevWeek
				.slice(0, workoutsPerWeek)
			const caloriesSumPrevWeek = workoutsSlicePrevWeek
				.map((wPrev: { calories: number }) => wPrev.calories)
				.reduce((aPrev, bPrev) => aPrev + bPrev, 0)
			averageCaloriesPerWorkoutPrevWeek = Math.round(caloriesSumPrevWeek / workoutsPerWeek)
		}
		const item = {
			name: `${workoutsPerWeek}`,
			goal: estimates[i],
			actual: averageCaloriesPerWorkout,
			previous: averageCaloriesPerWorkoutPrevWeek
		}
		return item
	});

	const highlightIndex = state.currentWeek?.length

  function renderCustomDot(props: { cx: number; cy: number; index: number; fill: string; r: number; stroke: string; key: string; payload: { name: number } }) {
		const { cx, cy, index } = props
		let fill = props.fill
		let r = props.r
		if (props.payload.name == highlightIndex) {
			fill = darkenHexColor(fill)
			r = r + 1
		}
		return (
			<circle cx={cx} cy={cy} r={r} fill={fill} stroke={props.stroke} key={props.key} />
		)
	}

  return (
    <div className="mt-4 relative pb-2 w-[30rem]">
			<div className="absolute left-0 text-sm text-gray-600">
				Kcal per session
			</div>
			<ResponsiveContainer width="100%" height={240}>
				<LineChart
					data={chartData}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis
						domain={[0, 800]}
						ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800]}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend
						layout="horizontal"
						verticalAlign="top"
						align="center"
					/>
					<Line
						type="monotone"
						dataKey="goal"
						stroke="#C8008C"
						activeDot={{ r: 5 }}
						dot={renderCustomDot}
					/>
					<Line
						type="monotone"
						dataKey="actual"
						stroke="#82ca9d"
						activeDot={{ r: 5 }}
						dot={renderCustomDot}
					/>
					<Line
						type="monotone"
						dataKey="previous"
						stroke="#8884d8"
						activeDot={{ r: 5 }}
						dot={renderCustomDot}
					/>
				</LineChart>
			</ResponsiveContainer>
			<div className="absolute bottom-6 right-1 text-sm text-gray-600">
				Workouts per week
			</div>
			<div className="text-sm text-gray-600 text-center font-bold mt-2">
				Calories for current week
			</div>
		</div>
  );
};

export default CaloriesEstimateChart;