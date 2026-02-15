import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer
			className="pt-20 md:pt-32 pb-10"
			style={{
				background: '#0a0a0a',
				borderTop: '1px solid rgba(255,255,255,0.08)',
			}}
		>
			<div className="nc-container">
				{/* CTA Card -- simplified */}
				<ScrollReveal>
					<motion.div
						variants={fadeInUp}
						className="rounded-3xl p-6 sm:p-10 md:p-16 text-center mb-20 md:mb-28"
						style={{
							background: 'linear-gradient(135deg, #001229 0%, #023543 100%)',
						}}
					>
						<h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
							Ready to know your score?
						</h2>
						<p className="text-white/50 text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
							Get started with Neural Cash today and discover your AI-powered credit profile.
						</p>
						<Link to="/generate-credit">
							<Button variant="primary" className="!px-6 !py-3 md:!px-10 md:!py-4 text-base">
								<span className="z-20">Get Started</span>
							</Button>
						</Link>
					</motion.div>
				</ScrollReveal>

				{/* Multi-column links grid */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 lg:gap-16 mb-16 md:mb-20">
					{/* Product */}
					<div>
						<h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
							Product
						</h4>
						<ul className="space-y-3">
							<li>
								<Link to="/generate-credit" className="text-sm text-white/60 hover:text-white transition-colors">
									Generate Score
								</Link>
							</li>
							<li>
								<Link to="/take-credit" className="text-sm text-white/60 hover:text-white transition-colors">
									Credit Offers
								</Link>
							</li>
							<li>
								<Link to="/ai-insights" className="text-sm text-white/60 hover:text-white transition-colors">
									AI Insights
								</Link>
							</li>
							<li>
								<Link to="/analyses" className="text-sm text-white/60 hover:text-white transition-colors">
									My Analyses
								</Link>
							</li>
						</ul>
					</div>

				{/* Company */}
				<div>
					<h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
						Company
					</h4>
					<ul className="space-y-3">
						<li>
							<Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">
								About
							</Link>
						</li>
						<li>
							<a href="mailto:support@neuralcash.app" className="text-sm text-white/60 hover:text-white transition-colors">
								Contact
							</a>
						</li>
					</ul>
				</div>

				{/* Legal */}
				<div>
					<h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 mb-5">
						Legal
					</h4>
					<ul className="space-y-3">
						<li>
							<Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">
								Terms of Service
							</Link>
						</li>
					</ul>
				</div>
				</div>

				{/* Bottom bar */}
				<div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
					<Link to="/" className="flex items-center">
						<img
							src="/favicon.svg"
							alt="Neural Cash"
							className="h-5"
						/>
					</Link>
					<p className="text-xs text-white/30">
						&copy; {year} Neural Cash. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
