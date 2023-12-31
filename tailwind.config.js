import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			stone: colors.stone,
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
				},
				status: {
					success: 'rgb(var(--theme-status-success) / <alpha-value>)',
					error: 'rgb(var(--theme-status-error) / <alpha-value>)'
				}
			}
		},
		extend: {}
	},
	plugins: []
};
