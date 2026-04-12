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

export type WorkoutType = {
  exercises: any[];
  id: any;
  date: any;
  xaxisLabel: string;
  time: any;
  rounds: any;
  comment: any;
}

export type WorkoutData = {
  statistics: {
    exerciseTime: string;
    calories: number;
  };
  content: WorkoutType[];
  totalElements: number;
};