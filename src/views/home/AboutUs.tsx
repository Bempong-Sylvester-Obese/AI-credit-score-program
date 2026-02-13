import { ScrollReveal, StaggerItem } from '@/components/animations/ScrollReveal';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { motion } from 'framer-motion';
import { fadeInLeft, fadeInUp, staggerContainer } from '@/lib/animations';

const AboutUs = () => {
	return (
		<div className="nc-container py-32">
			<section className="md:grid grid-cols-2 items-center gap-4">
				<ParallaxSection speed={0.3}>
					<motion.img
						src="/monthly_saving_stat.svg"
						alt="Monthly Saving Stat"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					/>
				</ParallaxSection>

				<ScrollReveal className="space-y-5">
					<motion.p
						variants={fadeInUp}
						className="tag tag-white"
					>
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
						className="space-y-[12px] features"
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
								<p>Your data, protected with cutting edge encryption</p>
							</li>
						</StaggerItem>

						<StaggerItem>
							<li>
								<h4>Real-Time Insights</h4>
								<p>
									We're committed to giving instant feedback on your financial
									standing
								</p>
							</li>
						</StaggerItem>

						<StaggerItem>
							<li>
								<h4>More Awesome Features</h4>
								<p>We're committed to adding more exciting features!</p>
							</li>
						</StaggerItem>
					</motion.ul>
				</ScrollReveal>
			</section>

			<section className="md:grid grid-cols-2 items-center gap-4 mt-48 mb-20">
				<ScrollReveal className="space-y-5">
					<motion.p
						variants={fadeInLeft}
						className="tag tag-white"
					>
						Featured
					</motion.p>
					<motion.h2
						variants={fadeInLeft}
						className="subtitle"
					>
						Having Financial Troubles?. You Can Apply For Credit Today!
					</motion.h2>

					<motion.ul
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="space-y-[12px] benefits"
					>
						<StaggerItem>
							<li>Extra Spending Power when you have Neural Cash</li>
						</StaggerItem>
						<StaggerItem>
							<li>Your data, protected with cutting-edge encryption</li>
						</StaggerItem>
						<StaggerItem>
							<li>
								We're committed to giving instant feedback on your financial
								standings
							</li>
						</StaggerItem>
						<StaggerItem>
							<li>We're committed to adding more exciting features soon!</li>
						</StaggerItem>
					</motion.ul>
				</ScrollReveal>

				<ParallaxSection speed={0.2}>
					<motion.img
						src="/credit_score_simplified.svg"
						alt="Credit Score Simplified"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
					/>
				</ParallaxSection>
			</section>
		</div>
	);
};

export default AboutUs;
