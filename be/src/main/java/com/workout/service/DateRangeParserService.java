package com.workout.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.Locale;

import org.springframework.stereotype.Service;

import com.workout.model.DateRange;

@Service
public class DateRangeParserService {
	private static final DateTimeFormatter FULL_FORMAT = DateTimeFormatter.ofPattern("dd.MM.yyyy");
    private static final DateTimeFormatter SHORT_FORMAT = DateTimeFormatter.ofPattern("dd.MM.yy");
    private static final DateTimeFormatter MONTH_FORMAT = DateTimeFormatter.ofPattern("MMM yyyy", Locale.ENGLISH);
	
	public DateRange parseWeek(String input) {
        String[] parts = input.split(" - ");
        if (parts.length != 2) {
            throw new IllegalArgumentException("Invalid date range format: " + input);
        }
        
        boolean hasYear = parts[0].chars().filter(c -> c == '.').count() == 2;
        
        if (hasYear) {
        	return parseWithYear(parts[0], parts[1]);
        } else {
        	return parseCurrentYear(parts[0]);
        }
	}
	
	public DateRange parseMonth(String input) {
		YearMonth yearMonth = YearMonth.parse(input, MONTH_FORMAT);

        LocalDate startOfMonth = yearMonth.atDay(1);
        LocalDate endOfMonth = yearMonth.atEndOfMonth();
        return new DateRange(startOfMonth, endOfMonth);
	}
	
	public DateRange parseYear(String input) {
		int year = Integer.parseInt(input);
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate endOfYear = LocalDate.of(year, 12, 31);
		return new DateRange(startOfYear, endOfYear);
	}
	
	private DateRange parseWithYear(String startPart, String endPart) {
		LocalDate startDate = LocalDate.parse(startPart, SHORT_FORMAT);
        LocalDate endDate = LocalDate.parse(endPart, SHORT_FORMAT);
        LocalDate weekStart = startDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate weekEnd = endDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        return new DateRange(weekStart, weekEnd);
	}
	
	private DateRange parseCurrentYear(String startPart) {
		LocalDate today = LocalDate.now();
        int thisYear = today.getYear();
		LocalDate parsedDate = LocalDate.parse(startPart + "." + thisYear, FULL_FORMAT);
    	LocalDate weekStart = parsedDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate weekEnd = parsedDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        return new DateRange(weekStart, weekEnd);
	}
}
