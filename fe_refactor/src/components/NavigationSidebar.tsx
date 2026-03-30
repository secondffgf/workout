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
			<div className="flex flex-col mb-16 pl-6 gap-2 pt-2 text-lg text-white">
				<NavLink
					to="/week"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdOutlineCalendarViewWeek />
							<span>Week</span>
							{isActive ? <TiTickOutline /> : null}
						</>
					)}
				/>
				<NavLink
					to="/month"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdOutlineCalendarViewMonth />
							<span>Month</span>
							{isActive ? <TiTickOutline /> : null}
						</>
					)}
				/>
				<NavLink
					to="/year"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<GiCalendarHalfYear />
							<span>Year</span>
							{isActive ? <TiTickOutline /> : null}
						</>
					)}
				/>
				<NavLink
					to="/all"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<PiCalendarSlash />
							<span>All</span>
							{isActive ? <TiTickOutline /> : null}
						</>
					)}
				/>
			</div>
			<hr />
			<div className="mt-4 mb-16 flex flex-col text-lg text-white w-full gap-2 pt-2 min-w-[200px]">
				<NavLink
					to="/search"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdImageSearch />
							<span>Search & Compare</span>
							{isActive ? <TiTickOutline /> : null}
						</>
					)}
				/>
				<NavLink
					to="/favorite"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdFavoriteBorder />
							<span>Favorite Workouts</span>
							{isActive ? <TiTickOutline /> : null}
						</>
					)}
				/>
				<NavLink
					to="/flagged"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdOutlineFlag />
							<span>Flagged Workouts</span>
							{isActive ? <TiTickOutline /> : null}
						</>
					)}
				/>
				<NavLink
					to="/add"
					className="flex items-center space-x-2"
					children={({isActive}) => (
						<>
							<MdOutlineBookmarkAdd />
							<span>Add Workout</span>
							{isActive ? <TiTickOutline /> : null}
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
					<MdOutlineAdminPanelSettings />&nbsp;
					Admin Panel
				</Button>
			</div>
    </nav>
  );
};
