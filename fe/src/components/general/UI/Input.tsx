import { forwardRef } from 'react'

const Input = forwardRef(function Input({label, labelColor, textarea, width, ...props}, ref) {
	let classes="p-1 pl-3 border-b-2 rounded-sm border-sky-300 bg-sky-200 text-stone-600 focus:outline-none focus:border-sky-600 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"

	if (width) {
		classes += " " + width
	} else {
		classes += " w-full"
	}

	let labelClasses = "text-sm font-semibold "

	if (labelColor) {
		labelClasses += labelColor
	} else {
		labelClasses += "text-stone-500"
	}

	return (
		<div className="flex flex-col gap-1 my-4">
			<label htmlFor={props.name} className={labelClasses}>{label}:</label>
			{textarea ? <textarea
				 ref={ref}
				 id={props.name}
				 className={classes}
				 {...props}>
			 </textarea>
			 : <input
					  ref={ref}
						id={props.name}
						className={classes}
						autoComplete="off"
						{...props}
					/>
			}
		</div>
	)
})

export default Input
