/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dbfh: {
					bglight: '#426FBB',
					bgmid: '#30518B',
					bgdark: '#253B9D',
					bgdarker: '#24528f',
					accent: '#56B4B6',
					headlight: '#3874CB',
					headdark: '#F7CC58',
					text: '#454545'
				}
			}
		}
	},
	plugins: []
};
