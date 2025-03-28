import { Routes, Route, Link } from 'react-router-dom';

import { Home } from './views';
import './App.css';

function App() {
	return (
		<div>
			<nav>
				<Link to="/">Home</Link>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
