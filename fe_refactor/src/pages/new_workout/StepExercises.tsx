import { AutoComplete, ConfigProvider } from "antd";
import { useMemo } from "react";
import { RiCloseFill } from "react-icons/ri";
import type { ExerciseNameOption, NewWorkoutFormData } from "./types";

type StepExercisesProps = {
  formData: NewWorkoutFormData;
  exerciseOptions: ExerciseNameOption[];
  updateField: <K extends keyof NewWorkoutFormData>(
    key: K,
    value: NewWorkoutFormData[K],
  ) => void;
};

const StepExercises = ({
  formData,
  updateField,
  exerciseOptions,
}: StepExercisesProps) => {
  const nameOptions = useMemo(
    () =>
      exerciseOptions.map((opt) => ({
        value: opt.value,
        label: opt.label
      })),
    [exerciseOptions],
  );

  const addExerciseHandler = () => {
    updateField("exercises", [
      ...formData.exercises,
      { exercise: "", weight: 0 },
    ]);
  };

  const updateExercise = (
    index: number,
    field: "exercise" | "weight",
    value: string,
  ) => {
    const next = formData.exercises.map((ex, i) => {
      if (i !== index) return ex;
      if (field === "exercise") return { ...ex, exercise: value };
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

  const selectHeightTheme = {
    components: {
      Select: {
        controlHeight: 40,
        borderRadius: 6,
        fontSize: 14,
      },
    },
  } as const;

  return (
    <ConfigProvider theme={selectHeightTheme}>
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
              <div className="rounded-lg border border-slate-200 bg-white">
                <div className="flex items-center justify-between gap-2 pt-2 px-3">
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 px-4 pb-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-slate-700">Name:</span>
                    <AutoComplete
                      className="w-full [&_.ant-select-selector]:border-slate-300"
                      value={exercise.exercise}
                      options={nameOptions}
                      onChange={(val) => updateExercise(index, "exercise", val)}
                      placeholder="Choose exercise..."
                      allowClear
                      getPopupContainer={() => document.body}
                      filterOption={(input, option) => {
                        const q = input.trim().toLowerCase();
                        if (!q) return true;
                        const label = String(
                          option?.label ?? option?.value ?? "",
                        ).toLowerCase();
                        const value = String(option?.value ?? "").toLowerCase();
                        return label.includes(q) || value.includes(q);
                      }}
                    />
                  </div>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-slate-700">Weight:</span>
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={exercise.weight === 0 ? "" : exercise.weight}
                      onChange={(e) => updateExercise(index, "weight", e.target.value)}
                      placeholder="kg"
                      className="box-border h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-sky-500"
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </ConfigProvider>
  );
};

export default StepExercises;
