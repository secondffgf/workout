import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import WorkoutDetail from "@/components/general/WorkoutDetail";

const Flagged = () => {
  const flagged = useLoaderData() as any[];
  return (
    <div className="mx-16">
      <div className="w-full mt-14 pr-2">
        <WorkoutDetail
          workouts={flagged}
          showCheckbox
          selectWorkout={() => {}}
          refreshWorkouts={() => {}}
        />
      </div>
    </div>
  );
};

export default Flagged;

export async function loader(
  _args: LoaderFunctionArgs,
): Promise<any[]> {
  const response = await fetch("/api/flagged", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Response("Not Found", { status: 404 });
  return (await response.json()) as any[];
}