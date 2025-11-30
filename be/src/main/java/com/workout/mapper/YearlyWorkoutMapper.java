package com.workout.mapper;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.workout.model.WorkoutModel;
import com.workout.model.YearlyWorkoutModel;
import com.workout.projection.WorkoutFullProjection;

@Component
public class YearlyWorkoutMapper implements WorkoutMapper {

	@Override
	public List<? extends WorkoutModel> toModels(List<WorkoutFullProjection> workouts) {
		Map<Month, List<WorkoutFullProjection>> byMonth = workouts.stream()
			.collect(Collectors.groupingBy(w -> w.getDate().getMonth()));
		
		List<YearlyWorkoutModel> result = new ArrayList<>();
		
		for (Month month : byMonth.keySet()) {
			List<WorkoutFullProjection> monthWorkouts = byMonth.get(month);
			YearlyWorkoutModel yearlyModel = mapMonthWorkoutProjections(monthWorkouts, month);
			result.add(yearlyModel);
		}
		return result;
	}

	private YearlyWorkoutModel mapMonthWorkoutProjections(
		List<WorkoutFullProjection> projections,
		Month month
	) {
		Map<LocalDate, WorkoutFullProjection> byDate = projections.stream()
			.collect(Collectors.toMap(
				WorkoutFullProjection::getDate,
				Function.identity(),
				(first, second) -> first
			));
		
		int calories = 0;
		LocalDate date = null;
		int exerciseTime = 0;
		int trainingLoad = 0;
		for (WorkoutFullProjection workout : byDate.values()) {
			date = workout.getDate();
			calories += workout.getCalories();
			exerciseTime += workout.getExerciseTime();
			trainingLoad += workout.getTrainingLoad();
		}
		
		return YearlyWorkoutModel.builder()
			.calories(calories)
			.date(date.format(FORMATTER))
			.time(exerciseTime)
			.trainings(this.countWorkouts(projections))
			.trainingLoad(trainingLoad)
			.build();
	}
}
