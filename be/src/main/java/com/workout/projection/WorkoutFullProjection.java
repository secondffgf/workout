package com.workout.projection;

import java.time.LocalDate;
import java.util.UUID;

public interface WorkoutFullProjection {
	UUID getId();
	LocalDate getDate();
	Integer getExerciseTime();
	Integer getCalories();
	Integer getPuls();
	Integer getMaxPuls();
	String getIntensive();
	String getAerobish();
	String getAnaerobish();
	Integer getTrainingLoad();
	String getRounds();
	String getComment();
	String getName();
	Integer getWeight();
	Integer getOrder();
	Boolean getFavorite();
}
