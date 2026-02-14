import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ScrollReveal, StaggerItem } from '@/components/animations/ScrollReveal';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const Services = () => {
	return (
		<section className="py-20 md:py-40" style={{ background: 'rgba(255,255,255,0.02)' }}>
			<div className="nc-container text-center">
				<ScrollReveal>
					<motion.p
						variants={fadeInUp}
						className="section-label section-label--green"
					>
						Services
					</motion.p>

					<motion.h2
						variants={fadeInUp}
						className="text-2xl md:text-5xl max-w-[700px] capitalize leading-[1.1] mx-auto mt-4 mb-16 md:mb-20 font-bold tracking-tight"
					>
						Helping you achieve financial success
					</motion.h2>
				</ScrollReveal>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="space-y-8"
				>
					<StaggerItem>
						<Card className="card-light md:grid grid-cols-2 items-center min-h-[200px] md:h-[380px] overflow-hidden">
							<div className="flex justify-center p-6">
								<img
									src="/neural_cash_mobile_preview.png"
									alt="Neural Cash Mobile Preview"
									className="max-w-full"
								/>
							</div>

							<div className="flex flex-col items-start gap-4 p-8 md:p-10">
								<img src="/globe.svg" alt="Globe" />
								<h4 className="secondary-title max-w-[445px]">
									AI-Powered Credit Scores From Your Transaction History
								</h4>
							</div>
						</Card>
					</StaggerItem>

					<StaggerItem>
						<div className="md:grid grid-cols-2 gap-8">
							<Card className="card-light py-10 px-8 md:py-14 md:px-10 pb-0">
								<div className="mb-16 text-left space-y-4">
									<img src="/chart_up.svg" alt="Chart Up" />

									<h4 className="secondary-title">
										Visualize Your Financial Profile Score
									</h4>

									<p className="text-[#676666] leading-relaxed">
										Track how your spending, saving, and transaction
										patterns shape your creditworthiness over time.
									</p>
								</div>

								<img
									src="/credit_score_stat.png"
									alt="Credit Score Chart"
									className="mx-auto max-w-full"
								/>
							</Card>

							<Card className="card-dark py-10 px-8 md:py-14 md:px-10 pb-0 mt-6 md:mt-0">
								<div className="mb-16 text-left space-y-4">
									<img src="/settings.svg" alt="Settings" />

									<h4 className="secondary-title">
										Personalized Insights And Financial Goals
									</h4>

									<p className="text-white/40 leading-relaxed">
										Receive tailored recommendations based on your
										unique financial behaviour to improve your score
										and unlock better credit offers.
									</p>
								</div>

								<div className="relative">
									<img
										src="/dashboard_1.png"
										alt="Dashboard"
										className="max-w-full"
									/>
								</div>
							</Card>
						</div>
					</StaggerItem>

					<StaggerItem>
						<div className="md:grid grid-cols-3 gap-8 w-full text-left">
							<motion.div
								whileHover={{ y: -4 }}
								transition={{ duration: 0.3 }}
								className="px-8 py-10 md:px-10 md:py-16 space-y-4 bg-[#E2FF54] rounded-3xl"
							>
								<h4 className="secondary-title !text-3xl capitalize">
									Instant <br /> Results
								</h4>

								<p className="capitalize text-black/70 leading-relaxed">
									Upload your mobile money statement and get your
									credit score in seconds, not days.
								</p>
							</motion.div>

							<motion.div
								whileHover={{ y: -4 }}
								transition={{ duration: 0.3 }}
								className="rounded-3xl bg-[#F6F9F8] border border-[#0000000F] px-8 py-10 md:px-10 md:py-16 mt-6 md:mt-0"
							>
								<img src="/chart_up.svg" alt="Chart Up" />
								<h4 className="secondary-title !text-2xl capitalize mt-3">
									Track Your Score Over Time
								</h4>
							</motion.div>

							<motion.div
								whileHover={{ y: -4 }}
								transition={{ duration: 0.3 }}
								className="rounded-3xl bg-[#2D907A] text-white flex items-center justify-center px-8 py-10 md:px-10 md:py-16 mt-6 md:mt-0"
							>
								<h4 className="secondary-title !text-3xl capitalize !text-center">
									Access Tailored Credit Offers
								</h4>
							</motion.div>
						</div>
					</StaggerItem>
				</motion.div>
			</div>
		</section>
	);
};

export default Services;
