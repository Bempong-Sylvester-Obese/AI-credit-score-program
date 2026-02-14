import { ScrollReveal, StaggerItem } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const AboutUs = () => {
	return (
		<>
			{/* Section 1 -- subtle tinted background */}
			<section className="py-20 md:py-40" style={{ background: 'rgba(255,255,255,0.02)' }}>
				<div className="nc-container">
					<div className="flex flex-col md:grid grid-cols-2 items-center gap-8 md:gap-16">
						<ScrollReveal>
							<motion.img
								variants={fadeInUp}
								src="/monthly_saving_stat.svg"
								alt="Monthly Saving Stat"
								className="max-w-full"
							/>
						</ScrollReveal>

						<ScrollReveal className="space-y-8">
							<motion.p variants={fadeInUp} className="section-label section-label--green">
								About Us
							</motion.p>
							<motion.h2
								variants={fadeInUp}
								className="subtitle"
							>
								Revolutionizing Finance, One Score at a Time
							</motion.h2>

							<motion.ul
								variants={staggerContainer}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								className="space-y-3 features"
							>
								<StaggerItem>
									<li>
										<h4>AI-Driven Accuracy</h4>
										<p>Smarter assessments, better decisions with our AI system</p>
									</li>
								</StaggerItem>

								<StaggerItem>
									<li>
										<h4>Secure and Private</h4>
										<p>Your data, protected with cutting-edge encryption</p>
									</li>
								</StaggerItem>

								<StaggerItem>
									<li>
										<h4>Real-Time Insights</h4>
										<p>
											Instant feedback on your financial
											standing so you can act fast
										</p>
									</li>
								</StaggerItem>
							</motion.ul>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Section 2 -- plain dark background */}
			<section className="py-20 md:py-40">
				<div className="nc-container">
					<div className="flex flex-col-reverse md:grid grid-cols-2 items-center gap-8 md:gap-16">
						<ScrollReveal className="space-y-8">
							<motion.p variants={fadeInUp} className="section-label section-label--green">
								Get Started
							</motion.p>
							<motion.h2
								variants={fadeInUp}
								className="subtitle"
							>
								Having Financial Troubles? Apply For Credit Today
							</motion.h2>

							<motion.ul
								variants={staggerContainer}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								className="space-y-3 benefits"
							>
								<StaggerItem>
									<li>Upload your mobile money statement in seconds</li>
								</StaggerItem>
								<StaggerItem>
									<li>Get a personalised credit score powered by AI</li>
								</StaggerItem>
								<StaggerItem>
									<li>
										Browse credit offers matched to your profile
									</li>
								</StaggerItem>
							</motion.ul>
						</ScrollReveal>

						<ScrollReveal>
							<motion.img
								variants={fadeInUp}
								src="/credit_score_simplified.svg"
								alt="Credit Score Simplified"
								className="max-w-full"
							/>
						</ScrollReveal>
					</div>
				</div>
			</section>
		</>
	);
};

export default AboutUs;
