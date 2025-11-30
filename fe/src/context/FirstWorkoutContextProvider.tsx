import { createContext, useCallback, useEffect, useReducer } from 'react'
import { fetchFirstWorkoutDate } from '@/utils/http.js'

const now = new Date();
const formatDate = (date) => date.toISOString().split('T')[0]

const initialState = {
	firstWorkout: formatDate(now),
	error: null
}

function reducer(state, action) {
	switch (action.type) {
		case 'FETCH_FIRST_WORKOUT_START':
			return {
				...state,
				error: null
			}
		case 'FETCH_FIRST_WORKOUT_SUCCESS':
			return {
				firstWorkout: action.payload.firstDate,
				error: null
			}
		case 'FETCH_FIRST_WORKOUT_FAILURE':
			return {
				...state,
				error: action.payload
			}
		default:
			return state
	}
}

export const FirstWorkoutContext = createContext()

export function FirstWorkoutContextProvider({children}) {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		dispatch({ type: 'FETCH_FIRST_WORKOUT_START' })

		fetchFirstWorkoutDate()
		.catch(error => dispatch({
			type: 'FETCH_FIRST_WORKOUT_FAILURE',
			payload: error.message
		}))
		.then(result => dispatch({
			type: 'FETCH_FIRST_WORKOUT_SUCCESS',
			payload: result
		}))
	}, [])
	
	return (
		<FirstWorkoutContext value={{state}}>
			{children}
		</FirstWorkoutContext>
	)
}
