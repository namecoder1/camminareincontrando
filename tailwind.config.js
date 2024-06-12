/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontFamily: {
			'poppins' : [ 'Poppins', 'sans-serif' ],
			'montserrat' : [ 'Montserrat', 'sans-serif' ]
		},
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

