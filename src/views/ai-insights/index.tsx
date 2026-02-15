import { Link } from 'react-router-dom';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

const AIInsights = () => {
	const features = [
		{
			name: 'Transaction Count',
			description: 'The total number of transactions made by a customer. Higher transaction frequency indicates active account usage.',
			impact: 'More transactions can signal financial stability and regular income flow.',
		},
		{
			name: 'Net Amount',
			description: 'The sum of all deposits minus withdrawals. Represents the overall financial position.',
			impact: 'Positive net amounts indicate savings accumulation, while negative suggests overdraft risk.',
		},
		{
			name: 'Average Amount',
			description: 'The mean value of all transactions, indicating typical transaction size.',
			impact: 'Consistent average amounts show predictable spending patterns.',
		},
		{
			name: 'Amount Standard Deviation',
			description: 'Measures the variability in transaction amounts. Low deviation means consistent spending.',
			impact: 'Lower deviation suggests better financial planning and predictability.',
		},
		{
			name: 'Deposit to Withdrawal Ratio',
			description: 'Ratio of total deposits to withdrawals. Key indicator of saving behavior.',
			impact: 'Higher ratios (>1) indicate good saving habits and financial discipline.',
		},
		{
			name: 'Customer Duration',
			description: 'The number of days between first and last transaction, showing account longevity.',
			impact: 'Longer customer relationships suggest stability and reliability.',
		},
		{
			name: 'Transaction Hour Mean',
			description: 'Average hour of day when transactions occur, indicating transaction timing patterns.',
			impact: 'Regular patterns may indicate stable routine and employment status.',
		},
		{
			name: 'Transaction Hour Standard Deviation',
			description: 'Variability in transaction timing throughout the day.',
			impact: 'Consistent timing shows regular routines and financial discipline.',
		},
	];

	const modelParams = [
		{
			name: 'Algorithm',
			value: 'Random Forest Classifier',
			description: 'An ensemble learning method that uses multiple decision trees to make predictions. It provides high accuracy and handles non-linear relationships well.',
		},
		{
			name: 'Number of Estimators',
			value: '150',
			description: 'The number of decision trees in the forest. More trees generally improve accuracy but increase computation time.',
		},
		{
			name: 'Max Depth',
			value: '10',
			description: 'Maximum depth of each decision tree. Prevents overfitting by limiting tree complexity.',
		},
		{
			name: 'Class Weight',
			value: 'Balanced',
			description: 'Automatically adjusts weights inversely proportional to class frequencies to handle imbalanced datasets.',
		},
	];

	return (
		<div>
			<nav className="main-navigation fixed left-0 right-0 top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10 px-4">
				<div className="nc-container flex items-center justify-between py-5">
					<Link to="/" className="flex items-center">
						<img src="/favicon.svg" alt="Neural Cash" className="h-6 md:h-8" />
					</Link>
					<div className="hidden md:flex items-center gap-12">
						<Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
						<Link to="/generate-credit" className="text-sm text-white/70 hover:text-white transition-colors">Generate Score</Link>
						<Link to="/take-credit" className="text-sm text-white/70 hover:text-white transition-colors">Credit Offers</Link>
						<Link to="/ai-insights" className="text-sm text-white font-medium transition-colors">AI Insights</Link>
						<Link to="/settings" className="text-sm text-white/70 hover:text-white transition-colors">Settings</Link>
					</div>
					<MobileNav>
						<Link to="/" className="block py-2 text-white/80 hover:text-white transition-colors">Home</Link>
						<Link to="/generate-credit" className="block py-2 text-white/80 hover:text-white transition-colors">Generate Score</Link>
						<Link to="/take-credit" className="block py-2 text-white/80 hover:text-white transition-colors">Credit Offers</Link>
						<Link to="/ai-insights" className="block py-2 text-[#00B512] font-semibold">AI Insights</Link>
						<Link to="/settings" className="block py-2 text-white/80 hover:text-white transition-colors">Settings</Link>
					</MobileNav>
				</div>
			</nav>

			<main className="nc-container pt-32 md:pt-48 pb-20">
				{/* Hero Section */}
				<ScrollReveal className="text-center mb-20 md:mb-40">
					<p className="section-label section-label--green">AI Insights</p>
					<h1 className="font-bold text-3xl md:text-6xl max-w-[800px] mx-auto leading-[1.2] font-montserrat py-10 text-white">
						Understanding Our AI-Powered Credit Scoring System
					</h1>
					<p className="text-xl text-white/70 max-w-[700px] mx-auto">
						Discover how advanced machine learning analyzes your transaction patterns
						to provide accurate financial profile scores and personalized insights.
					</p>
				</ScrollReveal>

				{/* Overview Section */}
				<ScrollReveal className="mb-20 md:mb-40">
					<div
						className="rounded-2xl p-6 md:p-10 lg:p-12"
						style={{
							background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
							border: '1px solid rgba(255,255,255,0.08)',
						}}
					>
						<h2 className="subtitle mb-6 text-white">How It Works</h2>
						<p className="text-lg text-white/70 mb-6 leading-relaxed">
							Our AI-powered credit scoring system uses advanced machine learning algorithms
							to analyze your mobile money transaction history. By examining various patterns
							and behaviors, we generate a comprehensive Financial Profile Score (FPS) that
							reflects your creditworthiness and financial health.
						</p>
						<p className="text-lg text-white/70 leading-relaxed">
							The system processes your transaction data through a sophisticated feature
							engineering pipeline, extracting meaningful insights from raw transaction records.
							These features are then fed into a trained Random Forest model that evaluates
							multiple factors simultaneously to produce an accurate credit assessment.
						</p>
					</div>
				</ScrollReveal>

				{/* Features Section */}
				<section className="mb-20 md:mb-40">
					<ScrollReveal className="text-center mb-16">
						<p className="section-label section-label--green">Key Parameters</p>
						<h2 className="subtitle text-white">Transaction Features Analyzed</h2>
						<p className="text-white/70 max-w-[600px] mx-auto mt-4">
							Our AI model analyzes eight key features extracted from your transaction
							history to assess your financial behavior and creditworthiness.
						</p>
					</ScrollReveal>

					<div className="grid md:grid-cols-2 gap-8">
						{features.map((feature) => (
							<ScrollReveal
								key={feature.name}
								className="rounded-2xl p-5 md:p-8 transition-shadow hover:shadow-xl bg-[rgba(255,255,255,0.04)] border border-white/[0.08]"
							>
								<h3 className="text-xl font-semibold mb-3 text-[#00B512]">
									{feature.name}
								</h3>
								<p className="text-white/70 mb-4">{feature.description}</p>
								<div
									className="rounded-lg p-4"
									style={{
										background: 'rgba(0,181,18,0.1)',
										border: '1px solid rgba(0,181,18,0.2)',
									}}
								>
									<p className="text-sm font-medium text-white/90">
										<strong>Impact:</strong> {feature.impact}
									</p>
								</div>
							</ScrollReveal>
						))}
					</div>
				</section>

				{/* Model Parameters Section */}
				<section className="mb-20 md:mb-40">
					<ScrollReveal className="text-center mb-16">
						<p className="section-label section-label--green">Model Configuration</p>
						<h2 className="subtitle text-white">Machine Learning Model Parameters</h2>
						<p className="text-white/70 max-w-[600px] mx-auto mt-4">
							Our credit scoring model is built using state-of-the-art machine learning
							techniques optimized for financial risk assessment.
						</p>
					</ScrollReveal>

					<div className="grid md:grid-cols-2 gap-8">
						{modelParams.map((param) => (
							<ScrollReveal
								key={param.name}
								className="rounded-2xl p-5 md:p-8 transition-shadow hover:shadow-xl bg-[rgba(255,255,255,0.04)] border border-white/[0.08]"
							>
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-xl font-semibold text-white">
										{param.name}
									</h3>
									<span
										className="px-4 py-2 rounded-full text-sm font-semibold"
										style={{
											background: 'rgba(0,181,18,0.2)',
											color: '#00B512',
											border: '1px solid rgba(0,181,18,0.3)',
										}}
									>
										{param.value}
									</span>
								</div>
								<p className="text-white/70">{param.description}</p>
							</ScrollReveal>
						))}
					</div>
				</section>

				{/* How Features Work Together */}
				<ScrollReveal className="mb-20 md:mb-40">
					<div
						className="rounded-2xl p-6 md:p-10 lg:p-12"
						style={{
							background: 'rgba(255,255,255,0.04)',
							border: '1px solid rgba(255,255,255,0.08)',
						}}
					>
						<h2 className="text-3xl font-bold mb-6 text-white">How Features Work Together</h2>
						<div className="space-y-4 text-lg">
							<p className="text-white/70">
								Our AI model doesn't rely on a single metric. Instead, it evaluates all
								eight features simultaneously, creating a comprehensive financial profile.
								For example:
							</p>
							<ul className="list-disc list-inside space-y-2 ml-4 text-white/70">
								<li>
									A high <strong className="text-white">Deposit to Withdrawal Ratio</strong> combined with
									consistent <strong className="text-white">Transaction Timing</strong> indicates strong
									financial discipline.
								</li>
								<li>
									Long <strong className="text-white">Customer Duration</strong> with positive{' '}
									<strong className="text-white">Net Amount</strong> suggests stable financial habits over time.
								</li>
								<li>
									Low <strong className="text-white">Amount Standard Deviation</strong> with high{' '}
									<strong className="text-white">Transaction Count</strong> shows predictable spending patterns.
								</li>
							</ul>
							<p className="pt-4 text-white/70">
								The Random Forest algorithm automatically identifies these complex
								relationships and weighs them appropriately to generate your credit score.
							</p>
						</div>
					</div>
				</ScrollReveal>

				{/* Score Interpretation */}
				<section className="mb-20 md:mb-40">
					<ScrollReveal className="text-center mb-12">
						<p className="section-label section-label--green">Score Understanding</p>
						<h2 className="subtitle text-white">Understanding Your Credit Score</h2>
					</ScrollReveal>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
					{[
						{ range: '750-850', label: 'Excellent', color: 'bg-green-500' },
						{ range: '700-749', label: 'Good', color: 'bg-blue-500' },
						{ range: '650-699', label: 'Fair', color: 'bg-yellow-500' },
						{ range: '600-649', label: 'Poor', color: 'bg-orange-500' },
						{ range: '300-599', label: 'Very Poor', color: 'bg-red-500' },
					].map((category, index) => (
						<ScrollReveal key={category.label} className={`text-center ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
								<div
									className={`${category.color} h-20 rounded-t-2xl flex items-center justify-center text-white font-bold text-lg mb-2`}
								>
									{category.range}
								</div>
								<div
									className="rounded-b-2xl p-4"
									style={{
										background: 'rgba(255,255,255,0.04)',
										border: '1px solid rgba(255,255,255,0.08)',
										borderTop: 'none',
									}}
								>
									<p className="font-semibold text-white">{category.label}</p>
								</div>
							</ScrollReveal>
						))}
					</div>
				</section>

				{/* Call to Action */}
				<ScrollReveal className="text-center">
					<div
						className="text-white rounded-2xl p-6 md:p-10 lg:p-12"
						style={{
							background: 'linear-gradient(135deg, #00B512 0%, #00990f 50%, #007a0c 100%)',
						}}
					>
						<h2 className="text-3xl font-bold mb-4">Ready to See Your Score?</h2>
						<p className="text-xl mb-8 text-white/90">
							Generate your Financial Profile Score and discover personalized insights
							about your financial health.
						</p>
						<Link to="/generate-credit">
							<Button variant="primary" className="bg-white text-[#00B512] hover:bg-white/90">
								Generate Your FPS
							</Button>
						</Link>
					</div>
				</ScrollReveal>
			</main>

			{/* Footer */}
			<footer className="py-10 mt-20" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
				<div className="nc-container flex flex-col sm:flex-row items-center justify-between gap-4">
					<Link to="/" className="flex items-center">
						<img src="/favicon.svg" alt="Neural Cash" className="h-5" />
					</Link>
					<div className="flex flex-wrap gap-6 text-sm">
						<Link to="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
						<Link to="/generate-credit" className="text-white/40 hover:text-white transition-colors">Credit Score</Link>
						<Link to="/take-credit" className="text-white/40 hover:text-white transition-colors">Loan Offers</Link>
						<Link to="/ai-insights" className="text-white/60 font-medium">AI Insights</Link>
						<Link to="/settings" className="text-white/40 hover:text-white transition-colors">Settings</Link>
					</div>
					<p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Neural Cash</p>
				</div>
			</footer>
		</div>
	);
};

export default AIInsights;
