import AboutUs from './AboutUs';
import Header from './Header';
import Partners from './Partners';
import Services from './Services';
import Trustworthiness from './Trustworthiness';
import './index.css';

function Home() {
	return (
		<>
			<Header />
			<Partners />
			<AboutUs />
			<Trustworthiness />
			<Services />
		</>
	);
}

export default Home;
