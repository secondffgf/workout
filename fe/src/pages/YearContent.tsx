import { useEffect, useState, useContext } from 'react'
import YearSelector from 'components/dashboard/YearSelector'
import Statistics from 'components/dashboard/Statistics'
import WorkoutBarChart from 'components/general/UI/chart/WorkoutBarChart'
import {
	formatYearlyChartData
} from '@/utils/utils.js'
import WorkoutContent from 'components/dashboard/WorkoutContent'
import { FirstWorkoutContext } from '@/context/FirstWorkoutContextProvider'
import useHttp from '@/hooks/useHttp'
import { BASE_URL_DEVELOPMENT } from '@/constants.js'

const now = new Date();
const year = now.getFullYear();
const defaultOption = { value: `${year}`, label: `${year}` }

function minutesToHHMM(totalMinutes) {
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

const requestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
}

const defaultWorkouts = {
	statistics: {
		exerciseTime: '00:00',
		calories: 0
	},
	totalElements: 0,
	content: []
}

export default function YearContent() {
	const { state: firstWorkoutState } = useContext(FirstWorkoutContext)
	const [selectedYear, setSelectedYear] = useState(defaultOption)
	const [selectedBar, setSelectedBar] = useState(null)
	const {
		data: workouts,
		isLoading,
		error: workoutsError,
		sendRequest
	} = useHttp(
		`${BASE_URL_DEVELOPMENT}/workouts`,
		requestConfig,
		defaultWorkouts		
	)

	const year = firstWorkoutState.firstWorkout.slice(0, 4);
	const domain = [0, 720]
	const ticks = [0, 90, 180, 270, 360, 450, 540, 630, 720]
	const caloriesDomain = [0, 8000]
	const caloriesTicks = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]

	useEffect(() => {
		sendRequest(
			JSON.stringify({
				timePeriod: 'YEAR',
				startOfPeriod: selectedYear.value
			})
		)
	}, [selectedYear])

	if (workoutsError) {
		return <Error title="Failed to fetch workouts" message={workoutsError} />
	}

  const chartData = formatYearlyChartData(workouts.content)

	return (
	  <WorkoutContent>
			<div className="w-1/2">
				<YearSelector
					selectedYear={selectedYear}
					onChange={setSelectedYear}
					startYear={year}
				/>
			</div>
			<Statistics
				statistics={workouts.statistics}
				totalElements={workouts.totalElements}
			/>
			<div className="w-full mt-2">
				<WorkoutBarChart
					payload={chartData}
					onBarClick={setSelectedBar}
					domain={domain}
					ticks={ticks}
					isYear
					tickFormatter={(value) => minutesToHHMM(value)}
				/>
			</div>
			<div className="w-full mt-8">
				<WorkoutBarChart
					payload={chartData}
					onBarClick={setSelectedBar}
					isYear
					legendFormatter={(value) => 'Calories'}
					fillColor="#f54a00"
					domain={caloriesDomain}
					ticks={caloriesTicks}
					dataKey="calories"
				/>
			</div>
		</WorkoutContent>
	)
}
