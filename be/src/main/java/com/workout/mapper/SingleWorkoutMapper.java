package com.workout.mapper;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.workout.model.ExerciseModel;
import com.workout.model.SingleWorkoutModel;
import com.workout.model.SingleWorkoutModel.SingleWorkoutModelBuilder;
import com.workout.projection.WorkoutFullProjection;

@Component
public class SingleWorkoutMapper implements WorkoutMapper {
	
	public List<SingleWorkoutModel> toModels(List<WorkoutFullProjection> workouts) {
		Map<UUID, List<WorkoutFullProjection>> byId = workouts.stream()
			.collect(Collectors.groupingBy(WorkoutFullProjection::getId));
		List<SingleWorkoutModel> models = new ArrayList<>(workouts.size());
		byId.keySet().forEach(uuid -> {
			List<WorkoutFullProjection> projections = byId.get(uuid);
			SingleWorkoutModel model = mapWorkoutProjections(projections);
			models.add(model);
		});
		models
			.sort(Comparator.comparing(m -> LocalDate.parse(m.getDate()), Comparator.reverseOrder()));
		return models;
	}
	
	private SingleWorkoutModel mapWorkoutProjections(List<WorkoutFullProjection> projections) {
		SingleWorkoutModelBuilder modelBuilder = SingleWorkoutModel.builder();
		modelBuilder.exercises(new ArrayList<>(projections.size()));
		SingleWorkoutModel workout = null;
		for (int i = 0; i < projections.size(); i++) {
			var projection = projections.get(i);
			if (i == 0) {
				workout = modelBuilder
					.id(projection.getId())
					.aerobish(projection.getAerobish())
					.anaerobish(projection.getAnaerobish())
					.calories(projection.getCalories())
					.comment(projection.getComment())
					.date(projection.getDate().format(FORMATTER))
					.time(projection.getExerciseTime())
					.intensive(projection.getIntensive())
					.maxPuls(projection.getMaxPuls())
					.puls(projection.getPuls())
					.rounds(projection.getRounds())
					.trainingLoad(projection.getTrainingLoad())
					.favorite(projection.getFavorite() != null ? projection.getFavorite() : false)
					.build();
			}
			ExerciseModel exercise = new ExerciseModel(
					projection.getName(),
					projection.getWeight(),
					projection.getOrder());
			workout.getExercises().add(exercise);
			
		}
		return workout;
	}
}
