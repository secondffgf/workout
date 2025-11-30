import { useImperativeHandle, useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'

function Modal({ onOk, onCancel, children, ref }) {
	const dialog = useRef()
	const [isOpen, setIsOpen] = useState(false)

	useImperativeHandle(ref, () => {
		return {
			open: () => {
				setIsOpen(true)
				dialog.current.showModal()
			},
			close: () => {
				setIsOpen(false)
				dialog.current.close()
			}
		}
	})

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				e.preventDefault()
				onCancel()
		  } else if (e.key === 'Enter') {
				e.preventDefault()
		  	onOk()
		  }
		}

		dialog.current?.addEventListener('keydown', handleKeyDown)

		return () => {
			dialog.current?.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen])

	return createPortal(
		<dialog className="modal p-4 shadow-md bg-gray-100" ref={dialog}>
			{children}
			<form method="dialog" className="mt-4 flex gap-1 justify-end">
				<Button onClick={onOk}>OK</Button>
				<Button onClick={onCancel}>Cancel</Button>
			</form>
		</dialog>,
		document.getElementById('modal')
	)
}

export default Modal
