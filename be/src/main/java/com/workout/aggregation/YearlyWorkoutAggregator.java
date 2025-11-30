package com.workout.aggregation;

import org.springframework.stereotype.Component;

import com.workout.mapper.WorkoutMapper;
import com.workout.mapper.YearlyWorkoutMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class YearlyWorkoutAggregator extends WorkoutAggregator {
	private final YearlyWorkoutMapper mapper;

	protected WorkoutMapper getMapper() {
		return mapper;
	}

}
