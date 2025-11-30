package com.workout.util;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collector;

import com.workout.model.StatisticsModel;
import com.workout.model.WorkoutStatistics;

import lombok.experimental.UtilityClass;

@UtilityClass
public class StatisticsUtil {
	public static WorkoutStatistics calculateFrom(List<? extends StatisticsModel> workouts) {
		return workouts.stream().collect(
			Collector.of(
				() -> new int[2],
				(collect, workout) -> {
					collect[0] += workout.getCalories();
					collect[1] += workout.getTime();
				},
				(collect1, collect2) -> {
					collect1[0] += collect2[0];
					collect1[1] += collect2[1];
					return collect1;
				},
				collect -> new WorkoutStatistics(collect[0], formatTime(collect[1]))
			)
		);
	}
	
	private static String formatTime(int totalMinutes) {
		Duration duration = Duration.ofMinutes(totalMinutes);
	    long hours = duration.toHours();
	    long minutes = duration.toMinutesPart();

	    return String.format("%02d:%02d:00", hours, minutes);
	}
}
