export const fetchCalendarEvents = async (startDate: string, endDate: string) => {
 	const response = await fetch(
 		'/api/calendar_events',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ startDate, endDate })
		}
 	)
 	if (!response.ok) {
 		throw new Error('Failed to fetch calendar events')
 	}
 	return response.json()
}

export async function fetchFirstWorkoutDate() {
	const response = await fetch(
		'/api/first_workout_date',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)

	if (!response.ok) {
		throw new Error('Failed to fetch first workout date!')
	}

	return await response.json()
}

export async function fetchCurrentPeriod() {
	const response = await fetch(
		'/api/current_period',
	)

	if (!response.ok) {
		throw new Error('Failed to fetch current period data!')
	}

	return await response.json()
}