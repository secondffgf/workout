import WorkoutSelect from 'components/general/UI/WorkoutSelect'
import Button from 'components/general/UI/Button'
import useHttp from '@/hooks/useHttp'

const requestConfig = {}

export default function SearchFilters({ exercise, setExercise, weight, search, calories }) {
	const {
		data: exerciseNames,
		error: namesError
	} = useHttp(
		'http://localhost/api/exercises?id_value=true',
		requestConfig,
		[]
	)

	if (namesError) {
		return <Error title="Failed to fetch exercise names" message={namesError} />
	}

	return (
			<div className="w-full flex justify-between">
				<div className="w-1/3 mx-6">
					<span className="pl-2">Select Exercise:</span>
					<WorkoutSelect
						options={exerciseNames}
						selectedOption={exercise}
						handleChange={setExercise}
					/>
				</div>
				<div className="w-[5rem]">
					<span className="pl-2">Weight:</span>
					<input
						name="weight"
						type="number"
						autoComplete="off"
						className="border rounded pt-1 px-2 border-gray-300 pb-2 focus:border-blue-500 focus:border-2 outline-none w-full"
						ref={weight}
					/>
				</div>
				<div className="w-[5rem]">
					<span className="pl-2">Calories:</span>
					<input
						type="number"
						name="calories"
						autoComplete="off"
						className="border rounded pt-1 px-2 border-gray-300 pb-2 focus:border-blue-500 focus:border-2 outline-none w-full"
						ref={calories}
					/>
				</div>
				<div className="flex items-end">
					<Button
						onClick={search}
					>
						Search
					</Button>
				</div>
			</div>
	)
}
