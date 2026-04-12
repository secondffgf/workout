package com.workout.service;

import org.springframework.web.multipart.MultipartFile;

import com.opencsv.bean.CsvToBeanBuilder;
import com.workout.entity.Exercise;
import com.workout.entity.Workout;
import com.workout.model.WorkoutCsv;
import com.workout.repository.ExerciseNameRepository;
import com.workout.repository.WorkoutRepository;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipEntry;

@Service
@RequiredArgsConstructor
public class ImportService {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private static final Pattern EXERCISE_ENTRY = Pattern.compile(
		"\\{name:\\s*\"([^\"]*)\"\\s*,\\s*weight:\\s*(-?\\d+)\\s*,\\s*order:\\s*(\\d+)\\s*}");

    private final WorkoutRepository workoutRepository;
    private final ExerciseNameRepository exerciseNameRepository;

    @SneakyThrows
	public String importCsv(MultipartFile zipFile) {
		int importedCount = 0;
		try (ZipInputStream zis = new ZipInputStream(zipFile.getInputStream())) {
			ZipEntry entry;

            while ((entry = zis.getNextEntry()) != null) {
            	if (entry.getName().endsWith(".csv")) {
            		InputStreamReader reader = new InputStreamReader(zis);
            		var csvToBean = new CsvToBeanBuilder<WorkoutCsv>(reader)
                            .withType(WorkoutCsv.class)
                            .withIgnoreLeadingWhiteSpace(true)
                            .build();
            		List<WorkoutCsv> workoutCsvList = csvToBean.parse();
            		List<Workout> entities = mapToWorkout(workoutCsvList);
            		
					if (entities != null && !entities.isEmpty()) {
						workoutRepository.saveAll(entities);
						importedCount = entities.size();
					}
            	}
            	zis.closeEntry();
            }
		}
		return "Imported " + importedCount + " workouts from ZIP";
	}

    private List<Workout> mapToWorkout(List<WorkoutCsv> workoutCsvList) {
		if (workoutCsvList == null || workoutCsvList.isEmpty()) {
			return List.of();
		}
		List<Workout> result = new ArrayList<>();
		for (WorkoutCsv csv : workoutCsvList) {
			if (csv == null) {
				continue;
			}

            Workout workout = mapToWorkout(csv);
			
			if (workout == null || workoutRepository.existsByDate(workout.getDate())) {
				continue;
			}
			
			result.add(workout);
		}
		return result;
	}

    private Workout mapToWorkout(WorkoutCsv csv) {
        LocalDate date;
        try {
            date = LocalDate.parse(csv.getDate().trim(), FORMATTER);
        } catch (DateTimeParseException ex) {
            return null;
        }
        Workout workout = new Workout();
        workout.setDate(date);
        workout.setExerciseTime(parseInteger(csv.getExerciseTime()));
        workout.setCalories(parseInteger(csv.getCalories()));
        workout.setPuls(parseInteger(csv.getPuls()));
        workout.setMaxPuls(parseInteger(csv.getMaxPuls()));
        workout.setIntensive(trimToNull(csv.getIntensive()));
        workout.setAerobish(trimToNull(csv.getAerobish()));
        workout.setAnaerobish(trimToNull(csv.getAnaerobish()));
        workout.setTrainingLoad(parseInteger(csv.getTrainingLoad()));
        workout.setRounds(trimToNull(csv.getRounds()));
        workout.setComment(trimToNull(csv.getComment()));
        workout.setExercises(parseExercisesFromCsv(csv.getExercises(), workout));
        return workout;
    }

    private static String trimToNull(String s) {
		if (!StringUtils.hasText(s)) {
			return null;
		}
		String t = s.trim();
		return t.isEmpty() ? null : t;
	}

	private static Integer parseInteger(String s) {
		if (!StringUtils.hasText(s)) {
			return null;
		}
		try {
			return Integer.parseInt(s.trim());
		} catch (NumberFormatException ex) {
			return null;
		}
	}

	private List<Exercise> parseExercisesFromCsv(String exercisesBlob, Workout workout) {
		if (!StringUtils.hasText(exercisesBlob)) {
			return new ArrayList<>();
		}
		Matcher matcher = EXERCISE_ENTRY.matcher(exercisesBlob);
		List<Exercise> exercises = new ArrayList<>();
		while (matcher.find()) {
			String nameValue = matcher.group(1).trim();
			if (!StringUtils.hasText(nameValue)) {
				continue;
			}
			int weight = Integer.parseInt(matcher.group(2));
			int order = Integer.parseInt(matcher.group(3));
			Exercise exercise = new Exercise();
			exercise.setWorkout(workout);
			exercise.setName(exerciseNameRepository.upsertAndReturnId(nameValue));
			exercise.setWeight(weight);
			exercise.setOrder(order);
			exercises.add(exercise);
		}
		return exercises;
	}
}
