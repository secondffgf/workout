import { useRef } from 'react'
import { CiImport } from 'react-icons/ci'
import axios from 'axios'
import Button from './Button'
import { BASE_URL_DEVELOPMENT } from '@/constants.js'

export default function FileUpload() {
	const fileInputRef = useRef(null)

	const handleButtonClick = () => {
		fileInputRef.current.click()
	}

	const handleFileChange = async (e) => {
		const file = e.target.files[0]

		if (!file) return

		const formData = new FormData()
		formData.append("file", file)

		try {
			const response = await axios.post(`${BASE_URL_DEVELOPMENT}/import/csv`, formData, {
				headers: {
					"Content-Type": "multipart/form-data"
				}
			})
			console.log("Upload success: ", respose.data)
		} catch (error) {
			console.log("Upload failed: ", error)
		}
	}

	return (
		<div>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept=".zip"
				className="hidden"
			/>

			<Button
				onClick={handleButtonClick}
			>
			  <CiImport />
				<span>Import</span>
			</Button>
		</div>
	)
}
