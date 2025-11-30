package com.workout.aggregation;

import org.springframework.stereotype.Component;

import com.workout.mapper.SingleWorkoutMapper;
import com.workout.mapper.WorkoutMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MonthlyWorkoutAggregator extends WorkoutAggregator {
	private final SingleWorkoutMapper mapper;

	protected WorkoutMapper getMapper() {
		return mapper;
	}
}
