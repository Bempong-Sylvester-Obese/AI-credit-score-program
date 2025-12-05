import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ErrorBoundary>
				<AuthProvider>
					<App />
				</AuthProvider>
			</ErrorBoundary>
		</BrowserRouter>
	</StrictMode>
);
