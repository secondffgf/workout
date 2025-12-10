import { useContext, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Error from 'components/general/UI/Error'
import { CalendarContext } from '@/context/CalendarContextProvider'
import { FirstWorkoutContext } from '@/context/FirstWorkoutContextProvider'
import {
	BsFlagFill
} from "react-icons/bs";
import useHttp from '@/hooks/useHttp'
import { BASE_URL_DEVELOPMENT } from '@/constants.js'

const requestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	}
}

export default function WorkoutCalendar() {
	const { state: calendarState, fetchEvents } = useContext(CalendarContext)
	const { state: firstWorkoutState } = useContext(FirstWorkoutContext)
	const {
		data: flaggedDays,
		sendRequest: sendFlaggedDayRequest
	} = useHttp(
		`${BASE_URL_DEVELOPMENT}/add_flagged`,
		requestConfig,
		[]
	)

	const dayClickHandler = (date: string) => {
		sendFlaggedDayRequest(date)
	}

	function renderDayCell(arg) {
		const dateStr = arg.date.toISOString().split('T')[0]
		if (flaggedDays.includes(dateStr)) {
			return (
				<div>
					<div
						className="flex items-center cursor-pointer"
						onClick={() => dayClickHandler(dateStr)}
					>
						<span className="text-red-500 mr-2">
							<BsFlagFill />
						</span>
						<span>
							{arg.dayNumberText}	
						</span>
					</div>
				</div>
			)
		}
		return (
			<div
				className="flex items-center cursor-pointer group"
				onClick={() => dayClickHandler(dateStr)}
			>
				<span className={`text-yellow-500 mr-2 ${flaggedDays[dateStr] ? '' : 'hidden group-hover:inline'}`}>
					<BsFlagFill />
				</span>
				<span>
					{arg.dayNumberText}	
				</span>
			</div>
		)
	}

	useEffect(() => {
		sendFlaggedDayRequest()
	}, [])

	const { startDate: startCalendarDate, endDate: endCalendarDate, events, calendarError } = calendarState
	const handleDataSet = (arg) => {
		let startDateArg = arg.startStr.split('T')[0]
		let endDateArg = arg.endStr.split('T')[0]
		if (startCalendarDate === startDateArg && endCalendarDate === endDateArg) {
			return
		}
		fetchEvents(startDateArg, endDateArg)
	}

  	if (calendarError) {
		return <Error title="An error occured!" message={calendarError} />
	}

	const calendarData = events.map(event => ({
		title: `${event.trainingLoad} - ${event.calories}`,
		date: event.date,
		description: `training load: ${event.trainingLoad}\ncalories: ${event.calories}`
	}))

	return (
		<div className="flex-none h-[32rem] w-[32rem] mt-6">
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				height="100%"
				firstDay={1}
				events={calendarData}
				dayCellContent={renderDayCell}
				eventColor="#74d4ff"
				validRange={{
					start: firstWorkoutState.firstWorkout
				}}
				eventDidMount={(info) => {
					info.el.setAttribute('title', info.event.extendedProps.description);
				}}
				datesSet={handleDataSet}
			/>
		</div>
	)
}
