import { createContext, useCallback, useReducer } from 'react'
import { fetchCalendarEvents } from '@/utils/http'
import type { PropsWithChildren } from 'react';

type CalendarState = {
	startDate: string;
	endDate: string;
	events: any[];
	calendarError: string | null;
};

const initialState: CalendarState = {
	startDate: '',
	endDate: '',
	events: [],
	calendarError: null
};

function reducer(
	state: CalendarState,
	action: { type: string; payload?: any; startDate?: string; endDate?: string }
): CalendarState {
	switch (action.type) {
		case 'FETCH_START':
			return {
				...state,
				calendarError: null,
				startDate: action.startDate || '',
				endDate: action.endDate || ''
			};
		case 'FETCH_SUCCESS':
			return { ...state, events: action.payload };
		case 'FETCH_FAILURE':
			return { ...state, calendarError: action.payload };
		default:
			return state;
	}
}

export const CalendarContext = createContext<{
	state: CalendarState;
	fetchEvents: (startDate: string, endDate: string) => Promise<void>;
} | undefined>(undefined);

export function CalendarContextProvider({children}: PropsWithChildren<{}>) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const fetchEvents = useCallback(async (startDate: string, endDate: string) => {
		const inputDate = new Date(startDate);
		const today = new Date();

		if (state.startDate === startDate && state.endDate === endDate ||
				inputDate > today ) {
			return
		}
		dispatch({ type: 'FETCH_START', startDate, endDate })

		fetchCalendarEvents(startDate, endDate)
		.catch((error: { message: any; }) => dispatch({
			type: 'FETCH_FAILURE',
			payload: (error.message || 'Failed to fetch calendar events!')
		}))
		.then((result: any) => dispatch({
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
