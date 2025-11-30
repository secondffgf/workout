package com.workout.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CalendarEventModel {
	private String id;
	private String date;
	private Integer trainingLoad;
	private Integer calories;
}
