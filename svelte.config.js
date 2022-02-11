import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		defaults: {
			sourceMap: true,
			style: 'postcss',
		},
		postcss: true,
	}),

	disableDependencyReinclusion: ['svench'],
	kit: {
		package: {
			files: (filepath) => !(filepath.match(/(\.story|\.svench)/))
		},
		vite: {
			server: {
				hmr: {
					clientPort: process.env.HMR_HOST ? 443 : 3000,
					host: process.env.HMR_HOST ? process.env.HMR_HOST.substring("https://".length) : "localhost"
				}
			}
		}
	}
};

export default config;
