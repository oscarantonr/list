/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {     colors: {
			whatsappGreen: '#e1ffc7', 
			mintGreen: "#BEE9E8",
			moonstone: "#62B6CB",
			indigoDye: "#1B4965",
			columbiaBlue: "#CAE9FF",
			pictonBlue: "#5FA8D3",
			hover_mintGreen: "#89C5C4",
			hover_moonstone: "#5197A6"
		  },
		  width: {
			'fit': 'fit-content',
		  },
		  height: {
			'fit': 'fit-content', 
		  }
		},
	},
	plugins: [],
}
