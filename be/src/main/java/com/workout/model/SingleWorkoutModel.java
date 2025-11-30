package com.workout.model;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SingleWorkoutModel implements WorkoutModel {
	private UUID id;
	private String date;
	private Integer time;
	private Integer calories;
	private Integer puls;
	private Integer maxPuls;
	private String intensive;
	@JsonProperty("aero")
	private String aerobish;
	@JsonProperty("anaero")
	private String anaerobish;
	private Integer trainingLoad;
	private String rounds;
	private String comment;
	private List<ExerciseModel> exercises;
	private boolean favorite;
}
