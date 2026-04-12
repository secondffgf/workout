import { useState } from "react";
import StepWorkoutMetrics from "./StepWorkoutMetrics";
import StepExercises from "./StepExercises";
import StepBasicInfo from "./StepBasicInfo";
import type { NewWorkoutFormData } from "./types";
import { format } from 'date-fns'

const steps = ["Workout Metrics", "Exercises", "Basic Info"];
const currentDate = new Date().toISOString().split("T")[0];

const NewWorkoutPage = () => {
  const [templateDate, setTemplateDate] = useState(currentDate);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<NewWorkoutFormData>({
    exerciseTime: 0,
    calories: 0,
    puls: 0,
    maxPuls: 0,
    intensive: "",
    aero: "",
    anaero: "",
    trainingLoad: 0,
    exercises: [],
    date: currentDate,
    rounds: "",
    comment: "",
  });

  const updateField = <K extends keyof NewWorkoutFormData>(
    key: K,
    value: NewWorkoutFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateStep = () => {
    // if (currentStep === 0) {
    //   return (
    //     formData.durationMinutes > 0
    //     && formData.trainingLoad >= 0
    //     && formData.calories >= 0
    //   );
    // }
    // if (currentStep === 2) {
    //   return formData.date.trim() !== "" && formData.title.trim() !== "";
    // }
    return true;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const goBack = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    console.log("New workout payload", formData);
  };

  const changeTemplateDateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    const templateDateFormatted = format(new Date(newDate), 'yyyy-MM-dd');
    setTemplateDate(templateDateFormatted);
  }

  return (
    <div className="w-full px-6 py-8 md:px-12">
      <h2 className="text-2xl font-semibold text-slate-800">Add New Workout</h2>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isDone = index < currentStep;

          return (
            <div
              key={step}
              className={`rounded-lg border px-4 py-3 ${isActive ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white"}`}
            >
              <div className="text-sm text-slate-500">Step {index + 1}</div>
              <div className={`font-medium ${isDone ? "text-sky-700" : "text-slate-800"}`}>{step}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-600">
            <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-700">Template Workout Date</span>
                <input
                type="date"
                value={templateDate}
                onChange={changeTemplateDateHandler}
                className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-sky-500"
                />
            </label>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {currentStep === 0 && (
          <StepWorkoutMetrics formData={formData} updateField={updateField} />
        )}
        {currentStep === 1 && (
          <StepExercises formData={formData} updateField={updateField} />
        )}
        {currentStep === 2 && (
          <StepBasicInfo formData={formData} updateField={updateField} />
        )}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={currentStep === 0}
          className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>

        {currentStep < steps.length - 1 && (
          <button
            type="button"
            onClick={goNext}
            className="rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
          >
            Next
          </button>
        )}

        {currentStep === steps.length - 1 && (
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            Submit Workout
          </button>
        )}
      </div>
    </div>
  );
};

export default NewWorkoutPage;
