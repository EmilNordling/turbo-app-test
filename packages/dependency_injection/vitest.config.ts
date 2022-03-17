/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [
		react({
			babel: {
				parserOpts: {
					plugins: ['decorators-legacy'],
				},
			},
		}),
	],
	test: {
		environment: 'happy-dom',
	},
});
