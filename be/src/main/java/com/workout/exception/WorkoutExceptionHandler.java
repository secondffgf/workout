package com.workout.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class WorkoutExceptionHandler {
	@ExceptionHandler(EntityExists.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public String handleBadRequest(EntityExists ex) {
		return ex.getMessage();
	}
}
