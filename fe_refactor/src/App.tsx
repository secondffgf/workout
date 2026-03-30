import { Outlet } from 'react-router-dom';
import NavigationSidebar from './components/NavigationSidebar';
import WorkoutCalendar from './components/WorkoutCalendar';
import CaloriesEstimateChart from './components/CaloriesEstimateChart';
import ProgressBar from '@/components/ProgressBar'
import { CalendarContextProvider } from '@/context/CalendarContextProvider';
import { FirstWorkoutContextProvider } from '@/context/FirstWorkoutContextProvider';
import { CurrentPeriodContextProvider } from '@/context/CurrentPeriodContextProvider';
import Badge from '@/components/general/Badge';

function App() {
  return (
    <main className="py-4 flex w-full h-[100vh]">
		<CurrentPeriodContextProvider>
		<FirstWorkoutContextProvider>
		<CalendarContextProvider>
			<div className="flex-shrink-0 flex items-center">
				<NavigationSidebar />
			</div>
			<div className="flex-1 h-auto w-[40rem] relative mr-4">
				<Outlet />
				<div className="absolute top-0 right-6">
					<Badge />
				</div>
			</div>
			<div className="flex-1">
				<WorkoutCalendar />
				<CaloriesEstimateChart />
				<ProgressBar />
			</div>
		</CalendarContextProvider>
		</FirstWorkoutContextProvider>
		</CurrentPeriodContextProvider>
    </main>
  );
}
	
export default App;
