package com.workout.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.workout.entity.ExerciseName;

public interface ExerciseNameRepository extends JpaRepository<ExerciseName, UUID> {
	@Query(
        value = """
            INSERT INTO exercise_name (value)
            VALUES (:value)
            ON CONFLICT (value)
            DO UPDATE SET value = EXCLUDED.value
            RETURNING *
        """,
        nativeQuery = true
    )
	ExerciseName upsertAndReturnId(@Param("value") String value);
}
