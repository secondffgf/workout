import { BASE_URL_DEVELOPMENT } from '@/constants.js'

export async function fetchCalendarEvents(startDate, endDate) {
	const response = await fetch(
		`${BASE_URL_DEVELOPMENT}/calendar_events`,
		{
			method: 'POST',
			body: JSON.stringify({ startDate, endDate }),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)

	if (!response.ok) {
		throw new Error('Failed to fetch calendar events!')
	}

	return await response.json()
}

export async function fetchFirstWorkoutDate() {
	const response = await fetch(
		`${BASE_URL_DEVELOPMENT}/first_workout_date`,
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

export async function fetchExerciseNames() {
	const response = await fetch(
		`${BASE_URL_DEVELOPMENT}/exercises`
	)

	if (!response.ok) {
		throw new Error('Failed to fetch exercises!')
	}

	return await response.json()
}

export async function searchEvents(name, weight, calories) {
	const params = new URLSearchParams({
		name,
		weight,
		calories
	})
	const response = await fetch(
		`${BASE_URL_DEVELOPMENT}/search?${params.toString()}`,
	)

	if (!response.ok) {
		throw new Error('Failed to fetch calendar events!')
	}

	return await response.json()
}

export async function addWorkout(payload) {
	const response = await fetch(`${BASE_URL_DEVELOPMENT}/add_workout`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	})

	if (!response.ok) throw new Error("Failed")
}

export async function fetchCurrentPeriod() {
	const response = await fetch(
		`${BASE_URL_DEVELOPMENT}/current_period`,
	)

	if (!response.ok) {
		throw new Error('Failed to fetch current period data!')
	}

	return await response.json()
}

export async function fetchWorkoutTemplate(templateDate) {
	const response = await fetch(
		`${BASE_URL_DEVELOPMENT}/template_workout?date=${templateDate}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	)
	if (!response.ok) {
		throw new Error('Workout for Template is not found!')
	}
	return response.json()
}