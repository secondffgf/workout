package com.workout.aggregation;

import org.springframework.stereotype.Component;

import com.workout.model.TimePeriod;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class WorkoutAggregationFactory {
	private final MonthlyWorkoutAggregator monthly;
	private final YearlyWorkoutAggregator yearly;
	
	public WorkoutAggregator getAggregator(TimePeriod timePeriod) {
		switch(timePeriod) {
			case YEAR:
				return yearly;
			case MONTH:
			case WEEK:
			default:
				return monthly;
		}
	}

}
