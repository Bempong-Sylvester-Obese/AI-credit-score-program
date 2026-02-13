import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Footer = () => {
	return (
		<footer className="py-[7rem] bg-[#F6F9F8]">
			<div className="nc-container">
				<div className="bg-[#001229] footer-card text-white rounded-[20px]">
					<div className="md:grid grid-cols-2 p-6 md:p-10 md:px-12 pb-0">
						<div className="space-y-5 flex flex-col justify-center fade-left animate-on-scroll">
							<h2 className="text-2xl md:text-5xl">Are you ready to start?</h2>

							<p>
								Personalize your settings, follow your progress, archive your
								highlights and notes automatically Glose is the ultimate reading{' '}
							</p>

							<Button variant="primary" className="mt-5">
								Get Started
							</Button>
						</div>

						<div className="flex justify-center fade-right animate-on-scroll gap-4 md:gap-0">
							<img
								src="/footer_mobile_dashboard_2.png"
								alt="Mobile App Dashboard"
								className="z-10 max-w-[40%] md:max-w-none"
							/>
							<img
								src="/footer_mobile_dashboard_1.png"
								alt="Mobile App Dashboard"
								className="hidden md:block -ml-48"
							/>
						</div>
					</div>
				</div>

				<img
					src="/brand_logo.png"
					alt="Neural Cash logo"
					className="my-20 mx-auto"
				/>

				<div className="flex flex-wrap justify-center gap-4 md:gap-10 footer-links text-center">
					<Link to="/">Home</Link>
					<Link to="/generate-credit">Credit Score</Link>
					<Link to="/take-credit">Loan Offers</Link>
					<Link to="/ai-insights">AI Insights</Link>
					<Link to="/settings">Settings</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
