import YearSelector from "@/components/dashboard/YearSelector";
import { Tabs } from "antd";
import { useContext, useMemo, useState } from "react";
import { FirstWorkoutContext } from "@/context/FirstWorkoutContextProvider";
import { useLoaderData, useSearchParams } from "react-router-dom";
import type { YearlyWorkoutData } from "@/types";
import WorkoutBarChart from "@/components/general/UI/chart/WorkoutBarChart";
import { formatYearlyChartData } from "@/utils/utils";

const ticks = [0, 90, 180, 270, 360, 450, 540, 630, 720];
const caloriesTicks = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
const trainingsTicks = [5, 10, 15, 20, 25, 30];
const trainingLoadTicks = [15, 20, 25, 30, 35, 40, 45, 50, 55];

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

  const chartTabs = useMemo(
    () => [
    {
      key: "volume",
      label: "Time & calories",
      children: (
        <div className="flex w-full flex-col gap-4 pt-2">
          <div className="w-full pr-2">
            <WorkoutBarChart
              payload={chartData}
              onBarClick={setSelectedBar}
              isYear
              domain={[0, 720]}
              ticks={ticks}
              tickFormatter={(value: number) => minutesToHHMM(value)}
            />
          </div>
          <div className="w-full pr-2">
            <WorkoutBarChart
              payload={chartData}
              onBarClick={setSelectedBar}
              isYear
              legendFormatter={(_value: string) => "Calories"}
              fillColor="#f54a00"
              domain={[0, 8000]}
              ticks={caloriesTicks}
              dataKey="calories"
            />
          </div>
        </div>
      ),
    },
    {
      key: "sessions",
      label: "Sessions & load",
      children: (
        <div className="flex w-full flex-col gap-4 pt-2">
          <div className="w-full pr-2">
            <WorkoutBarChart
              payload={chartData}
              onBarClick={setSelectedBar}
              isYear
              legendFormatter={(_value: string) => "Workouts count"}
              fillColor="#82ca9d"
              domain={[0, 30]}
              ticks={trainingsTicks}
              dataKey="trainings"
            />
          </div>
          <div className="w-full pr-2">
            <WorkoutBarChart
              payload={chartData}
              onBarClick={setSelectedBar}
              isYear
              legendFormatter={(_value: string) => "Training load"}
              fillColor="#f54a00"
              domain={[15, 55]}
              ticks={trainingLoadTicks}
              dataKey="trainingLoad"
            />
          </div>
        </div>
      ),
    },
  ],
    [chartData],
  );

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center">
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
      <div className="mt-4 flex min-h-0 w-full flex-1 flex-col px-2 pb-8">
        <Tabs
          defaultActiveKey="volume"
          items={chartTabs}
          className="min-h-0 w-full flex-1"
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