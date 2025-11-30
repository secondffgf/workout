package com.workout.aggregation;

import java.util.List;

import com.workout.mapper.WorkoutMapper;
import com.workout.model.WorkoutModel;
import com.workout.model.WorkoutStatistics;
import com.workout.model.WorkoutsResponse;
import com.workout.projection.WorkoutFullProjection;
import com.workout.util.StatisticsUtil;

public abstract class WorkoutAggregator {

	public WorkoutsResponse<? extends WorkoutModel> aggregate(
			List<WorkoutFullProjection> workouts
	) {
		List<? extends WorkoutModel> models = getMapper().toModels(workouts);
		WorkoutStatistics statistics = StatisticsUtil.calculateFrom(models);
		
		return new WorkoutsResponse<>(
			models,
			statistics,
			getMapper().countWorkouts(workouts)
		);
	}

	protected abstract WorkoutMapper getMapper();
	
}
