import { Link, useNavigate } from 'react-router-dom';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { predictCreditScore, createUserProfile, updateUserProfile } from '@/lib/api';
import type { PredictionResult } from '@/types/credit';
import { FormEvent, useState, useRef } from 'react';

// Validation helpers
const validateEmail = (email: string): boolean => {
	if (!email) return true; // Optional field
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
	// Allow various phone formats: +1234567890, (123) 456-7890, 123-456-7890, 1234567890
	const phoneRegex = /^[+]?[(]?\d{1,4}[)]?[-\s.]?[(]?\d{1,4}[)]?[-\s.]?\d{1,9}$/;
	return phoneRegex.test(phone.replace(/\s/g, ''));
};

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

		// Validate required fields
		if (!formData.firstName.trim()) {
			setError('First name is required');
			return;
		}

		if (!formData.lastName.trim()) {
			setError('Last name is required');
			return;
		}

		if (!formData.mobile.trim()) {
			setError('Mobile number is required');
			return;
		}

		if (!formData.postalAddress.trim()) {
			setError('Postal address is required');
			return;
		}

		if (!formData.employmentStatus.trim()) {
			setError('Employment status is required');
			return;
		}

		if (!validatePhone(formData.mobile)) {
			setError('Please enter a valid mobile number');
			return;
		}

		if (formData.email && !validateEmail(formData.email)) {
			setError('Please enter a valid email address');
			return;
		}

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
			// Save or update user profile first
			const profileData = {
				first_name: formData.firstName.trim(),
				last_name: formData.lastName.trim(),
				postal_address: formData.postalAddress.trim() || undefined,
				mobile: formData.mobile.trim(),
				employment_status: formData.employmentStatus.trim() || undefined,
				email: formData.email.trim() || undefined,
			};

			try {
				await updateUserProfile(profileData);
			} catch (updateError) {
				// Only create if profile doesn't exist
				if (updateError instanceof Error &&
					(updateError.message.includes('404') ||
						updateError.message.includes('not found') ||
						updateError.message.includes('Not Found'))) {
					await createUserProfile(profileData);
				} else {
					// Re-throw other errors (network, auth, validation, etc.)
					throw updateError;
				}
			}

			// Then generate credit score
			const result: PredictionResult = await predictCreditScore(file);
			navigate('/analyses', { state: { prediction: result, userData: formData } });
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to generate credit score');
			setIsLoading(false);
		}
	};

	const inputDarkClass =
		'bg-white/5 border-white/20 text-white placeholder:text-white/50 focus-visible:border-[#00B512]';

	return (
		<div>
			<nav className="fixed left-0 right-0 top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10">
				<div className="nc-container flex items-center justify-between py-5">
					<Link to="/" className="flex items-center">
						<img src="/favicon.svg" alt="Neural Cash" className="h-6 md:h-8" />
					</Link>
					<div className="hidden md:flex items-center gap-12">
						<Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
						<Link to="/generate-credit" className="text-sm text-white font-medium transition-colors">Generate Score</Link>
						<Link to="/take-credit" className="text-sm text-white/70 hover:text-white transition-colors">Credit Offers</Link>
						<Link to="/ai-insights" className="text-sm text-white/70 hover:text-white transition-colors">AI Insights</Link>
						<Link to="/settings" className="text-sm text-white/70 hover:text-white transition-colors">Settings</Link>
					</div>
					<MobileNav>
						<Link to="/" className="block py-2 text-white/80 hover:text-white transition-colors">Home</Link>
						<Link to="/generate-credit" className="block py-2 text-[#00B512] font-semibold">Generate Score</Link>
						<Link to="/take-credit" className="block py-2 text-white/80 hover:text-white transition-colors">Credit Offers</Link>
						<Link to="/ai-insights" className="block py-2 text-white/80 hover:text-white transition-colors">AI Insights</Link>
						<Link to="/settings" className="block py-2 text-white/80 hover:text-white transition-colors">Settings</Link>
					</MobileNav>
				</div>
			</nav>

			<main className="nc-container pt-28 md:pt-40 pb-20">
				<p className="section-label section-label--green mb-4">Generate Score</p>
				<h1 className="font-bold text-3xl md:text-6xl max-w-[700px] leading-[1.2] font-montserrat text-white animate fade-up">
					Generate Your Financial Profile Score
				</h1>

				<form onSubmit={handleFormSubmit} className="animate fade-up delay-30">
					<div className="space-y-8">
						<div className="space-y-6 md:space-y-0 md:grid grid-cols-2 md:gap-16">
							<div>
								<label htmlFor="firstName" className="block text-sm font-medium mb-2 text-white/70">
									First Name *
								</label>
								<Input
									id="firstName"
									type="text"
									placeholder="Your First Name"
									value={formData.firstName}
									onChange={handleInputChange}
									required
									className={inputDarkClass}
								/>
							</div>
							<div>
								<label htmlFor="lastName" className="block text-sm font-medium mb-2 text-white/70">
									Last Name *
								</label>
								<Input
									id="lastName"
									type="text"
									placeholder="Your Last Name"
									value={formData.lastName}
									onChange={handleInputChange}
									required
									className={inputDarkClass}
								/>
							</div>
							<div>
								<label htmlFor="postalAddress" className="block text-sm font-medium mb-2 text-white/70">
									Postal Address *
								</label>
								<Input
									id="postalAddress"
									type="text"
									placeholder="Postal Address"
									value={formData.postalAddress}
									onChange={handleInputChange}
									required
									className={inputDarkClass}
								/>
							</div>
							<div>
								<label htmlFor="mobile" className="block text-sm font-medium mb-2 text-white/70">
									Mobile Number *
								</label>
								<Input
									id="mobile"
									type="tel"
									placeholder="Mobile Number"
									value={formData.mobile}
									onChange={handleInputChange}
									required
									className={inputDarkClass}
								/>
							</div>
							<div>
								<label htmlFor="employmentStatus" className="block text-sm font-medium mb-2 text-white/70">
									Employment Status *
								</label>
								<Input
									id="employmentStatus"
									type="text"
									placeholder="Employment Status"
									value={formData.employmentStatus}
									onChange={handleInputChange}
									required
									className={inputDarkClass}
								/>
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-2 text-white/70">
									Email (Optional)
								</label>
								<Input
									id="email"
									type="email"
									placeholder="Email (Optional)"
									value={formData.email}
									onChange={handleInputChange}
									className={inputDarkClass}
								/>
							</div>
						</div>

						<div>
							<label htmlFor="file-upload" className="block text-sm font-medium mb-2 text-white/70">
								Upload Transaction CSV File *
							</label>
							<FileUpload
								id="file-upload"
								ref={fileUploadRef}
								file={file}
								onFileChange={setFile}
								accept=".csv"
								error={error && !file ? error : undefined}
								className="[&_.text-gray-900]:text-white [&_.text-gray-500]:text-white/60 [&_.text-gray-700]:text-white/80 [&_.border-gray-300]:border-white/30 [&_.text-gray-400]:text-white/50 [&_.bg-green-100]:bg-green-500/20 [&_.text-green-600]:text-green-400 [&_.text-red-600]:text-red-400"
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
							className="accent-[#00B512]"
						/>
						<label htmlFor="terms" className="ml-2 text-white/70">
							I agree to give my data to NeuralCash for information purposes.
						</label>
					</div>

					{error && (
						<div className="mt-4 text-red-400 text-sm text-center">{error}</div>
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

				<footer className="py-10 mt-10" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
					<div className="nc-container flex flex-col sm:flex-row items-center justify-between gap-4">
						<Link to="/" className="flex items-center">
							<img src="/favicon.svg" alt="Neural Cash" className="h-5" />
						</Link>
						<p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Neural Cash</p>
					</div>
				</footer>
			</main>
		</div>
	);
};

export default GenerateCredit;
