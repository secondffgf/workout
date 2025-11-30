module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	safelist: [
		{
			pattern: /bg-(orange|green)-(100|200|300|400|500|600|700|800|900)/,
		},
	]
  theme: {
		extend: {
			screens: {
				'3xl': '1920px'
			}
		}
  }
}

