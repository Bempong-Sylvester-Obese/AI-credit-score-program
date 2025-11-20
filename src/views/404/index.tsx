import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const NotFound = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<Card className="p-12 max-w-md w-full text-center">
				<div className="mb-8">
					<h1 className="text-9xl font-bold text-gray-300">404</h1>
				</div>
				<h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
				<p className="text-gray-600 mb-8">
					The page you're looking for doesn't exist or has been moved.
				</p>
				<div className="space-y-4">
					<Link to="/">
						<Button variant="primary" className="w-full">
							Go to Homepage
						</Button>
					</Link>
					<Link to="/generate-credit">
						<Button variant="outline-secondary" className="w-full">
							Generate Credit Score
						</Button>
					</Link>
				</div>
			</Card>
		</div>
	);
};

export default NotFound;

