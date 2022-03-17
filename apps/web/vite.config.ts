import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import Inspect from 'vite-plugin-inspect';
import Icons from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		sourcemap: true,
	},
	plugins: [
		react({
			babel: {
				parserOpts: {
					plugins: ['decorators-legacy'],
				},
			},
		}),

		splitVendorChunkPlugin(),

		// Plugin for resolving TypeScript paths.
		// https://github.com/aleclarson/vite-tsconfig-paths#readme
		tsconfigPaths(),

		// Plugin for universally on-demand svg icons. Powered by https://icones.js.org/
		// https://github.com/antfu/unplugin-icons
		Icons({
			// experimental
			autoInstall: true,
			compiler: 'jsx',
			jsx: 'react',
		}),

		// Plugin to inspect intermediate state of Vite plugins.
		Inspect(),
	],
});
