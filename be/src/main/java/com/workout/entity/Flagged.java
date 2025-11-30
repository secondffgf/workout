package com.workout.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
public class Flagged {
    @Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;

    @Column(name = "day")
    private String day;
}
