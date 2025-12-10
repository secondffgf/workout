import useHttp from '@/hooks/useHttp'
import { BASE_URL_DEVELOPMENT } from '@/constants.js'
import WorkoutContent from '../components/dashboard/WorkoutContent'
import WorkoutDetail from '../components/general/WorkoutDetail'

const requestConfig = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
}

export default function Flagged() {
    const {
        data: flaggedDays
    } = useHttp(
        `${BASE_URL_DEVELOPMENT}/flagged`,
        requestConfig,
        []
    )

    const selectWorkout = (workout, checked) => {
    }

    return (
		<WorkoutContent>
		  <div className="w-full mt-4">
				<WorkoutDetail
					workouts={flaggedDays}
					heightClass="max-h-[30vh]" 
					showCheckbox
					selectWorkout={selectWorkout}
				/>
			</div>
		</WorkoutContent>
    )
}