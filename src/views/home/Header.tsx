import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/useAuth';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MobileNav } from '@/components/navigation/MobileNav';
import { ParticleSystem } from '@/components/backgrounds/ParticleSystem';
import { MeshGradient } from '@/components/backgrounds/MeshGradient';
import { BlobAnimation } from '@/components/backgrounds/BlobAnimation';
import { GradientText } from '@/components/typography/GradientText';
import { fadeInUp, fadeInRight, staggerContainer } from '@/lib/animations';
import mobileUi from '../../assets/images/mobile_ui.png';

function Header() {
	const navigate = useNavigate();
	const { user, signOutUser, loading } = useAuth();
	const [isSigningOut, setIsSigningOut] = useState(false);

	const handleNavigateToGenerateCredit = () => {
		return navigate('/generate-credit');
	};

	const handleSignOut = async () => {
		try {
			setIsSigningOut(true);
			await signOutUser();
			navigate('/');
		} catch (error) {
			console.error('Error signing out:', error);
			setIsSigningOut(false);
		} finally {
			setIsSigningOut(false);
		}
	};

	return (
		<div className="relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 z-0">
				<MeshGradient className="absolute inset-0" />
				<BlobAnimation size={600} color="rgba(0, 181, 18, 0.15)" className="top-20 -right-40" />
				<BlobAnimation size={500} color="rgba(226, 255, 84, 0.1)" className="bottom-20 -left-40" />
				<ParticleSystem count={15} className="opacity-50" />
			</div>

			<nav className="main-navigation absolute left-0 right-0 top-6 z-50 px-4">
				<div className="flex items-center justify-end md:justify-center">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="hidden md:flex items-center gap-4 md:gap-10"
					>
						<Link to="/" className="hover:text-[#E2FF54] transition-colors">Home</Link>
						<Link to="/generate-credit" className="hover:text-[#E2FF54] transition-colors">Generate FPS</Link>
						<Link to="/take-credit" className="hover:text-[#E2FF54] transition-colors">Credit Offers</Link>
						<Link to="/ai-insights" className="hover:text-[#E2FF54] transition-colors">AI Insights</Link>
						<Link to="/settings" className="hover:text-[#E2FF54] transition-colors">Settings</Link>

						{loading ? (
							<div className="inline-block ml-4 md:ml-16">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
							</div>
						) : user ? (
							<DropdownMenu>
								<DropdownMenuTrigger className="border bg-transparent text-white hover:border-[#E2FF54] ease-in-out duration-500 inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-all w-fit p-[1rem] rounded-full uppercase ml-4 md:ml-16 ommit">
									{user.photoURL && (
										<img
											src={user.photoURL}
											alt={user.displayName || 'User'}
											className="w-8 h-8 rounded-full"
										/>
									)}
									<span className="z-20">{user.displayName || 'User'}</span>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem disabled>
										<div className="flex flex-col">
											<span className="font-semibold">{user.displayName}</span>
											<span className="text-xs text-gray-500">{user.email}</span>
										</div>
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
										{isSigningOut ? 'Signing out...' : 'Sign Out'}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link
								to="/login"
								className="border bg-transparent text-white !hover:text-[#E2FF54] hover:border-[#E2FF54] ease-in-out duration-500 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all w-fit !p-[1rem] rounded-full uppercase ml-4 md:ml-16 ommit"
							>
								<span className="z-20">Sign In/ Log In</span>
							</Link>
						)}
					</motion.div>

					<MobileNav>
						<Link to="/" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Home</Link>
						<Link to="/generate-credit" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Generate FPS</Link>
						<Link to="/take-credit" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Credit Offers</Link>
						<Link to="/ai-insights" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">AI Insights</Link>
						<Link to="/settings" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Settings</Link>
						{loading ? (
							<div className="py-2">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
							</div>
						) : user ? (
							<div className="pt-2 border-t border-white/20">
								<div className="flex items-center gap-2 mb-2">
									{user.photoURL && (
										<img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
									)}
									<span className="font-medium">{user.displayName || 'User'}</span>
								</div>
								<button
									type="button"
									onClick={handleSignOut}
									disabled={isSigningOut}
									className="text-sm text-[#E2FF54] hover:underline"
								>
									{isSigningOut ? 'Signing out...' : 'Sign Out'}
								</button>
							</div>
						) : (
							<Link
								to="/login"
								className="block py-2 text-center border border-white/40 rounded-full text-white hover:border-[#E2FF54] hover:text-[#E2FF54] transition-colors"
							>
								Sign In / Log In
							</Link>
						)}
					</MobileNav>
				</div>
			</nav>

			<header className="main-header pt-24 md:pt-40 pb-16 relative z-10">
				<div className="nc-container">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
						className="text-white md:grid grid-cols-2 gap-8"
					>
						<motion.div
							variants={fadeInUp}
							className="flex flex-col justify-center gap-5"
						>
							<motion.p
								variants={fadeInUp}
								className="tag glass"
							>
								100% Trusted Platform
							</motion.p>
							<motion.h1
								variants={fadeInUp}
								className="text-3xl sm:text-4xl md:!text-6xl font-semibold uppercase tracking-[1px] leading-[1.2]"
							>
								Know Your Score. Own Your{' '}
								<GradientText variant="primary">Future</GradientText>
							</motion.h1>
							<motion.p
								variants={fadeInUp}
								className="text-[1.125rem] max-w-[523px] font-medium text-[#DCDCDC] capitalize"
							>
								Understand Your Money, Master Your Future - Track, Analyse And
								Improve your MoMo Habits With NEURALCASH{' '}
							</motion.p>

							<motion.div variants={fadeInUp}>
								<Button
									variant="primary"
									className="mt-9"
									onClick={handleNavigateToGenerateCredit}
								>
									<span className="z-20">Get Your Score</span>
								</Button>
							</motion.div>
						</motion.div>

						<motion.div
							variants={fadeInRight}
							className="md:ml-5 relative"
						>
							<motion.img
								src={mobileUi}
								alt="Neural Cash Mobile App"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8, delay: 0.3 }}
								whileHover={{ scale: 1.05 }}
								className="relative z-10 max-w-full w-full md:w-auto"
							/>
						</motion.div>
					</motion.div>
				</div>
			</header>
		</div>
	);
}

export default Header;
