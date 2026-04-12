import type { NewWorkoutFormData } from "./types";

type StepBasicInfoProps = {
  formData: NewWorkoutFormData;
  updateField: <K extends keyof NewWorkoutFormData>(
    key: K,
    value: NewWorkoutFormData[K],
  ) => void;
};

const StepBasicInfo = ({ formData, updateField }: StepBasicInfoProps) => {
  return (
    <>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700">Workout Date</span>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => updateField("date", e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700">Description</span>
        <input
          type="text"
          value={formData.rounds}
          onChange={(e) => updateField("rounds", e.target.value)}
          placeholder="Leg day, Run, Crossfit..."
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
        />
      </label>
    </div>
    </>
  );
};

export default StepBasicInfo;
