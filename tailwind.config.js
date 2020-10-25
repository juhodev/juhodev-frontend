module.exports = {
	purge: ['./**/*.html'],
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
