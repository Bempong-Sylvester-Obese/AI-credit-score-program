import AboutUs from './AboutUs';
import Footer from './Footer';
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
			<Footer />
		</>
	);
}

export default Home;
