import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormEvent, useState } from 'react';

const GenerateCredit = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();

		setIsLoading(true);

		setTimeout(() => {
			navigate('/analyses');
		}, 1000);
	};

	return (
		<div>
			<nav>
				<div className="nc-container flex items-center justify-between pt-8">
					<img src="/logo-mono.png" alt="Logo Mono" />

					<div className="secondary-navigation space-x-5">
						<Link to="/">Home</Link>
						<Link to="/generate-credit">Generate Credit</Link>
						<Link to="/">Credit Offers</Link>
						<Link to="/">AI Insights</Link>
						<Link to="/">Settings</Link>
					</div>
				</div>
			</nav>

			<main className="nc-container">
				<h1 className="font-bold text-6xl max-w-[700px] leading-[1.2] font-montserrat py-10 animate fade-up">
					Generate Your Financial Profile Score
				</h1>

				<form onSubmit={handleFormSubmit} className="animate fade-up delay-30">
					<div className="md:grid grid-cols-2 md:gap-16 md:gap-x-30">
						<Input
							id="first name"
							type="first name"
							placeholder="Your First Name"
						/>
						<Input id="last name" type="last name" placeholder="Your Last Name" />
						<Input
							id="postalAddress"
							type="postalAddress"
							placeholder="Postal Address"
						/>
						<Input id="mobile" type="mobile" placeholder="Mobile Number" />
						<Input
							id="employmentStatus"
							type="employmentStatus"
							placeholder="Employment Status"
						/>
						<Input id="email" type="email" placeholder="Email (Optional)" />
					</div>

					<div className="mt-16">
						<input id="terms" type="checkbox" />
						<label htmlFor="terms" className="ml-2">
							I agree to give my data to NeuralCash for information purposes.
						</label>
					</div>

					<Button
						type="submit"
						variant="primary"
						className={`mt-8 mb-40 w-[250px] mx-auto text-center ${
							isLoading ? 'is-loading' : ''
						}`}
					>
						{isLoading ? 'Processing...' : 'Generate FPS'}
					</Button>
				</form>

				<img
					src="/footer-links.svg"
					alt="Dummy Footer section for the sake of time. Please!"
					className="mx-auto mb-20"
				/>
			</main>
		</div>
	);
};

export default GenerateCredit;
