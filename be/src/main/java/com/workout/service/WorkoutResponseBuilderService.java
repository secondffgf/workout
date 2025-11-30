package com.workout.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.workout.aggregation.WorkoutAggregationFactory;
import com.workout.aggregation.WorkoutAggregator;
import com.workout.model.DateRange;
import com.workout.model.WorkoutModel;
import com.workout.model.WorkoutsPeriod;
import com.workout.model.WorkoutsResponse;
import com.workout.projection.WorkoutFullProjection;
import com.workout.repository.ExerciseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorkoutResponseBuilderService {
	private final DateRangeParserService dateRangeParserService;
	private final ExerciseRepository exerciseRepository;
	private final WorkoutAggregationFactory aggregationFactory;

	public WorkoutsResponse<? extends WorkoutModel> generateResponse(WorkoutsPeriod period) {
		DateRange dateRange = parseDateRange(period);
		List<WorkoutFullProjection> workouts
			= exerciseRepository.findWorkoutsForPeriod(dateRange.startDate(), dateRange.endDate());
		WorkoutAggregator aggregator
			= aggregationFactory.getAggregator(period.timePeriod());
		return aggregator.aggregate(workouts);
	}

	private DateRange parseDateRange(WorkoutsPeriod period) {
		switch(period.timePeriod()) {
			case ALL:
				return null;
			case WEEK:
				return dateRangeParserService.parseWeek(period.startOfPeriod());
			case YEAR:
				return dateRangeParserService.parseYear(period.startOfPeriod());
			default:
				return dateRangeParserService.parseMonth(period.startOfPeriod());
		}
	}
}
