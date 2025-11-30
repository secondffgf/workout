package com.workout.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@ToString
public class Workout {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private LocalDate date;
	@Column(name = "exercise_time")
	private Integer exerciseTime;
	private Integer calories;
	private Integer puls;
	@Column(name = "puls_max")
	private Integer maxPuls;
	private String intensive;
	@Column(name = "aero")
	private String aerobish;
	@Column(name = "anaero")
	private String anaerobish;
	@Column(name = "tl")
	private Integer trainingLoad;
	private String rounds;
	private String comment;
	@OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Exercise> exercises;
}
