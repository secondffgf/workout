import { createContext, useCallback, useEffect, useReducer } from 'react'
import { fetchCalendarEvents } from '@/utils/http.js'

const initialState = {
	startDate: '',
	endDate: '',
  events: [],
	calendarError: null
}

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_START':
			return {
				...state,
				calendarError: null,
				startDate: action.startDate,
				endDate: action.endDate
			}
		case 'FETCH_SUCCESS':
 			return { ...state, events: action.payload }
		case 'FETCH_FAILURE':
			return { ...state, calendarError: action.payload }
		default:
			return state
	}
}

export const CalendarContext = createContext()

export function CalendarContextProvider({children}) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const fetchEvents = useCallback(async (startDate, endDate) => {
		const inputDate = new Date(startDate);  
		const today = new Date();
		if (state.startDate === startDate && state.endDate === endDate ||
				inputDate > today ) {
			return
		}
		dispatch({ type: 'FETCH_START', startDate, endDate })
		
		fetchCalendarEvents(startDate, endDate)
			.catch(error => dispatch({
				type: 'FETCH_FAILURE',
				payload: (error.message || 'Failed to fetch calendar events!')
			}))
			.then(result => dispatch({
					type: 'FETCH_SUCCESS',
					payload: result
			}))
	}, [])

	return (
		<CalendarContext value={{state, fetchEvents}}>
			{children}
		</CalendarContext>
	)	
}
