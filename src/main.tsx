import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';
import { ScrollProgress } from './components/navigation/ScrollProgress';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
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
