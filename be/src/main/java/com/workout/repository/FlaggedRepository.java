package com.workout.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.workout.entity.Flagged;

public interface FlaggedRepository extends JpaRepository<Flagged, UUID> {
    @Modifying
    @Transactional
    @Query(value = """
        DELETE FROM flagged
        WHERE day = :date       
    """, nativeQuery = true)
    void delete(String date);
}
