import { sveltekit } from '@sveltejs/kit/vite';
import { kitbook } from 'kitbook/plugins/vite';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    kitbook({ routes: 'src/routes' }),
    sveltekit(),
  ],
  define: {
    'import.meta.vitest': false,
  },
  build: {
    target: 'es2015', //es6
  },
  test: {
    globals: true,
    includeSource: ['src/**/*.ts'],
  },
};

export default config;