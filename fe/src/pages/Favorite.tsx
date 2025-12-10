import { useState } from 'react'
import WorkoutContent from 'components/dashboard/WorkoutContent'
import WorkoutDetail from 'components/general/WorkoutDetail'
import DetailedWorkout from 'components/search/DetailedWorkout'
import useHttp from '@/hooks/useHttp'
import { BASE_URL_DEVELOPMENT } from '@/constants.js'

const requestConfig = {}

export default function Favorite() {
	const [leftWorkout, setLeftWorkout] = useState()
	const [rightWorkout, setRightWorkout] = useState()
	const {
		data: favorites,
		sendRequest
	} = useHttp(
		`${BASE_URL_DEVELOPMENT}/favorites`,
		requestConfig,
		[]
	)

	const selectWorkout = (workout, checked) => {
		if (checked) {
			setRightWorkout(workout)
		} else {
			setLeftWorkout(workout)
		}
	}

	const refreshFavorites = () => {
		sendRequest()
	}

	return (
		<WorkoutContent>
		  <div className="w-full mt-4">
				<WorkoutDetail
					workouts={favorites}
					heightClass="max-h-[30vh]" 
					showCheckbox
					selectWorkout={selectWorkout}
					refreshFavorites={refreshFavorites}
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
