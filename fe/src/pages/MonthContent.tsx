import { useEffect, useState, useContext } from 'react'
import MonthSelector from 'components/dashboard/MonthSelector'
import WorkoutBarChart from 'components/general/UI/chart/WorkoutBarChart'
import SelectedWorkout from 'components/dashboard/SelectedWorkout'
import Statistics from 'components/dashboard/Statistics'
import WorkoutDetail from 'components/general/WorkoutDetail'
import {
	formatMonthlyChartData,
} from '@/utils/utils.js'
import WorkoutContent from 'components/dashboard/WorkoutContent'
import { FirstWorkoutContext } from '@/context/FirstWorkoutContextProvider'
import useHttp from '@/hooks/useHttp'
import { BASE_URL_DEVELOPMENT } from '@/constants.js'

const now = new Date();
const monthShort = now.toLocaleString('en-US', { month: 'short' });
const year = now.getFullYear();
const result = `${monthShort} ${year}`;
const defaultOption = { value: result, label: result }

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

export default function MonthContent() {
	const { state: firstWorkoutState } = useContext(FirstWorkoutContext)
	const [selectedMonth, setSelectedMonth] = useState(defaultOption)
	const [selectedBar, setSelectedBar] = useState(null)
	const {
		data: workouts,
		error: workoutsError,
		sendRequest
	} = useHttp(
		`${BASE_URL_DEVELOPMENT}/workouts`,
		requestConfig,
		defaultWorkouts		
	)

	useEffect(() => {
		sendRequest(
			JSON.stringify({
				timePeriod: 'MONTH',
				startOfPeriod: selectedMonth.value
			})
		)
	}, [selectedMonth])

	const cancelWorkout = () => {
		setSelectedBar(null)
	}

	let workout = null
	if (selectedBar) {
		console.log(selectedBar)
	  workout = <SelectedWorkout
			data={selectedBar}
			onClose={cancelWorkout}
		/>
	}

	const chartData = formatMonthlyChartData(workouts.content)

	if (workoutsError) {
		return <Error title="Failed to fetch workouts" message={workoutsError} />
	}

	return (
	  <WorkoutContent>
			<div className="w-1/2">
				<MonthSelector
					selectedMonth={selectedMonth}
					onChange={setSelectedMonth}
					startDate={firstWorkoutState.firstWorkout}
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
				/>
			</div>
			<div className="w-full mt-4">
				<WorkoutDetail
					workouts={workouts.content}
					selectWorkout={setSelectedBar}
					heightClass="3xl:h-[50vh] lg:h-[35vh]" 
				/>
			</div>
		</WorkoutContent>
	)
}
