import { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
			errorInfo: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
		this.setState({
			error,
			errorInfo,
		});
	}

	handleReset = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render() {
		if (this.state.hasError) {
			return (
				<div style={{
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#0f0f0f',
					padding: '1rem',
					fontFamily: 'system-ui, sans-serif',
				}}>
					<div style={{
						maxWidth: '32rem',
						width: '100%',
						backgroundColor: '#1a1a2e',
						borderRadius: '0.75rem',
						padding: '2rem',
						border: '1px solid rgba(255,255,255,0.1)',
					}}>
						<div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
							<h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '1rem' }}>
								Something went wrong
							</h1>
							<p style={{ color: '#9ca3af', marginBottom: '1.5rem', lineHeight: 1.6 }}>
								We're sorry, but something unexpected happened. Please try refreshing the page.
							</p>
						</div>

						{import.meta.env.DEV && this.state.error && (
							<div style={{
								marginBottom: '1.5rem',
								padding: '1rem',
								backgroundColor: 'rgba(239, 68, 68, 0.1)',
								border: '1px solid rgba(239, 68, 68, 0.3)',
								borderRadius: '0.5rem',
							}}>
								<h2 style={{ fontWeight: 600, color: '#fca5a5', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
									Error Details (Development Only):
								</h2>
								<pre style={{
									fontSize: '0.75rem',
									color: '#fca5a5',
									overflow: 'auto',
									maxHeight: '16rem',
									whiteSpace: 'pre-wrap',
									wordBreak: 'break-word',
								}}>
									{this.state.error.toString()}
									{this.state.errorInfo?.componentStack}
								</pre>
							</div>
						)}

						<div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
							<button
								onClick={this.handleReset}
								style={{
									padding: '0.625rem 1.25rem',
									backgroundColor: '#00B512',
									color: 'white',
									border: 'none',
									borderRadius: '0.5rem',
									cursor: 'pointer',
									fontWeight: 500,
									fontSize: '0.875rem',
								}}
							>
								Try Again
							</button>
							<a
								href="/"
								style={{
									padding: '0.625rem 1.25rem',
									backgroundColor: 'transparent',
									color: '#9ca3af',
									border: '1px solid rgba(255,255,255,0.2)',
									borderRadius: '0.5rem',
									cursor: 'pointer',
									fontWeight: 500,
									fontSize: '0.875rem',
									textDecoration: 'none',
									display: 'inline-flex',
									alignItems: 'center',
								}}
							>
								Go to Homepage
							</a>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
