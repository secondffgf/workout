package com.workout.projection;

import java.time.LocalDate;
import java.util.UUID;

import com.workout.model.StatisticsModel;

public interface WorkoutCalendarEventProjection extends StatisticsModel {
	UUID getId();
	LocalDate getDate();
	Integer getTrainingLoad();
	Integer getCalories();
	Integer getTime();
}
