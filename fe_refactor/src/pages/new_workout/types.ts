/** Matches GET /api/exercises → `ExerciseNameModel` from the API. */
export type ExerciseNameOption = {
  value: string;
  label: string;
};

export type NewWorkoutLoaderData = {
  exerciseOptions: ExerciseNameOption[];
};

export type NewWorkoutFormData = {
// metrics    
    time: number;
    calories: number;
    puls: number;
    maxPuls: number;
    intensive: string;
    aero: string;
    anaero: string;
    trainingLoad: number;

// exercises
    exercises: {
        exercise: string;
        weight: number;
    }[];

// basic info
  date: string;
  rounds: string;
  comment: string;
};
