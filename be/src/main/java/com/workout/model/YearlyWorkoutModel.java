package com.workout.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class YearlyWorkoutModel implements WorkoutModel {
	private String date;
	private Integer calories;
	private Integer time;
	private Integer trainings;
	private Integer trainingLoad;
	
	@Override
	public String getXAxisLabel() {
		LocalDate localDate = LocalDate.parse(getDate());
        return localDate.format(DateTimeFormatter.ofPattern("MM"));
	}
}
