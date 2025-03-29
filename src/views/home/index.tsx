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

			<div className="pop-up fixed inset-0 bg-white/30">
				<main className="flex items-center justify-center h-full w-full">
					<div className="border border-[#29ad8d] rounded-[20px] p-8">
						<h2>Calculate Your Score</h2>
					</div>
				</main>
			</div>
		</>
	);
}

export default Home;
