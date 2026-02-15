import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		minify: 'esbuild',
		target: 'es2022',
		cssMinify: 'esbuild',
		sourcemap: false,
		reportCompressedSize: false,
		chunkSizeWarningLimit: 600,
	},
	optimizeDeps: {
		include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'firebase/app', 'firebase/auth'],
	},
	server: {
		hmr: {
			overlay: true,
		},
	},
});
