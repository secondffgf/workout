export type NewWorkoutFormData = {
// metrics    
    exerciseTime: number;
    calories: number;
    puls: number;
    maxPuls: number;
    intensive: string;
    aero: string;
    anaero: string;
    trainingLoad: number;

// exercises
    exercises: {
        name: string;
        weight: number;
    }[];

// basic info
  date: string;
  rounds: string;
  comment: string;
};
