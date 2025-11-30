package com.workout.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ExerciseModel(
	@JsonProperty("exercise")
	String name,
	Integer weight,
	Integer order
) {
}
