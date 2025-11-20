import { Component, ReactNode, ErrorInfo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
				<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
					<Card className="p-8 max-w-2xl w-full">
						<div className="text-center mb-6">
							<h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong</h1>
							<p className="text-gray-600 mb-6">
								We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
							</p>
						</div>

						{import.meta.env.DEV && this.state.error && (
							<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
								<h2 className="font-semibold text-red-900 mb-2">Error Details (Development Only):</h2>
								<pre className="text-xs text-red-800 overflow-auto max-h-64">
									{this.state.error.toString()}
									{this.state.errorInfo?.componentStack}
								</pre>
							</div>
						)}

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button variant="primary" onClick={this.handleReset}>
								Try Again
							</Button>
							<Link to="/">
								<Button variant="outline-secondary">
									Go to Homepage
								</Button>
							</Link>
						</div>
					</Card>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

