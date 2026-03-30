import { useContext } from "react";
import { FirstWorkoutContext } from "@/context/FirstWorkoutContextProvider";
import MonthSelector from "@/components/dashboard/MonthSelector";
import { useLoaderData, useSearchParams } from "react-router-dom";
import WorkoutBarChart from "@/components/general/UI/chart/WorkoutBarChart";
import { formatMonthlyChartData, type WorkoutType } from "@/utils/utils";
import WorkoutDetail from "@/components/general/WorkoutDetail";

type WorkoutData = {
  statistics: {
    exerciseTime: string;
    calories: number;
  };
  content: WorkoutType[];
  totalElements: number;
};

const formatMonthValue = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);

const normalizeStartOfPeriod = (startParam: string | null) => {
  if (!startParam) {
    return formatMonthValue(new Date());
  }

  const parsed = new Date(`1 ${startParam}`);
  if (Number.isNaN(parsed.getTime())) {
    return formatMonthValue(new Date());
  }

  return formatMonthValue(parsed);
};

const MonthPage = () => {
  const firstWorkoutState:
  { state: { firstWorkout: string; error: string | null } } | undefined = useContext(FirstWorkoutContext) 
  const firstWorkout = firstWorkoutState?.state.firstWorkout || '';
  const [, setSearchParams] = useSearchParams();
  const workouts: WorkoutData = useLoaderData();

  const chartData = formatMonthlyChartData(workouts.content);

  const handleSelectBar = (data: any) => {
    console.log("Selected bar data:", data);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <MonthSelector
        onChange={(newMonth: string) => {
          setSearchParams((prevParams) => {
            const nextParams = new URLSearchParams(prevParams);
            nextParams.set("start", newMonth);
            return nextParams;
          });
        }}
        startDate={firstWorkout}
      />
      <div className="flex justify-between w-full font-semibold text-lg px-8 mt-4">
        <div>{workouts.statistics.exerciseTime}</div>
        <div>{workouts.statistics.calories} ccal</div>
        <div>{workouts.totalElements} workouts</div>
      </div>
      <div className="w-full mt-4 pr-2">
        <WorkoutBarChart
          payload={chartData}
          onBarClick={handleSelectBar}
        />
      </div>
      <div className="w-full mt-4 pr-2">
        <WorkoutDetail
          workouts={workouts.content}
          selectWorkout={handleSelectBar}
        />
      </div>
    </div>
  );
};

export async function loader(params: { request: Request }) {
  const url = new URL(params.request.url);
  const startOfPeriod = normalizeStartOfPeriod(url.searchParams.get("start"));
  const response = await fetch("/api/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timePeriod: "MONTH",
      startOfPeriod,
    }),
  });

  if (!response.ok) throw new Response("Not Found", { status: 404 });

  return response.json();
}

export default MonthPage;