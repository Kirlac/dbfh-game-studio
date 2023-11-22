const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			slate: colors.slate,
			red: colors.red,
			green: colors.green,
			theme: {
				primary: {
					light: 'rgb(var(--theme-primary-light) / <alpha-value>)',
					dark: 'rgb(var(--theme-primary-dark) / <alpha-value>)'
				},
				secondary: {
					light: 'rgb(var(--theme-secondary-light) / <alpha-value>)',
					dark: 'rgb(var(--theme-secondary-dark) / <alpha-value>)'
				},
				accent: {
					light: 'rgb(var(--theme-accent-light) / <alpha-value>)',
					dark: 'rgb(var(--theme-accent-dark) / <alpha-value>)'
				},
				neutral: {
					light: 'rgb(var(--theme-neutral-light) / <alpha-value>)',
					dark: 'rgb(var(--theme-neutral-dark) / <alpha-value>)'
				}
			}
		},
		extend: {}
	},
	plugins: []
};
