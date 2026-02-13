import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollReveal, StaggerItem } from '@/components/animations/ScrollReveal';
import { ParallaxSection } from '@/components/animations/ParallaxSection';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const Services = () => {
	return (
		<section className="pt-[5rem] pb-[8rem]">
			<div className="nc-container text-center">
				<ScrollReveal>
					<motion.p
						variants={fadeInUp}
						className="tag tag-white mx-auto"
					>
						Services
					</motion.p>

					<motion.h2
						variants={fadeInUp}
						className="text-5xl max-w-[615px] capitalize leading-[1.2] mx-auto mt-[1rem] mb-14"
					>
						Can help you achieve financial success
					</motion.h2>
				</ScrollReveal>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="space-y-6"
				>
					<StaggerItem>
						<Card hover glass className="card-light md:grid grid-cols-2 items-center h-[352px] overflow-hidden">
						<div className="flex justify-center">
							<img
								src="/neural_cash_mobile_preview.png"
								alt="Neural Cash Mobile Preview"
								className="fade-left animate-on-scroll"
							/>

							<img
								src="/convertor_screen.png"
								alt="Convertor Screen Preview"
								className="-ml-20 mt-10 fade-right animate-on-scroll"
							/>
						</div>

							<div className="flex flex-col items-start gap-3">
								<img src="/globe.svg" alt="Globe" />
								<h4 className="secondary-title max-w-[445px]">
									Transfers Across The Globe Are Free
								</h4>
							</div>
						</Card>
					</StaggerItem>

					<StaggerItem>
						<div className="md:grid grid-cols-2 gap-6">
							<Card hover glass className="card-light py-[3.5rem] px-[3rem] pb-0">
							<div className="mb-16 text-left space-y-3">
								<img src="/chart_up.svg" alt="Chart Up" />

								<h4 className="secondary-title">
									Visualize your Financial Profile Score(FPS)
								</h4>

								<p className="text-[#676666] capitalize">
									we offer a comprehensive range of innovative financial
									services tailored to meet your needs. Our services include
									monitoring your financial behaviour.
								</p>
							</div>

								<ParallaxSection speed={0.1}>
									<img
										src="/credit_score_stat.png"
										alt="Credit Score Chart"
										className="mx-auto"
									/>
								</ParallaxSection>
							</Card>

							<Card hover glass className="card-dark py-[3.5rem] px-[3rem] pb-0">
							<div className="mb-16 text-left space-y-3">
								<img src="/settings.svg" alt="Settings" />

								<h4 className="secondary-title">
									Personalized Insights And Financial Goals
								</h4>

								<p className="text-[#676666] capitalize">
									Savings accounts that offer competitive interest rates and
									flexible deposit options. Investment Invest wisely with our
									personalized.Our services include High-Yield Savings
								</p>
							</div>

							<div className="relative">
								<img
									src="/dashboard_1.png"
									alt="Dashboard"
									className="fade-left animate-on-scroll"
								/>
								<img
									src="/total_balance.png"
									alt="Total Balance"
									className="absolute right-10 top-20 fade-right animate-on-scroll"
								/>
							</div>
						</Card>
						</div>
					</StaggerItem>

					<StaggerItem>
						<div className="md:grid grid-cols-3 gap-6 w-full text-left">
							<motion.div
								whileHover={{ scale: 1.05 }}
								className="px-[31px] py-[64px] space-y-4 bg-[#E2FF54] rounded-[20px] transition-transform"
							>
							<h4 className="secondary-title !text-3xl capitalize">
								100% <br /> Dedication
							</h4>

								<p className="capitalize">
									we offer a comprehensive range of innovative financial services
									tailored to meet your needs.
								</p>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.05 }}
								className="rounded-[20px] bg-[#F6F9F8] border border-[#0000000F] px-[31px] py-[64px] expense-details transition-transform"
							>
								<img src="/chart_up.svg" alt="Chart Up" />
								<h4 className="secondary-title !text-2xl capitalize mt-2">
									Hold money in 30+ currencies
								</h4>
							</motion.div>

							<motion.div
								whileHover={{ scale: 1.05 }}
								className="rounded-[20px] bg-[#2D907A] text-white flex items-center justify-center px-[31px] py-[64px] transition-transform"
							>
								<h4 className="secondary-title !text-3xl capitalize !text-center">
									Visit our services pages
								</h4>
							</motion.div>
						</div>
					</StaggerItem>

					<StaggerItem>
						<Button variant="outline-secondary" className="mt-10">
							View More
						</Button>
					</StaggerItem>
				</motion.div>
			</div>
		</section>
	);
};

export default Services;
