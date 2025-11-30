export default function Button({selected, dark, children, ...props}) {
  let style = "px-4 py-2 text-xs md:text-base rounded-md hover:text-sky-200 cursor-pointer flex items-center space-x-2" 
	if (dark) {
		style += " bg-sky-700 hover:bg-sky-800"
	} else if (selected) {
		style += " bg-sky-700 hover:bg-sky-900 text-sky-200"
	} else {
		style += " bg-sky-300 hover:bg-sky-500"
	}

	return (
		<button className={style} {...props}>
			{children}
		</button>
	)
}
