import { useRef, useState } from 'react'
import axios from 'axios'
import Button from './general/UI/Button'
import { GrOverview } from "react-icons/gr"
import {
	MdOutlineCalendarViewWeek,
	MdOutlineCalendarViewMonth
} from 'react-icons/md'
import { GiCalendarHalfYear } from "react-icons/gi"
import { PiCalendarSlash } from "react-icons/pi"
import {
	CiExport,
	CiImport
} from 'react-icons/ci'
import { TiTickOutline } from "react-icons/ti"
import FileUpload from './general/UI/FileUpload'
import { NavLink } from 'react-router-dom'
import {
	MdImageSearch,
	MdFavoriteBorder,
	MdOutlineAdminPanelSettings,
	MdOutlineBookmarkAdd,
	MdOutlineFlag
 } from "react-icons/md"
import RightSidePanel from './general/RightSidePanel'
import Modal from 'components/general/UI/Modal'
import Input from 'components/general/UI/Input'
import { BASE_URL_DEVELOPMENT } from '@/constants.js'

export default function ProjectSidebar() {
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
		<>
		<Modal
			ref={modal}
			onOk={() => modal.current.close()}
			onCancel={() => modal.current.close()}
		>
		  <div>
			<div className="m-4">
				<Input
					name="subscribe-email"
					label="E-mail"
					width="w-1/4"
					ref={subscribeEmail}
				/>
			</div>
		  </div>
		</Modal>
		<RightSidePanel
		  panelContent={
			<div className="flex flex-col gap-6 items-center mt-4">
				<Button
					onClick={showSubscribeModal}
				>
					Subscribe
				</Button>
				<div className='flex gap-4 w-full'>
				<Button
					onClick={exportWorkouts}
				>
					<CiExport />
					<span>Export</span>
				</Button>
				<FileUpload>
					<CiImport />
					<span>Import</span>
				</FileUpload>
				</div>
			</div>
		  }
		  width="w-72"
		  open={isOpenPanel}
		  setOpen={setIsOpenPanel}
		/>
		<div className="w-fit px-6 py-8 bg-sky-600 text-sky-50 rounded-r-xl flex flex-col justify-between mr-4">
			<div className="px-2 flex-shrink-0">
				<h2 className="font-bold uppercase md:text-xl text-sky-200 flex items-center space-x-2">
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
						className="flex space-x-2 items-center"
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
						className="flex space-x-2 items-center"
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
						className="flex space-x-2 items-center"
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
						className="flex space-x-2 items-center"
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
			</div>
		</div>
		</>
	)
}
