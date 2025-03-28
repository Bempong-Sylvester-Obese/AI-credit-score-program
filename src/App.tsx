import { Link, Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import { Home } from './views';
import './App.css';

function App() {
	return (
		<div>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/">Credit Score</Link>
				<Link to="/">Loan Offers</Link>
				<Link to="/">AI Insights</Link>
				<Link to="/">Settings</Link>

				<Button>Sign In/ Log In</Button>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
