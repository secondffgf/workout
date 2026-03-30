import WorkoutPieChart from "@/components/general/UI/chart/WorkoutPieChart";
import WorkoutDetail from "@/components/general/WorkoutDetail";
import useHttp from "@/hooks/useHttp";
import { useState } from "react";

const favoritesConfig = {}

const Favorite = () => {
  const [rightWorkout, setRightWorkout] = useState(null)
  const [leftWorkout, setLeftWorkout] = useState(null)
  const {
    data: favorites,
    sendRequest: refreshFavorites
  } = useHttp(
    '/api/favorites',
    favoritesConfig,
    []
  )

  const selectWorkout = (workout: any, checked: boolean) => {
    if (checked) {
      setRightWorkout(workout)
    } else {
      setLeftWorkout(workout)
    }
  }

  return (
    <div>
      <div className="w-full mt-14 pr-2">
        <WorkoutDetail
          workouts={favorites}
          showCheckbox
          selectWorkout={selectWorkout}
          refreshFavorites={refreshFavorites}
        />
      </div>
      <div className="w-full flex mt-8">
        <div className="flex-1 flex items-center justify-center bg-blue-100">
          <WorkoutPieChart
            workout={leftWorkout}
          />
        </div>
        <div className="w-px bg-gray-400"></div>
        <div className="flex-1 flex items-center justify-center bg-green-100">
          <WorkoutPieChart
            workout={rightWorkout}
          />
        </div>
      </div>
    </div>
  );
};

export default Favorite;