import { useContext, useState } from "react";
import { FirstWorkoutContext } from "@/context/FirstWorkoutContextProvider";
import MonthSelector from "../components/dashboard/MonthSelector";

const defaultOption = "Select Month";

const MonthPage = () => {
  const firstWorkoutState:
  { state: { firstWorkout: string; error: string | null } } | undefined = useContext(FirstWorkoutContext) 
  const firstWorkout = firstWorkoutState?.state.firstWorkout || '';
  const [ selectedMonth, setSelectedMonth ] = useState<string>(defaultOption);

  return <div>
    <MonthSelector
      onChange={(newMonth) => setSelectedMonth(newMonth)}
      startDate={firstWorkout}
    />
    <span>{selectedMonth}</span>
  </div>;
};

export async function loader(params: { request: Request }) {
  console.log(params);
  const url = new URL(params.request.url);
  let startOfPeriod = url.searchParams.get("start");
  if (!startOfPeriod) {
    const now = new Date();
    const monthShort = now.toLocaleString('en-US', { month: 'short' });
    const year = now.getFullYear();
    startOfPeriod = `${year}-${monthShort}`;
  }
  const response = await fetch("/api/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      period: "MONTH",
      startOfPeriod,
    }),
  });

  if (!response.ok) throw new Response("Not Found", { status: 404 });

  return response.json();
}

export default MonthPage;