import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import mobileUi from '../../assets/images/mobile_ui.png';

function Header() {
	const navigate = useNavigate();

	const handleNavigateToGenerateCredit = () => {
		return navigate('/generate-credit');
	};

	return (
		<div>
			<nav className="main-navigation absolute left-0 right-0 text-center space-x-10 top-6">
				<Link to="/">Home</Link>
				<Link to="/generate-credit">Generate FPS</Link>
				<Link to="/take-credit">Credit Offers</Link>
				<Link to="/">AI Insights</Link>
				<Link to="/">Settings</Link>

				<Link
					to="/login"
					className="border bg-transparent text-white !hover:text-[#E2FF54] hover:border-[#E2FF54] ease-in-out duration-500 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all w-fit !p-[1rem] rounded-full uppercase ml-16 ommit"
				>
					<span className="z-20">Sign In/ Log In</span>
				</Link>
			</nav>
			<header className="main-header pt-40 pb-16">
				<div className="nc-container">
					<div className="text-white md:grid grid-cols-2">
						<div className="flex flex-col justify-center gap-5 animate fade-up">
							<p className="tag">100% Trusted Platform</p>
							<h1 className="!text-6xl font-semibold uppercase tracking-[1px] leading-[1.2]">
								Know Your Score. Own Your{' '}
								<span className="text-[#00B512]">Future</span>
							</h1>
							<p className="text-[1.125rem] max-w-[523px] font-medium text-[#DCDCDC] capitalize">
								Understand Your Money, Master Your Future - Track, Analyse And
								Improve your MoMo Habits With NEURALCASH{' '}
							</p>

							<Button
								variant="primary"
								className="mt-9"
								onClick={handleNavigateToGenerateCredit}
							>
								<span className="z-20">Get Your Score</span>
							</Button>
						</div>

						<div className="md:ml-5 animate fade-right">
							<img src={mobileUi} alt="Neural Cash Mobile App" />
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}

export default Header;
