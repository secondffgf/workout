import { createContext, useCallback, useEffect, useReducer } from 'react'
import { fetchCurrentPeriod } from '@/utils/http.js'

const initialState = {
	prevWeek: [],
	currentWeek: [],
	statistics: {
		calories: 0
	},
	monthCalories: 0,
	error: null
}

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_CURRENT_WEEK_START':
			return {
				...state,
				error: null
			}
		case 'FETCH_CURRENT_WEEK_SUCCESS':
			return {
				...state,
				...action
			}
		case 'FETCH_CURRENT_WEEK_FAILURE':
			return {
				...state,
				error: action.payload
			}
		default:
			return state
	}
}

export const CurrentPeriodContext = createContext()

export function CurrentPeriodContextProvider({children}) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const fetchCurrentPeriodWorkouts = useCallback(() => {
		dispatch({
			type: 'FETCH_CURRENT_WEEK_START'
		})
		fetchCurrentPeriod()
		  .catch(error => dispatch({
				 type: 'FETCH_CURRENT_WEEK_FAILURE',
				 payload: error.message || 'Failed to fetch current week!'
			}))
			.then(result => dispatch({
				type: 'FETCH_CURRENT_WEEK_SUCCESS',
				...result
			}))
	}, [])

	useEffect(() => {
		fetchCurrentPeriodWorkouts()
	}, [])

	return (
		<CurrentPeriodContext value={{state, fetchCurrentPeriodWorkouts}}>
			{children}
		</CurrentPeriodContext>
	)
}
