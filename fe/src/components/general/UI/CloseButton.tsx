export default function CloseButton({ onClick }) {
	return (
		<button
			onClick={onClick}
			className="text-gray-500 hover:text-red-500 text-xl font-bold focus:outline-none rounded-full p-2 cursor-pointer ml-auto"
		>
			&times;
		</button>
	);
}
