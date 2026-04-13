import YearSelector from "@/components/dashboard/YearSelector";
import { useContext, useState } from "react";
import { FirstWorkoutContext } from "@/context/FirstWorkoutContextProvider";
import { useLoaderData, useSearchParams } from "react-router-dom";
import type { YearlyWorkoutData } from "@/types";
import WorkoutBarChart from "@/components/general/UI/chart/WorkoutBarChart";
import { formatYearlyChartData } from "@/utils/utils";

const ticks = [0, 90, 180, 270, 360, 450, 540, 630, 720];
const caloriesTicks = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];

function minutesToHHMM(totalMinutes: number) {
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

const YearPage = () => {
  const firstWorkoutState:
  {
    state:{
      firstWorkout: string;
      error: string | null
    }
  } | undefined = useContext(FirstWorkoutContext);
  const firstWorkout = firstWorkoutState?.state.firstWorkout || '';
  const [searchParams, setSearchParams] = useSearchParams();
  const workouts: YearlyWorkoutData = useLoaderData();
  const [_selectedBar, setSelectedBar] = useState<any | null>(null);

  const chartData = formatYearlyChartData(workouts.content);

  return (
    <div className="w-full flex flex-col items-center">
      <YearSelector
        value={String(parseYearAnchor(searchParams.get("start")))}
        startDate={firstWorkout}
        onChange={(newYear: string) => {
          setSearchParams((prevParams: URLSearchParams) => {
            const nextParams = new URLSearchParams(prevParams);
            nextParams.set("start", newYear);
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
          onBarClick={setSelectedBar}
          isYear
          domain={[0, 720]}
          ticks={ticks}
          tickFormatter={(value: number) => minutesToHHMM(value)}
        />
      </div>
      <div className="w-full mt-4 pr-2">
        <WorkoutBarChart
          payload={chartData}
          onBarClick={setSelectedBar}
          isYear
          legendFormatter={(_value: string) => 'Calories'}
          fillColor="#f54a00"
          domain={[0, 8000]}
          ticks={caloriesTicks}
          dataKey="calories"
        />
      </div>
    </div>
  );
};

export default YearPage;

const parseYearAnchor = (startParam: string | null): number => {
  if (!startParam) return new Date().getFullYear();
  const trimmed = startParam.trim();
  // trimmed can be `yyyy`
  const m = trimmed.match(/^\d{4}/);
  if (m) {
    return parseInt(m[0]);
  }
  return new Date().getFullYear();
}

export async function loader(params: { request: Request }) {
  const url = new URL(params.request.url);
  const startOfPeriod = parseYearAnchor(url.searchParams.get("start"));
  const response = await fetch("/api/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      timePeriod: "YEAR",
      startOfPeriod,
    }),
  });

  if (!response.ok) throw new Response("Not Found", { status: 404 });

  return response.json();
}