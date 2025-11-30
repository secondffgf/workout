package com.workout.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.workout.entity.Favorite;

public interface FavoriteRepository extends JpaRepository<Favorite, UUID> {

	@Modifying
	@Transactional
	@Query(value = """
	 WITH ins AS (
            INSERT INTO favorite(fav_order, workout)
            SELECT COALESCE(MAX(fav_order), 0) + 1, :workout from favorite
            ON CONFLICT (workout) DO NOTHING
            RETURNING id
        )
        DELETE FROM favorite
	    WHERE workout = :workout
        AND NOT EXISTS (SELECT 1 FROM ins);		
	""", nativeQuery = true)
	void addOrRemove(UUID workout);

}
