import AboutUs from './AboutUs';
import Footer from './Footer';
import Header from './Header';
import Partners from './Partners';
import Services from './Services';
import Trustworthiness from './Trustworthiness';
import { Quote } from '@/components/Quote';

function Home() {
	return (
		<>
			<Header />
			<Partners />
			<AboutUs />
			<Quote
				text="I had no formal credit history, but Neural Cash analysed my mobile money transactions and gave me a score that helped me access my first loan."
				author="Ama K."
				role="Early Adopter, Accra"
			/>
			<Trustworthiness />
			<Services />
			<Footer />
		</>
	);
}

export default Home;
