import path from 'path';
import { fileURLToPath } from 'url';

// note: Kit apps are type:module, so Node's __dirname is not available
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('vite').UserConfig} */
const vite = {
  server: {
    // host: '0.0.0.0',
    hmr: {
      clientPort: process.env.HMR_HOST ? 443 : 4242,
      host: process.env.HMR_HOST ? process.env.HMR_HOST.substring("https://".length) : "localhost"
    }
  },
  resolve: {
    alias: {
      $app: path.resolve(__dirname, '.svelte-kit/dev/runtime/app'),
      $lib: path.resolve(__dirname, 'src/lib'),
    }
  }
}

export default { vite };