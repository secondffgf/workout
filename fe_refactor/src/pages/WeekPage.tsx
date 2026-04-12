import {
  formatWeekPeriodRange,
} from "@/utils/weekPeriodFormat";
import { useLoaderData, useSearchParams } from "react-router-dom";
import type { WorkoutData } from "@/types";
import { formatMonthlyChartData } from "@/utils/utils";
import WorkoutDetail from "@/components/general/WorkoutDetail";
import WorkoutBarChart from "@/components/general/UI/chart/WorkoutBarChart";
import WeekSelector from "@/components/dashboard/WeekSelector";
import { useContext } from "react";
import { FirstWorkoutContext } from "@/context/FirstWorkoutContextProvider";

const WeekPage = () => {
  const firstWorkoutState:
  {
    state:{
      firstWorkout: string;
      error: string | null
    }
  } | undefined = useContext(FirstWorkoutContext);
  const firstWorkout = firstWorkoutState?.state.firstWorkout || '';
  const [, setSearchParams] = useSearchParams();
  const workouts: WorkoutData = useLoaderData();

  const chartData = formatMonthlyChartData(workouts.content);

  const handleSelectBar = (data: any) => {
    console.log("Selected bar data:", data);
  };
  
  return (
    <div className="w-full flex flex-col items-center">
      <WeekSelector
        startDate={firstWorkout}
        onChange={(newWeek: string) => {
          setSearchParams((prevParams: URLSearchParams) => {
            const m = newWeek.match(/^\d{1,2}\.\d{1,2}(\.\d{2})?/);
            const nextParams = new URLSearchParams(prevParams);
            if (m) {
              nextParams.set("start", m[0]);
            } else {
              nextParams.set("start", '');
            }
            return nextParams;
          });
        }}
      />
      <div className="flex justify-evenly w-full font-semibold text-lg px-16 mt-4">
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
  )
};

export default WeekPage;

function dateFromDdMmY(match: string) {
  const parts = match.split(".");
  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);
    return new Date(2000 + year, month - 1, day);
  }
  if (parts.length === 2) {
    const [day, month] = parts.map(Number);
    const year = new Date().getFullYear();
    return new Date(year, month - 1, day);
  }
  return new Date();
}

const parseWeekAnchor = (startParam: string | null): Date => {
  if (!startParam) return new Date();
  const trimmed = startParam.trim();
  // trimmed can be `dd.MM - dd.MM` or `dd.MM.yy - dd.MM.yy`
  const m = trimmed.match(/^\d{1,2}\.\d{1,2}(\.\d{2})?/);
  if (m) {
    const startDate = dateFromDdMmY(m[0]);
    return startDate;
  }
  return new Date(trimmed);
}

export async function loader(params: { request: Request }) {
  const url = new URL(params.request.url);
  const startOfPeriod = formatWeekPeriodRange(
    parseWeekAnchor(url.searchParams.get("start")),
  );
  const response = await fetch("/api/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timePeriod: "WEEK",
      startOfPeriod,
    }),
  });

  if (!response.ok) throw new Response("Not Found", { status: 404 });

  return response.json();
}