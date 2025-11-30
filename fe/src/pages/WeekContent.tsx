import { useEffect, useState, useContext } from 'react'
import WorkoutBarChart from 'components/general/UI/chart/WorkoutBarChart'
import WeekSelector from 'components/dashboard/WeekSelector'
import WorkoutDetail from 'components/general/WorkoutDetail'
import SelectedWorkout from 'components/dashboard/SelectedWorkout'
import Statistics from 'components/dashboard/Statistics'
import {
	formatMonthlyChartData,
} from '@/utils/utils.js'
import WorkoutContent from 'components/dashboard/WorkoutContent'
import { FirstWorkoutContext } from '@/context/FirstWorkoutContextProvider'
import useHttp from '@/hooks/useHttp'
import { BASE_URL_DEVELOPMENT } from '@/constants.js'

function formatDate(date) {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	return `${day}.${month}`;
}

function getCurrentWeekRange() {
	const now = new Date();

	// Get Monday of the current week
	const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
	const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // if Sunday, go back 6 days
	const monday = new Date(now);
	monday.setDate(now.getDate() + diffToMonday);

	// Sunday = Monday + 6 days
	const sunday = new Date(monday);
	sunday.setDate(monday.getDate() + 6);

	return `${formatDate(monday)} - ${formatDate(sunday)}`;
}

function formatCurrentDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

const result = getCurrentWeekRange();
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

export default function WeekContent() {
	const { state: firstWorkoutState } = useContext(FirstWorkoutContext)
	const [selectedBar, setSelectedBar] = useState(null)
	const [selectedWeek, setSelectedWeek] = useState(defaultOption)
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

	useEffect(() => {
		sendRequest(
			JSON.stringify({
				timePeriod: 'WEEK',
				startOfPeriod: selectedWeek.value
			})
		)
	}, [selectedWeek])

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

	if (workoutsError) {
		return <Error title="Failed to fetch workouts" message={workoutsError} />
	}

	const chartData = formatMonthlyChartData(workouts.content)

	return (
	  <WorkoutContent>
			<div className="w-1/2">
				<WeekSelector
					startDate={firstWorkoutState.firstWorkout}
					selectedWeek={selectedWeek}
					onSelect={setSelectedWeek}
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
					heightClass="3xl:h-[50vh] md:h-[35vh]" 
				/>
			</div>
		</WorkoutContent>
	)
}
