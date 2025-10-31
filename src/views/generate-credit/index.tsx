import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { predictCreditScore } from '@/lib/api';
import type { PredictionResult } from '@/types/credit';
import { FormEvent, useState, useRef } from 'react';

const GenerateCredit = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		postalAddress: '',
		mobile: '',
		employmentStatus: '',
		email: '',
		termsAccepted: false,
	});
	const fileUploadRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value, type, checked } = e.target;
		setFormData((prev) => {
			if (type === 'checkbox') {
				return { ...prev, termsAccepted: checked };
			} else if (id in prev && id !== 'termsAccepted') {
				return { ...prev, [id]: value };
			}
			return prev;
		});
	};

	const handleFormSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setError('');

		if (!file) {
			setError('Please upload a transaction CSV file');
			return;
		}

		if (!formData.termsAccepted) {
			setError('Please accept the terms and conditions');
			return;
		}

		setIsLoading(true);

		try {
			const result: PredictionResult = await predictCreditScore(file);
			navigate('/analyses', { state: { prediction: result, userData: formData } });
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to generate credit score');
			setIsLoading(false);
		}
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
					<div className="space-y-8">
						<div className="md:grid grid-cols-2 md:gap-16 md:gap-x-30">
							<div>
								<label htmlFor="firstName" className="block text-sm font-medium mb-2">
									First Name *
								</label>
								<Input
									id="firstName"
									type="text"
									placeholder="Your First Name"
									value={formData.firstName}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<label htmlFor="lastName" className="block text-sm font-medium mb-2">
									Last Name *
								</label>
								<Input
									id="lastName"
									type="text"
									placeholder="Your Last Name"
									value={formData.lastName}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<label htmlFor="postalAddress" className="block text-sm font-medium mb-2">
									Postal Address *
								</label>
								<Input
									id="postalAddress"
									type="text"
									placeholder="Postal Address"
									value={formData.postalAddress}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<label htmlFor="mobile" className="block text-sm font-medium mb-2">
									Mobile Number *
								</label>
								<Input
									id="mobile"
									type="tel"
									placeholder="Mobile Number"
									value={formData.mobile}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<label htmlFor="employmentStatus" className="block text-sm font-medium mb-2">
									Employment Status *
								</label>
								<Input
									id="employmentStatus"
									type="text"
									placeholder="Employment Status"
									value={formData.employmentStatus}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-2">
									Email (Optional)
								</label>
								<Input
									id="email"
									type="email"
									placeholder="Email (Optional)"
									value={formData.email}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="file-upload" className="block text-sm font-medium mb-2">
								Upload Transaction CSV File *
							</label>
							<FileUpload
								id="file-upload"
								ref={fileUploadRef}
								file={file}
								onFileChange={setFile}
								accept=".csv"
								error={error && !file ? error : undefined}
							/>
						</div>
					</div>

					<div className="mt-16">
						<input
							id="terms"
							type="checkbox"
							checked={formData.termsAccepted}
							onChange={handleInputChange}
							required
						/>
						<label htmlFor="terms" className="ml-2">
							I agree to give my data to NeuralCash for information purposes.
						</label>
					</div>

					{error && (
						<div className="mt-4 text-red-600 text-sm text-center">{error}</div>
					)}

					<Button
						type="submit"
						variant="primary"
						className={`mt-8 mb-40 w-[250px] mx-auto text-center ${
							isLoading ? 'is-loading' : ''
						}`}
						disabled={isLoading}
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
