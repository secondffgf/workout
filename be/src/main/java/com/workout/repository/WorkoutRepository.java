package com.workout.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.workout.entity.Workout;
import com.workout.projection.WorkoutCalendarEventProjection;
import com.workout.projection.WorkoutFullProjection;

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
		SELECT w.innerId as id, w.date as date,
			w.exerciseTime as exerciseTime,
		    w.calories as calories, w.puls as puls,
		    w.maxPuls as maxPuls, w.intensive as intensive,
		    w.aerobish as aerobish, w.anaerobish as anaerobish,
			w.trainingLoad as trainingLoad, w.rounds as rounds,
			w.comment as comment, e.weight as weight,
			e.ex_order as order, n.value as name,
			CASE
				WHEN f.id IS NOT NULL THEN true
				ELSE false
			END AS favorite
		FROM exercise e
		INNER JOIN (
			SELECT DISTINCT w.id as innerId, w.date as date,
			w.exercise_time as exerciseTime,
		    w.calories as calories, w.puls as puls,
		    w.puls_max as maxPuls, w.intensive as intensive,
		    w.aero as aerobish, w.anaero as anaerobish,
			w.tl as trainingLoad, w.rounds as rounds,
			w.comment as comment
			FROM workout w
			LEFT JOIN exercise inner_e on inner_e.workout_id = w.id
			WHERE
				(:name IS NULL OR inner_e.name = :name)
				AND (:weight IS NULL OR inner_e.weight >= :weight)
				AND (:calories IS NULL OR w.calories >= :calories)
			ORDER BY date DESC
			LIMIT 10
		) w ON e.workout_id = w.innerId
		LEFT JOIN exercise_name n on e.name = n.id
		LEFT JOIN favorite f on f.workout = w.innerId
		ORDER BY date DESC, e.ex_order ASC
	""", nativeQuery = true)
	List<WorkoutFullProjection> searchWorkouts(UUID name, Integer weight, Integer calories);

	@Query("SELECT COALESCE(SUM(w.calories), 0) " +
	           "FROM Workout w " +
	           "WHERE FUNCTION('date_trunc', 'month', w.date) = " +
	           "      FUNCTION('date_trunc', 'month', CURRENT_DATE)")
	int getCurrentMonthCalories();
}
