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
    };

    return (
        <>
        <div className="flex w-full justify-end">
            <button
                type="button"
                onClick={addExerciseHandler}
                className="rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
                >
                Add Exercise
            </button>
        </div>
        {/* <div className="grid mt-4 gap-4 grid-cols-2">
            <p className="text-sm text-slate-500">Add exercises for this workout session.</p>
            <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-700">Comment / Exercise Notes</span>
            <textarea
                rows={4}
                value={formData.comment}
                onChange={(e) => updateField("comment", e.target.value)}
                placeholder="e.g. 3x10 squats, 5km run..."
                className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
            />
            </label>
        </div> */}
        </>
    );
};

export default StepExercises;
