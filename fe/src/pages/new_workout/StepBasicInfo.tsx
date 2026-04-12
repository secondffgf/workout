import type { NewWorkoutFormData } from "../../types";

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
    <div className="grid grid-cols-1 px-16">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700">Rounds</span>
        <input
          type="text"
          value={formData.rounds}
          onChange={(e) => updateField("rounds", e.target.value)}
          placeholder="3x10"
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
        />
      </label>
    </div>
    <div className="grid grid-cols-1 px-16 mt-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700">Comment</span>
        <textarea
          value={formData.comment}
          onChange={(e) => updateField("comment", e.target.value)}
          rows={4}
          placeholder="e.g. 3x10 squats, 5km run..."
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
        />
      </label>
    </div>
    </>
  );
};

export default StepBasicInfo;
