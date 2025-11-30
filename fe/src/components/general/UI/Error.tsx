export default function Error({ title, message, onConfirm }) {
	return (
		<div>
			<h2>{title}</h2>
			<p>{message}</p>
			{onConfirm && (
				<div>
					<Button
						onClick={onConfirm}
					>
						Okay
					</Button>
				</div>
			)}
		</div>
	)
}
