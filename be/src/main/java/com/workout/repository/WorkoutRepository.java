package com.workout.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.workout.entity.Workout;
import com.workout.projection.WorkoutCalendarEventProjection;

public interface WorkoutRepository extends JpaRepository<Workout, UUID> {
	boolean existsByDate(LocalDate workoutDate);

	@Query("SELECT MIN(w.date) FROM Workout w")
	LocalDate findFirstWorkoutDate();

	@Query("""
		SELECT w.id as id, w.date as date,
		w.trainingLoad as trainingLoad,
		w.calories as calories, w.exerciseTime as time
		FROM Workout w
		WHERE w.date <= :endDate
		AND w.date >= :startDate
		ORDER BY w.date ASC
	""")
	List<WorkoutCalendarEventProjection> getCalendarEventProjections(
		LocalDate startDate, LocalDate endDate
	);

	@Query(value = """
		select w.id
		from workout w
		join exercise e on e.workout_id = w.id
		join exercise_name n on e.name = n.id
		where n.value in (:exercises)
		GROUP BY w.id, w.date
		HAVING COUNT(DISTINCT n.value) = :exerciseCount
		ORDER BY w.date DESC
		LIMIT :limit;
	""", nativeQuery = true)
	List<UUID> searchWorkoutIds(List<String> exercises, int exerciseCount, int limit);

	@Query(value = """
		select w.id
		from workout w
		order by w.date desc
		LIMIT :limit;
	""", nativeQuery = true)
	List<UUID> searchWorkoutIds(int limit);

	@Query("SELECT COALESCE(SUM(w.calories), 0) " +
	           "FROM Workout w " +
	           "WHERE FUNCTION('date_trunc', 'month', w.date) = " +
	           "      FUNCTION('date_trunc', 'month', CURRENT_DATE)")
	int getCurrentMonthCalories();
}
