package com.workout.model;

import java.time.LocalDate;

import com.workout.constants.Constants;

public interface WorkoutModel extends StatisticsModel {
	
	String getDate();
	
	default String getXAxisLabel() {
		LocalDate localDate = LocalDate.parse(getDate());
        return localDate.format(Constants.SHORT_DATE_FORMATTER);
	}
}
