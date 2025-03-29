import { Link, Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { Home } from './views';
import './App.css';

function App() {
	return (
		<>
			<nav className="main-navigation absolute left-0 right-0 text-center space-x-5 top-6">
				<Link to="/">Home</Link>
				<Link to="/">Credit Score</Link>
				<Link to="/">Loan Offers</Link>
				<Link to="/">AI Insights</Link>
				<Link to="/">Settings</Link>

				<Button variant="outline" className="ml-20">
					Sign In/ Log In
				</Button>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
