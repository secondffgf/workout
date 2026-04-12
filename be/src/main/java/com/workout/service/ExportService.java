package com.workout.service;

import java.io.ByteArrayOutputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import org.springframework.stereotype.Service;
import com.opencsv.CSVWriter;
import com.workout.model.WorkoutCsv;
import com.workout.model.WorkoutCsv.WorkoutCsvBuilder;
import com.workout.projection.WorkoutFullProjection;
import com.workout.repository.ExerciseRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Service
@RequiredArgsConstructor
public class ExportService {
	private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	private final ExerciseRepository exerciseRepository;

	@SneakyThrows
	public byte[] exportCsv() {
		List<WorkoutFullProjection> data = exerciseRepository.getAllWorkouts();
		List<WorkoutCsv> csvData = mapToCsvModel(data);
		csvData
			.sort(Comparator.comparing(d -> LocalDate.parse(d.getDate()), Comparator.reverseOrder()));
		String payload = createCsvAsString(csvData);
		ByteArrayOutputStream zipOutStream = new ByteArrayOutputStream();
		try (ZipOutputStream zipStream = new ZipOutputStream(zipOutStream, StandardCharsets.UTF_8)) {
            ZipEntry entry = new ZipEntry("workouts.csv");
            zipStream.putNextEntry(entry);
            zipStream.write(payload.getBytes(StandardCharsets.UTF_8));
            zipStream.closeEntry();
        }
		return zipOutStream.toByteArray();
	}
	
	private List<WorkoutCsv> mapToCsvModel(List<WorkoutFullProjection> data) {
		List<WorkoutCsv> models = new ArrayList<>();
		Map<UUID, List<WorkoutFullProjection>> byId = data.stream()
			.collect(Collectors.groupingBy(WorkoutFullProjection::getId));
		byId.keySet().forEach(uuid -> {
			List<WorkoutFullProjection> projections = byId.get(uuid);
			WorkoutCsv csvModel = mapWorkoutProjections(projections);
			models.add(csvModel);
		});
		return models;
	}
	
	private WorkoutCsv mapWorkoutProjections(List<WorkoutFullProjection> projections) {
		WorkoutCsvBuilder modelBuilder = WorkoutCsv.builder();
		WorkoutCsv workout = null;
		StringBuilder exercises = null;
		for (int i = 0; i < projections.size(); i++) {
			var projection = projections.get(i);
			if (i == 0) {
				modelBuilder
					.aerobish(projection.getAerobish())
					.anaerobish(projection.getAnaerobish())
					.calories(projection.getCalories().toString())
					.comment(projection.getComment())
					.date(projection.getDate().format(FORMATTER))
					.exerciseTime(projection.getExerciseTime().toString())
					.intensive(projection.getIntensive())
					.maxPuls(projection.getMaxPuls().toString())
					.puls(projection.getPuls().toString())
					.rounds(projection.getRounds())
					.trainingLoad(projection.getTrainingLoad().toString());
				exercises = new StringBuilder("[");
			}
			if (exercises == null) {
				exercises = new StringBuilder("[");
			}
			exercises.append("{name: \"")
					.append(projection.getName())
					.append("\" ,weight: ")
					.append(projection.getWeight())
					.append(", order: ")
					.append(projection.getOrder())
					.append("},");
			
			if (i == projections.size() - 1) {
				exercises.deleteCharAt(exercises.length() - 1);
				exercises.append("]");
				modelBuilder.exercises(exercises.toString());
				workout= modelBuilder.build();
			}
			
			
		}
		return workout;
	}

	@SneakyThrows
	private String createCsvAsString(List<WorkoutCsv> csvData) {
		StringWriter stringWriter = new StringWriter();
		try (CSVWriter csvWriter = new CSVWriter(stringWriter)) {
			csvWriter.writeNext(new String[] {
				"date", "exercise_time", "calories", "puls", "max_puls",
				"intensive", "aerobish", "anaerobish", "training_load",
				"rounds", "comment", "exercises"
			});
			for (WorkoutCsv dto : csvData) {
                csvWriter.writeNext(new String[]{
                    dto.getDate().toString(),
                    dto.getExerciseTime().toString(),
                    dto.getCalories().toString(),
                    dto.getPuls().toString(),
                    dto.getMaxPuls().toString(),
                    dto.getIntensive(),
                    dto.getAerobish(),
                    dto.getAnaerobish(),
                    dto.getTrainingLoad().toString(),
                    dto.getRounds(),
                    dto.getComment(),
                    dto.getExercises()
                });
			}
		}
		return stringWriter.toString();
	}
}
