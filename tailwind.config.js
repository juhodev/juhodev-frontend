module.exports = {
	purge: {
		enabled: false,
		content: ['./**/*.html', './src/**/*.tsx'],
	},
	plugins: [require('@tailwindcss/ui')],
	theme: {
		fontFamily: {
			body: 'Balsamiq Sans',
		},
		extend: {
			spacing: {
				102: '30rem',
			},
		},
		extend: {
			colors: {
				discord: '#7289da',
			},
		},
	},
};
