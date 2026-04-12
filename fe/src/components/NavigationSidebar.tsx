import axios from 'axios'
import { useRef, useState } from 'react'
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
import { BASE_URL_DEVELOPMENT } from '@/constants.js'
import { GrOverview } from 'react-icons/gr'
import Button from '@/components/general/UI/Button'

export default function NavigationSidebar() {
  const [isOpenPanel, setIsOpenPanel] = useState(false)
  const modal = useRef({})
  const subscribeEmail = useRef({})

  const exportWorkouts = async () => {
    const response = await axios.get(`${BASE_URL_DEVELOPMENT}/export/csv`, {
        responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'workouts.zip')
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  const openPanel = () => {
    setIsOpenPanel(true);
  }

  const showSubscribeModal = () => {
    modal.current.open()
  }

  return (
    <nav className="w-fit px-6 py-8 bg-sky-600 text-sky-50 rounded-r-xl flex flex-col my-auto mr-4 h-[90vh] z-10">
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
							<GiCalendarHalfYear className="text-red-500" />
							<span className="text-red-500">Year</span>
							{isActive ? <TiTickOutline className="text-red-500" /> : null}
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
							<MdImageSearch className="text-red-500" />
							<span className="text-red-500">Search & Compare</span>
							{isActive ? <TiTickOutline className="text-red-500" /> : null}
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
					<MdOutlineAdminPanelSettings className="text-red-500" />&nbsp;
					<span className="text-red-500">Admin Panel</span>
				</Button>
			</div>
    </nav>
  );
};
