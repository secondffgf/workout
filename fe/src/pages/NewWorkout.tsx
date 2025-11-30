import { useRef, useState, useEffect, useContext } from 'react'
import { format } from 'date-fns'
import Input from 'components/general/UI/Input'
import SkyDatePicker from 'components/new_workout/SkyDatePicker'
import TimeInput from 'components/general/UI/TimeInput'
import Button from 'components/general/UI/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { addWorkout } from '@/utils/http.js'
import WorkoutInfo from 'components/new_workout/WorkoutInfo'
import WorkoutContent from 'components/dashboard/WorkoutContent'
import { CurrentPeriodContext } from '@/context/CurrentPeriodContextProvider'
import { CalendarContext } from '@/context/CalendarContextProvider'
import {
	getFirstDayAndLastDayOfMonth,
	formatDate
} from  '@/utils/utils.js'
import { fetchWorkoutTemplate } from '@/utils/http.js'
import useHttp from '@/hooks/useHttp'
import Error  from 'components/general/UI/Error'
import WorkoutExercises from 'components/new_workout/WorkoutExercises'

const requestConfig = {}

const buildExercises = (exercisesArray) => {
	const temp = {}
	for (const [key, value] of exercisesArray) {
		const match = key.match(/_(\d+)$/)
		if (!match) continue
		const idx = match[1]

		if (!temp[idx]) temp[idx] = {}

		if (key.startsWith('ex_name_')) {
			temp[idx].exercise = value
		} else if (key.startsWith('ex_weight_')) {
			temp[idx].weight = Number(value)
		}
		temp[idx].order = idx
	}
	const result = []
	for (const idx in temp) {
		result.push(temp[idx])
	}
	return result
}

export default function NewWorkout() {
	const { state: currentWeekState, fetchCurrentPeriodWorkouts } = useContext(CurrentPeriodContext)
	const { state: calendarState, fetchEvents: fetchCalendarEvents } = useContext(CalendarContext)
	const navigate = useNavigate()
	const [workoutDate, setWorkoutDate] = useState(new Date())
	const [templateDate, setTemplateDate] = useState()
	const [template, setTemplate] = useState({ isTemplateError: false })
	const rounds = useRef()
	const comment = useRef()

	const handleAddWorkout = async (payload) => {
		addWorkout(payload)
			.then((data) => {
				let dateRange = getFirstDayAndLastDayOfMonth()
				fetchCurrentPeriodWorkouts()
				fetchCalendarEvents(dateRange.start, dateRange.end)
				navigate('/month')
			})
	}

	const handleCancelWorkout = () => {
		navigate('/month')
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		const fd = new FormData(event.target)
		const data = Object.fromEntries(fd.entries())
		data.date = format(workoutDate, 'yyyy-MM-dd')

		const entries = Object.entries(data);
		const exerciseEntries = entries.filter(([key]) => key.startsWith("ex_"));
		const workoutEntries = entries.filter(([key]) => !key.startsWith("ex_"));

		const workout = Object.fromEntries(workoutEntries)
		workout.exercises = buildExercises(exerciseEntries)
		console.log(workout)
		handleAddWorkout(workout)
	}

	const changeTemplateHandler = (templateNewDate) => {
		const templateDateFormatted = format(templateNewDate, 'yyyy-MM-dd')
		setTemplateDate(templateNewDate)
		fetchWorkoutTemplate(templateDateFormatted)
			.then(data => {
				setTemplate({ isTemplateError: false, templateWorkout: data })
				rounds.current.value = data.rounds
				comment.current.value = data.comment
			})
			.catch(err => setTemplate({ isTemplateError: true, message: err.message }))
	}

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
			e.preventDefault()
		}
	}

	return (
		<>
			<WorkoutContent>
				{ template.isTemplateError && (
					<div className="w-3/4 mx-4  bg-yellow-400 text-gray-600 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-out-translate-y-2 opcity-95">
						{template.message ? template.message : 'Template is not found!'}
					</div>
				)}
				<form
					onSubmit={handleSubmit}
					onKeyDown={handleKeyDown}
					className="w-[90%]"
				>
					<div>
						<div className="flex justify-between">
							<div className="flex gap-12">
								<SkyDatePicker
									id="workoutDate"
									selectedDate={workoutDate}
									setSelectedDate={setWorkoutDate}
								/>
								<SkyDatePicker
									id="template"
									selectedDate={templateDate}
									setSelectedDate={changeTemplateHandler}
									label="Pick a Template"
								/>
								</div>
							<menu className="flex items-center justify-end gap-4 my-4 w-1/2 mr-6">
								<li>
									<button
										className="text-stone-800 hover:text-stone-950 cursor-pointer"
										onClick={handleCancelWorkout}
									>
										Cancel
									</button>
								</li>
								<li>
									<Button
										type="submit"
									>
										Save
									</Button>
								</li>
							</menu>
						</div>
						<WorkoutInfo />
						<hr />
						<WorkoutExercises
							templateWorkout={template?.templateWorkout}
						/>
						<hr />
						<Input
						  ref={rounds}
							label="Number of Rounds"
							name="rounds"
							required
						/>
						<Input
						  ref={comment}
							label="General Comment"
							textarea
							name="comment"
							maxLength={500}
						/>
					</div>
				</form>
			</WorkoutContent>
		</>
	)
}
