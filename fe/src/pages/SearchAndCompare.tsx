import { useEffect, useState, useRef } from 'react'
import { searchEvents  } from '@/utils/http.js'
import WorkoutDetail from 'components/general/WorkoutDetail'
import DetailedWorkout from 'components/search/DetailedWorkout'
import WorkoutContent from 'components/dashboard/WorkoutContent'
import SearchFilters from 'components/search/SearchFilters'

export default function SearchAndCompare() {
	const [exercise, setExercise] = useState(null)
	const [workouts, setWorkouts] = useState([])
	const [leftWorkout, setLeftWorkout] = useState()
	const [rightWorkout, setRightWorkout] = useState()
	const [refreshKey, setRefreshKey] = useState(0)
	const weight = useRef()
	const calories = useRef()

	useEffect(() => {
		search()
	}, [])

	const search = () => {
		searchEvents((exercise?.value ?? null), weight.current?.value, calories.current?.value)
			.catch(error => setError({ message: error.message || 'Failed to search workouts!' }))
			.then(setWorkouts)
		setLeftWorkout(null)
		setRightWorkout(null)
		setRefreshKey(prev => prev + 1)
	}

	const selectWorkout = (workout, checked) => {
		if (checked) {
			setRightWorkout(workout)
		} else {
			setLeftWorkout(workout)
		}
	}

	return (
	  <WorkoutContent>
			<SearchFilters
				exercise={exercise}
				setExercise={setExercise}
				weight={weight}
				search={search}
				calories={calories}
			/>
		  <hr className="border-gray-300 mt-4" />
			<div className="w-full mt-4">
				<WorkoutDetail
					key={refreshKey}
					workouts={workouts}
					heightClass="max-h-[30vh]" 
					showCheckbox
					selectWorkout={selectWorkout}
				/>
			</div>
			<div className="w-full flex mt-8">
				<div className="flex-1 flex items-center justify-center bg-blue-100">
					<DetailedWorkout
						workout={leftWorkout}
					/>
				</div>
				<div className="w-px bg-gray-400"></div>
				<div className="flex-1 flex items-center justify-center bg-green-100">
					<DetailedWorkout
						workout={rightWorkout}
					/>
				</div>
			</div>
		</WorkoutContent>
	)
}
