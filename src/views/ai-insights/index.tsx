import { Link } from 'react-router-dom';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Button } from '@/components/ui/button';

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
			<nav className="main-navigation absolute left-0 right-0 top-6 z-50 px-4">
				<div className="flex items-center justify-end md:justify-center">
					<div className="hidden md:flex items-center gap-4 md:gap-10">
						<Link to="/">Home</Link>
						<Link to="/generate-credit">Generate FPS</Link>
						<Link to="/take-credit">Credit Offers</Link>
						<Link to="/ai-insights" className="font-semibold">
							AI Insights
						</Link>
						<Link to="/settings">Settings</Link>
					</div>
					<MobileNav>
						<Link to="/" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Home</Link>
						<Link to="/generate-credit" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Generate FPS</Link>
						<Link to="/take-credit" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Credit Offers</Link>
						<Link to="/ai-insights" className="block py-2 text-[#E2FF54] font-semibold">AI Insights</Link>
						<Link to="/settings" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Settings</Link>
					</MobileNav>
				</div>
			</nav>

			<main className="nc-container pt-24 md:pt-40 pb-20">
				{/* Hero Section */}
				<section className="text-center mb-32 animate fade-up">
					<p className="tag tag-no-emoji">AI Insights</p>
					<h1 className="font-bold text-3xl md:text-6xl max-w-[800px] mx-auto leading-[1.2] font-montserrat py-10">
						Understanding Our AI-Powered Credit Scoring System
					</h1>
					<p className="text-xl text-gray-600 max-w-[700px] mx-auto">
						Discover how advanced machine learning analyzes your transaction patterns
						to provide accurate financial profile scores and personalized insights.
					</p>
				</section>

				{/* Overview Section */}
				<section className="mb-32 animate fade-up delay-30">
					<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12">
						<h2 className="subtitle mb-6">How It Works</h2>
						<p className="text-lg text-gray-700 mb-6 leading-relaxed">
							Our AI-powered credit scoring system uses advanced machine learning algorithms
							to analyze your mobile money transaction history. By examining various patterns
							and behaviors, we generate a comprehensive Financial Profile Score (FPS) that
							reflects your creditworthiness and financial health.
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							The system processes your transaction data through a sophisticated feature
							engineering pipeline, extracting meaningful insights from raw transaction records.
							These features are then fed into a trained Random Forest model that evaluates
							multiple factors simultaneously to produce an accurate credit assessment.
						</p>
					</div>
				</section>

				{/* Features Section */}
				<section className="mb-32">
					<div className="text-center mb-16 animate fade-up">
						<p className="tag tag-no-emoji">Key Parameters</p>
						<h2 className="subtitle">Transaction Features Analyzed</h2>
						<p className="text-gray-600 max-w-[600px] mx-auto mt-4">
							Our AI model analyzes eight key features extracted from your transaction
							history to assess your financial behavior and creditworthiness.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{features.map((feature, index) => (
							<div
								key={feature.name}
								className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow animate fade-up"
								style={{ animationDelay: `${(index + 1) * 50}ms` }}
							>
								<h3 className="text-xl font-semibold mb-3 text-blue-600">
									{feature.name}
								</h3>
								<p className="text-gray-700 mb-4">{feature.description}</p>
								<div className="bg-blue-50 rounded-lg p-4">
									<p className="text-sm font-medium text-blue-900">
										<strong>Impact:</strong> {feature.impact}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Model Parameters Section */}
				<section className="mb-32">
					<div className="text-center mb-16 animate fade-up">
						<p className="tag tag-no-emoji">Model Configuration</p>
						<h2 className="subtitle">Machine Learning Model Parameters</h2>
						<p className="text-gray-600 max-w-[600px] mx-auto mt-4">
							Our credit scoring model is built using state-of-the-art machine learning
							techniques optimized for financial risk assessment.
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{modelParams.map((param, index) => (
							<div
								key={param.name}
								className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-8 hover:shadow-lg transition-shadow animate fade-up"
								style={{ animationDelay: `${(index + 1) * 50}ms` }}
							>
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-xl font-semibold text-indigo-900">
										{param.name}
									</h3>
									<span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
										{param.value}
									</span>
								</div>
								<p className="text-gray-700">{param.description}</p>
							</div>
						))}
					</div>
				</section>

				{/* How Features Work Together */}
				<section className="mb-32">
					<div className="bg-gray-900 text-white rounded-2xl p-12 animate fade-up">
						<h2 className="text-3xl font-bold mb-6">How Features Work Together</h2>
						<div className="space-y-4 text-lg">
							<p>
								Our AI model doesn't rely on a single metric. Instead, it evaluates all
								eight features simultaneously, creating a comprehensive financial profile.
								For example:
							</p>
							<ul className="list-disc list-inside space-y-2 ml-4">
								<li>
									A high <strong>Deposit to Withdrawal Ratio</strong> combined with
									consistent <strong>Transaction Timing</strong> indicates strong
									financial discipline.
								</li>
								<li>
									Long <strong>Customer Duration</strong> with positive{' '}
									<strong>Net Amount</strong> suggests stable financial habits over time.
								</li>
								<li>
									Low <strong>Amount Standard Deviation</strong> with high{' '}
									<strong>Transaction Count</strong> shows predictable spending patterns.
								</li>
							</ul>
							<p className="pt-4">
								The Random Forest algorithm automatically identifies these complex
								relationships and weighs them appropriately to generate your credit score.
							</p>
						</div>
					</div>
				</section>

				{/* Score Interpretation */}
				<section className="mb-32">
					<div className="text-center mb-12 animate fade-up">
						<p className="tag tag-no-emoji">Score Understanding</p>
						<h2 className="subtitle">Understanding Your Credit Score</h2>
					</div>

					<div className="grid md:grid-cols-5 gap-6">
						{[
							{ range: '750-850', label: 'Excellent', color: 'bg-green-500' },
							{ range: '700-749', label: 'Good', color: 'bg-blue-500' },
							{ range: '650-699', label: 'Fair', color: 'bg-yellow-500' },
							{ range: '600-649', label: 'Poor', color: 'bg-orange-500' },
							{ range: '300-599', label: 'Very Poor', color: 'bg-red-500' },
						].map((category, index) => (
							<div
								key={category.label}
								className="text-center animate fade-up"
								style={{ animationDelay: `${(index + 1) * 100}ms` }}
							>
								<div
									className={`${category.color} h-20 rounded-t-lg flex items-center justify-center text-white font-bold text-lg mb-2`}
								>
									{category.range}
								</div>
								<div className="bg-white border border-gray-200 rounded-b-lg p-4">
									<p className="font-semibold text-gray-900">{category.label}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Call to Action */}
				<section className="text-center animate fade-up">
					<div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-12">
						<h2 className="text-3xl font-bold mb-4">Ready to See Your Score?</h2>
						<p className="text-xl mb-8 text-blue-100">
							Generate your Financial Profile Score and discover personalized insights
							about your financial health.
						</p>
						<Link to="/generate-credit">
							<Button variant="primary" className="bg-white text-blue-600 hover:bg-blue-50">
								Generate Your FPS
							</Button>
						</Link>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="py-[7rem] bg-[#F6F9F8]">
				<div className="nc-container">
					<img
						src="/brand_logo.png"
						alt="Neural Cash logo"
						className="my-20 mx-auto"
					/>
					<div className="text-center space-x-10 footer-links">
						<Link to="/">Home</Link>
						<Link to="/generate-credit">Credit Score</Link>
						<Link to="/take-credit">Loan Offers</Link>
						<Link to="/ai-insights" className="font-semibold">
							AI Insights
						</Link>
						<Link to="/settings">Settings</Link>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default AIInsights;

