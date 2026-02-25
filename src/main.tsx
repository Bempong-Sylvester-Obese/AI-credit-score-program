import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';
import { ScrollProgress } from './components/navigation/ScrollProgress';
import { logger } from '@/lib/logger';
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
	logger.error('Fatal: React failed to mount', err);
	rootEl.textContent = '';
	const wrapper = document.createElement('div');
	wrapper.style.cssText = 'min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f0f0f;font-family:system-ui,sans-serif;color:white;text-align:center;padding:2rem';
	const inner = document.createElement('div');
	const h1 = document.createElement('h1');
	h1.style.cssText = 'font-size:1.5rem;margin-bottom:1rem;color:#ef4444';
	h1.textContent = 'Failed to load application';
	const p = document.createElement('p');
	p.style.cssText = 'color:rgba(255,255,255,0.6);margin-bottom:1rem';
	p.textContent = 'Please try refreshing the page.';
	const btn = document.createElement('button');
	btn.style.cssText = 'padding:0.5rem 1.5rem;background:#00B512;color:white;border:none;border-radius:0.5rem;cursor:pointer;font-size:0.875rem';
	btn.textContent = 'Reload';
	btn.addEventListener('click', () => location.reload());
	inner.append(h1, p, btn);
	wrapper.appendChild(inner);
	rootEl.appendChild(wrapper);
}
