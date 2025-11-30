package com.workout.mapstruct;

import java.util.Comparator;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import com.workout.entity.Exercise;
import com.workout.entity.ExerciseName;
import com.workout.entity.Favorite;
import com.workout.entity.Workout;
import com.workout.model.CalendarEventModel;
import com.workout.model.ExerciseModel;
import com.workout.model.ExerciseNameModel;
import com.workout.model.FavoriteWorkout;
import com.workout.model.SingleWorkoutModel;
import com.workout.projection.WorkoutCalendarEventProjection;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface WorkoutMapstructMapper {
	@Mapping(target = "exercises", ignore = true)
	@Mapping(target = "exerciseTime", source = "time")
	Workout toEntity(SingleWorkoutModel model);
	
	@Mapping(target = "time", source = "exerciseTime")
	@Mapping(target = "favorite", constant = "false")
	SingleWorkoutModel toWorkout(Workout workout);
	
	ExerciseModel toExercise(Exercise exercise);
	
	default List<SingleWorkoutModel> toWorkoutModel(List<Workout> workouts) {
		return workouts.stream()
			.map(this::toWorkout)
			.toList();
	}
	
	@Mapping(target = "label", source = "value")
	@Mapping(target = "value", source = "value")
	ExerciseNameModel toName(ExerciseName name);
	

	@Mapping(target = "label", source = "value")
	@Mapping(target = "value", source = "id")
	ExerciseNameModel toNameWithId(ExerciseName name);
	
	default List<ExerciseNameModel> toNameModel(List<ExerciseName> names) {
		return names.stream()
			.map(this::toName)
			.sorted(Comparator.comparing(ExerciseNameModel::label, String.CASE_INSENSITIVE_ORDER))
			.toList();
	}
	

	default List<ExerciseNameModel> toNameModelWithId(List<ExerciseName> names) {
		return names.stream()
				.map(this::toNameWithId)
				.sorted(Comparator.comparing(ExerciseNameModel::label, String.CASE_INSENSITIVE_ORDER))
				.toList();
	}
	
	
	default String map(ExerciseName name) {
		return name.getValue();
	}
	
	CalendarEventModel toModel(WorkoutCalendarEventProjection projection);
	
	default List<CalendarEventModel> toCalendarEvents(List<WorkoutCalendarEventProjection> projections) {
		return projections.stream()
			.map(this::toModel)
			.toList();
				
	}
	
	FavoriteWorkout toFavoriteModel(Favorite favorite);

	default List<FavoriteWorkout> toFavoriteModels(List<Favorite> favorites) {
		return favorites.stream()
			.map(this::toFavoriteModel)
			.toList();
	}

}
