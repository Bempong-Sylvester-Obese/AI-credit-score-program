import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';
import { ScrollProgress } from './components/navigation/ScrollProgress';
import './index.css';
import App from './App.tsx';

const rootEl = document.getElementById('root');

if (!rootEl) {
	throw new Error('Root element not found');
}

try {
	createRoot(rootEl).render(
		<StrictMode>
			<BrowserRouter>
				<ErrorBoundary>
					<AuthProvider>
						<ScrollProgress />
						<App />
					</AuthProvider>
				</ErrorBoundary>
			</BrowserRouter>
		</StrictMode>
	);
} catch (err) {
	// If React fails to mount entirely, show a visible error instead of a black void
	console.error('Fatal: React failed to mount', err);
	rootEl.innerHTML = `
		<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f0f0f;font-family:system-ui,sans-serif;color:white;text-align:center;padding:2rem">
			<div>
				<h1 style="font-size:1.5rem;margin-bottom:1rem;color:#ef4444">Failed to load application</h1>
				<p style="color:rgba(255,255,255,0.6);margin-bottom:1rem">Please try refreshing the page.</p>
				<button onclick="location.reload()" style="padding:0.5rem 1.5rem;background:#00B512;color:white;border:none;border-radius:0.5rem;cursor:pointer;font-size:0.875rem">
					Reload
				</button>
			</div>
		</div>
	`;
}
