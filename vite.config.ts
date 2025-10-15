import path from 'path';
import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					'vendor-react': ['react', 'react-dom', 'react-router-dom'],
					'vendor-ui': ['@radix-ui/react-dropdown-menu', '@radix-ui/react-slot'],
					'vendor-charts': ['recharts'],
				},
			},
		},
		chunkSizeWarningLimit: 600,
	},
});
