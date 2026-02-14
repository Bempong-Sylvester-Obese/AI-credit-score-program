import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/useAuth';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { MobileNav } from '@/components/navigation/MobileNav';
import { GradientText } from '@/components/typography/GradientText';
import { fadeInUp, staggerContainer } from '@/lib/animations';

function Header() {
	const navigate = useNavigate();
	const { user, signOutUser, loading } = useAuth();
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

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
		} finally {
			setIsSigningOut(false);
		}
	};

	return (
		<div className="relative min-h-screen flex flex-col">
			{/* Subtle radial glow background */}
			<div
				className="absolute inset-0 z-0"
				style={{
					background: `
						radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0, 181, 18, 0.08) 0%, transparent 70%),
						radial-gradient(ellipse 40% 30% at 30% 60%, rgba(41, 173, 141, 0.05) 0%, transparent 60%)
					`,
				}}
			/>

			{/* Navigation */}
			<nav
				className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
					scrolled
						? 'bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10'
						: ''
				}`}
			>
				<div className="nc-container">
					<div className="flex items-center justify-between py-5">
						{/* Logo */}
						<Link to="/" className="flex items-center">
							<img
								src="/favicon.svg"
								alt="Neural Cash"
								className="h-6 md:h-8"
							/>
						</Link>

						{/* Desktop Nav Links */}
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="hidden md:flex items-center gap-12"
						>
							<Link to="/" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Home</Link>
							<Link to="/generate-credit" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Generate Score</Link>
							<Link to="/take-credit" className="text-sm text-white/70 hover:text-white transition-colors duration-300">Credit Offers</Link>
							<Link to="/ai-insights" className="text-sm text-white/70 hover:text-white transition-colors duration-300">AI Insights</Link>
						</motion.div>

						{/* Auth / Sign In */}
						<div className="hidden md:flex items-center">
							{loading ? (
								<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white/40" />
							) : user ? (
								<DropdownMenu>
									<DropdownMenuTrigger className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
									{user.photoURL && (
										<img
											src={user.photoURL}
											alt={user.displayName || 'User'}
											className="w-7 h-7 rounded-full object-cover"
											referrerPolicy="no-referrer"
										/>
									)}
										<span>{user.displayName || 'User'}</span>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem disabled>
											<div className="flex flex-col">
												<span className="font-semibold">{user.displayName}</span>
												<span className="text-xs text-gray-500">{user.email}</span>
											</div>
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => navigate('/settings')}>
											Settings
										</DropdownMenuItem>
										<DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
											{isSigningOut ? 'Signing out...' : 'Sign Out'}
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							) : (
								<Link
									to="/login"
									className="text-sm text-white/70 hover:text-white transition-colors duration-300"
								>
									Sign In
								</Link>
							)}
						</div>

						{/* Mobile Nav */}
						<MobileNav>
							<Link to="/" className="block py-2 text-white/80 hover:text-white transition-colors">Home</Link>
							<Link to="/generate-credit" className="block py-2 text-white/80 hover:text-white transition-colors">Generate Score</Link>
							<Link to="/take-credit" className="block py-2 text-white/80 hover:text-white transition-colors">Credit Offers</Link>
							<Link to="/ai-insights" className="block py-2 text-white/80 hover:text-white transition-colors">AI Insights</Link>
							{loading ? null : user ? (
								<div className="pt-3 mt-3 border-t border-white/10">
									<div className="flex items-center gap-2 mb-2">
									{user.photoURL && (
										<img src={user.photoURL} alt="" className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
									)}
										<span className="text-sm font-medium text-white">{user.displayName || 'User'}</span>
									</div>
									<Link to="/settings" className="block py-1 text-sm text-white/60 hover:text-white transition-colors">Settings</Link>
									<button
										type="button"
										onClick={handleSignOut}
										disabled={isSigningOut}
										className="text-sm text-[#00B512] hover:underline mt-1"
									>
										{isSigningOut ? 'Signing out...' : 'Sign Out'}
									</button>
								</div>
							) : (
								<Link
									to="/login"
									className="block py-2 text-white/80 hover:text-white transition-colors mt-2 pt-3 border-t border-white/10"
								>
									Sign In
								</Link>
							)}
						</MobileNav>
					</div>
				</div>
			</nav>

			{/* Hero Content -- centered, single column, Iso-style */}
			<header className="flex-1 flex items-center justify-center relative z-10 pt-24 pb-20">
				<div className="nc-container">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={staggerContainer}
						className="text-center max-w-[900px] mx-auto"
					>
						<motion.p
							variants={fadeInUp}
							className="section-label section-label--green mb-6"
						>
							AI-Powered Credit Scoring
						</motion.p>

						<motion.h1
							variants={fadeInUp}
							className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8"
						>
							Know Your Score.{' '}
							<br className="hidden sm:block" />
							Own Your{' '}
							<GradientText variant="primary">Future</GradientText>
						</motion.h1>

						<motion.p
							variants={fadeInUp}
							className="text-lg md:text-xl text-white/60 max-w-[600px] mx-auto mb-12 leading-relaxed"
						>
							Track, analyse and improve your mobile money habits
							with Neural Cash's AI-driven credit scoring engine.
						</motion.p>

						<motion.div variants={fadeInUp}>
							<Button
								variant="primary"
								className="!px-6 !py-3 md:!px-10 md:!py-4 text-base"
								onClick={handleNavigateToGenerateCredit}
							>
								<span className="z-20">Get Your Score</span>
							</Button>
						</motion.div>
					</motion.div>
				</div>
			</header>

			{/* Scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5, duration: 1 }}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
			>
				<span className="text-[0.65rem] uppercase tracking-[0.2em] text-white/30">Scroll</span>
				<motion.div
					animate={{ y: [0, 6, 0] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
				>
					<ChevronDown size={16} className="text-white/30" />
				</motion.div>
			</motion.div>
		</div>
	);
}

export default Header;
