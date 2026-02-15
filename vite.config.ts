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
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('node_modules')) {
						// Match only the core react packages, not every package with "react" in its name
						if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router')) {
							return 'vendor-react';
						}
						if (
							id.includes('framer-motion') ||
							id.includes('motion-dom') ||
							id.includes('motion-utils') ||
							id.includes('tslib')
						) {
							return 'vendor-animations';
						}
						if (id.includes('recharts')) {
							return 'vendor-charts';
						}
						if (id.includes('firebase')) {
							return 'vendor-firebase';
						}
					}
				},
			},
		},
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
