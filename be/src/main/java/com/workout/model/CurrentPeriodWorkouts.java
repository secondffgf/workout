package com.workout.model;

import java.util.List;

public record CurrentPeriodWorkouts(
	List<CalendarEventModel> currentWeek,
	List<CalendarEventModel> prevWeek,
	WorkoutStatistics statistics,
	int monthCalories
) {
}
