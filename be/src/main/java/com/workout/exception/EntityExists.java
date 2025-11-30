package com.workout.exception;

public class EntityExists extends RuntimeException {
	private static final long serialVersionUID = 7259152863360841841L;
	
	public EntityExists(String message) {
		super(message);
	}

}
