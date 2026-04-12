import { RiCloseFill } from "react-icons/ri";
import type { NewWorkoutFormData } from "./types";

type StepExercisesProps = {
  formData: NewWorkoutFormData;
  updateField: <K extends keyof NewWorkoutFormData>(
    key: K,
    value: NewWorkoutFormData[K],
  ) => void;
};

const StepExercises = ({ formData, updateField }: StepExercisesProps) => {
  const addExerciseHandler = () => {
    updateField("exercises", [
      ...formData.exercises,
      { name: "", weight: 0 },
    ]);
  };

  const updateExercise = (
    index: number,
    field: "name" | "weight",
    value: string,
  ) => {
    const next = formData.exercises.map((ex, i) => {
      if (i !== index) return ex;
      if (field === "name") return { ...ex, name: value };
      const n = value === "" ? 0 : Number(value);
      return { ...ex, weight: Number.isFinite(n) ? n : ex.weight };
    });
    updateField("exercises", next);
  };

  const removeExerciseHandler = (index: number) => {
    updateField(
      "exercises",
      formData.exercises.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex w-full shrink-0 justify-end">
        <button
          id="add-exercise-button"
          type="button"
          onClick={addExerciseHandler}
          className="rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
        >
          Add Exercise
        </button>
      </div>
      <div className="mt-6 min-h-0 flex-1 overflow-y-auto">
        <div className="grid gap-4 px-16 pb-2">
          {formData.exercises.map((exercise, index) => (
            <div
              id={`exercise-${index}`}
              key={index}
              className={`flex flex-col gap-3${index > 0 ? " pt-6" : ""}`}
            >
              <div className="flex items-center justify-between gap-2 rounded-md border border-sky-200 bg-sky-50 px-3 py-1.5">
                <span className="text-lg font-semibold text-sky-900">
                  Exercise {index + 1}:
                </span>
                <button
                  type="button"
                  onClick={() => removeExerciseHandler(index)}
                  className="-m-0.5 shrink-0 rounded-md p-1 text-rose-600 hover:bg-sky-100 hover:text-rose-700"
                  aria-label={`Delete exercise ${index + 1}`}
                >
                  <RiCloseFill className="h-6 w-6" aria-hidden />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-700">Name:</span>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => updateExercise(index, "name", e.target.value)}
                    placeholder="Exercise name"
                    className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-700">Weight:</span>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={exercise.weight === 0 ? "" : exercise.weight}
                    onChange={(e) => updateExercise(index, "weight", e.target.value)}
                    placeholder="kg"
                    className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepExercises;
