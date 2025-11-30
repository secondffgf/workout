package com.workout.mapper;

import java.time.format.DateTimeFormatter;
import java.util.List;

import com.workout.model.WorkoutModel;
import com.workout.projection.WorkoutFullProjection;

public interface WorkoutMapper {
	DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	List<? extends WorkoutModel> toModels(List<WorkoutFullProjection> workouts);
	
	default int countWorkouts(List<WorkoutFullProjection> workouts) {
		return(int) workouts.stream()
	        .map(WorkoutFullProjection::getDate)
	        .distinct()
	        .count();
	}
}
