package com.workout.model;

import com.opencsv.bean.CsvBindByName;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutCsv {
	@CsvBindByName(column = "id")
	private String id;
	@CsvBindByName(column = "date")
	private String date;
	@CsvBindByName(column = "exercise_time")
	private String exerciseTime;
	@CsvBindByName(column = "calories")
	private String calories;
	@CsvBindByName(column = "puls")
	private String puls;
	@CsvBindByName(column = "max_puls")
	private String maxPuls;
	@CsvBindByName(column = "intensive")
	private String intensive;
	@CsvBindByName(column = "aerobish")
	private String aerobish;
	@CsvBindByName(column = "anaerobish")
	private String anaerobish;
	@CsvBindByName(column = "training_load")
	private String trainingLoad;
	@CsvBindByName(column = "rounds")
	private String rounds;
	@CsvBindByName(column = "comment")
	private String comment;
	@CsvBindByName(column = "exercises")
	private String exercises;
}
