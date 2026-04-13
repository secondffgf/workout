import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
	MdImageSearch,
	MdFavoriteBorder,
	MdOutlineAdminPanelSettings,
	MdOutlineBookmarkAdd,
	MdOutlineFlag,
	MdOutlineCalendarViewWeek,
	MdOutlineCalendarViewMonth
} from 'react-icons/md'
import { GiCalendarHalfYear } from "react-icons/gi"
import { PiCalendarSlash } from "react-icons/pi"
import { TiTickOutline } from "react-icons/ti"
import { GrOverview } from 'react-icons/gr'
import Button from '@/components/general/UI/Button'
import AdminPanelContent from '@/components/general/AdminPanelContent'
import { RiCloseFill } from 'react-icons/ri'

export default function NavigationSidebar() {
  const [isOpenPanel, setIsOpenPanel] = useState(false)

  const openPanel = () => {
    setIsOpenPanel(true);
  }

  return (
    <div className="relative flex h-full min-h-0 flex-shrink-0 items-center">
    <nav className="z-10 mr-4 flex h-[95vh] w-fit flex-shrink-0 flex-col rounded-r-xl bg-sky-600 px-6 py-8 text-sky-50">
		  <h2 className="font-bold uppercase text-xl text-sky-200 flex items-center space-x-2">
				<GrOverview />
				<span>Dashboard</span>
			</h2>
			<div className="flex flex-col mb-6 pl-6 gap-2 pt-4 text-lg text-white">
				<NavLink
					to="/week"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdOutlineCalendarViewWeek className="text-white hover:text-sky-200" />
							<span className="text-white hover:text-sky-200">Week</span>
							{isActive ? <TiTickOutline className="text-white hover:text-sky-200" /> : null}
						</>
					)}
				/>
				<NavLink
					to="/month"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdOutlineCalendarViewMonth className="text-white hover:text-sky-200" />
							<span className="text-white hover:text-sky-200">Month</span>
							{isActive ? <TiTickOutline className="text-white hover:text-sky-200" /> : null}
						</>
					)}
				/>
				<NavLink
					to="/year"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<GiCalendarHalfYear className="text-white hover:text-sky-200" />
							<span className="text-white hover:text-sky-200">Year</span>
							{isActive ? <TiTickOutline className="text-white hover:text-sky-200" /> : null}
						</>
					)}
				/>
				<NavLink
					to="/all"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<PiCalendarSlash className="text-red-500" />
							<span className="text-red-500">All</span>
							{isActive ? <TiTickOutline className="text-red-500" /> : null}
						</>
					)}
				/>
			</div>
			<hr />
			<div className="mt-4 mb-6 flex flex-col text-lg text-white w-full gap-2 pt-2 min-w-[200px]">
				<NavLink
					to="/search"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdImageSearch className="text-white hover:text-sky-200" />
							<span className="text-white hover:text-sky-200">Search & Compare</span>
							{isActive ? <TiTickOutline className="text-white hover:text-sky-200" /> : null}
						</>
					)}
				/>
				<NavLink
					to="/favorite"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdFavoriteBorder className="text-white hover:text-sky-200" />
							<span className="text-white hover:text-sky-200">Favorite Workouts</span>
							{isActive ? <TiTickOutline className="text-white hover:text-sky-200" /> : null}
						</>
					)}
				/>
				<NavLink
					to="/flagged"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdOutlineFlag className="text-white hover:text-sky-200" />
							<span className="text-white hover:text-sky-200">Flagged Workouts</span>
							{isActive ? <TiTickOutline className="text-white hover:text-sky-200" /> : null}
						</>
					)}
				/>
				<NavLink
					to="/add"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdOutlineBookmarkAdd className="text-white hover:text-sky-200" />
							<span className="text-white hover:text-sky-200">Add Workout</span>
							{isActive ? <TiTickOutline className="text-white hover:text-sky-200" /> : null}
						</>
					)}
				/>
			</div>
			<hr />
			<div className="mt-4 flex justify-center mb-4">
				<Button
					onClick={openPanel}
					dark
				>
					<MdOutlineAdminPanelSettings className="text-white hover:text-sky-200" />&nbsp;
					<span className="text-white hover:text-sky-200">Admin Panel</span>
				</Button>
			</div>
    </nav>
    {isOpenPanel ? (
      <>
        <button
          type="button"
          aria-label="Close admin panel"
          className="fixed inset-0 z-20 bg-black/40"
          onClick={() => setIsOpenPanel(false)}
        />
        <aside
          className="fixed inset-y-0 right-0 z-30 flex w-1/5 min-w-0 flex-col border-l border-sky-200 bg-sky-50 text-sky-900 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-sky-200 px-4 py-3">
            <h3 className="text-lg font-semibold">Admin Panel</h3>
            <button
              type="button"
              className="rounded px-2 py-1 text-2xl leading-none text-sky-700 hover:bg-sky-200/60"
              aria-label="Close"
              onClick={() => setIsOpenPanel(false)}
            >
			  <RiCloseFill className="h-6 w-6" aria-hidden />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <AdminPanelContent />
          </div>
        </aside>
      </>
    ) : null}
    </div>
  );
};
