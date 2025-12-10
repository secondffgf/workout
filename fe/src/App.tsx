import { useState  } from 'react'
import ProjectSidebar from './components/ProjectSidebar'
import NewWorkout from './pages/NewWorkout'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import WeekContent from './pages/WeekContent'
import MonthContent from './pages/MonthContent'
import YearContent from './pages/YearContent'
import AllContent from './pages/AllContent'
import WorkoutCalendar from './components/general/WorkoutCalendar'
import SearchAndCompare from './pages/SearchAndCompare'
import Favorite from './pages/Favorite'
import CaloriesEstimateChart from './components/general/UI/chart/CaloriesEstimateChart'
import { CalendarContextProvider } from '@/context/CalendarContextProvider'
import { FirstWorkoutContextProvider } from '@/context/FirstWorkoutContextProvider'
import { CurrentPeriodContextProvider } from '@/context/CurrentPeriodContextProvider'
import ProgressBar from 'components/general/UI/chart/ProgressBar'
import Flagged from './pages/Flagged'

function App() {
  return (
		<main className="h-[98vh] py-8 flex">
			<CalendarContextProvider>
		  <CurrentPeriodContextProvider>
			<FirstWorkoutContextProvider>
				<Router>
					<ProjectSidebar />
					<Routes>
						<Route path="/" element={<Navigate to="/month" />} />
						<Route path="/week" element={<WeekContent />} />
						<Route path="/month" element={<MonthContent />} />
						<Route path="/year" element={<YearContent />} />
						<Route path="/add" element={<NewWorkout />} />
						<Route path="/all" element={<AllContent />} />
						<Route path="/search" element={<SearchAndCompare />} />
						<Route path="/favorite" element={<Favorite />} />
						<Route path="/flagged" element={<Flagged />} />
					</Routes>
				</Router>
				<div className="ml-8">
					<WorkoutCalendar />
					<CaloriesEstimateChart />
					<ProgressBar />
				</div>
			</FirstWorkoutContextProvider>
			</CurrentPeriodContextProvider>
			</CalendarContextProvider>
		</main>
  )
}

export default App
