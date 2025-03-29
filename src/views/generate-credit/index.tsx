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
			navigate('/');
		}, 1000);
	};

	return (
		<div>
			<nav>
				<div className="container flex items-center justify-between pt-8">
					<img src="/logo-mono.png" alt="Logo Mono" />

					<div className="secondary-navigation space-x-5">
						<Link to="/">Home</Link>
						<Link to="/generate-credit">Generate Credit</Link>
						<Link to="/">Loan Offers</Link>
						<Link to="/">AI Insights</Link>
						<Link to="/">Settings</Link>
					</div>
				</div>
			</nav>

			<main className="container">
				<h1 className="font-bold text-6xl max-w-[700px] leading-[1.2] font-montserrat py-10 animate fade-up">
					Generate Your Credit Score
				</h1>

				<p className="text-[1rem] text-[#737B7D] w-[547px] mb-20 animate fade-up">
					Need an experienced and skilled hand with custom IT projects? Fill out
					the form to get a free consultation.
				</p>

				<form onSubmit={handleFormSubmit} className="animate fade-up delay-30">
					<div className="md:grid grid-cols-2 md:gap-16 md:gap-x-30">
						<Input
							id="firstname"
							type="firstname"
							placeholder="Your First Name"
						/>
						<Input id="lastname" type="lastname" placeholder="Your Last Name" />
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

					<Button
						type="submit"
						variant="primary"
						className="mt-16 mb-40 w-[250px]"
					>
						{isLoading ? 'Processing... Please wait!' : 'Generate my credit'}
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
