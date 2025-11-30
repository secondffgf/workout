package com.workout.model;

import java.util.List;

public record WorkoutsResponse<T extends WorkoutModel>(
	List<T> content,
	WorkoutStatistics statistics,
	long totalElements
) {
}
