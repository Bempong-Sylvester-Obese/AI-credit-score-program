import { Button } from '@/components/ui/button';

const Services = () => {
	return (
		<section className="pt-[5rem] pb-[8rem]">
			<div className="container text-center">
				<p className="tag tag-white mx-auto">Services</p>

				<h2 className="text-5xl max-w-[615px] capitalize leading-[1.2] mx-auto mt-[1rem] mb-14">
					Can help you achieve financial success
				</h2>

				<div className="space-y-6">
					<div className="card-light md:grid grid-cols-2 items-center h-[352px] overflow-hidden">
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
					</div>

					<div className="md:grid grid-cols-2 gap-6">
						<div className="card-light py-[3.5rem] px-[3rem] pb-0">
							<div className="mb-16 text-left space-y-3">
								<img src="/chart_up.svg" alt="Chart Up" />

								<h4 className="secondary-title">
									Create A Card That Is Unique And Customized
								</h4>

								<p className="text-[#676666] capitalize">
									we offer a comprehensive range of innovative financial
									services tailored to meet your needs. Our services include
									High-Yield Savings Accounts.
								</p>
							</div>

							<img
								src="/credit_score_stat.png"
								alt="Credit Score Chart"
								className="mx-auto"
							/>
						</div>

						<div className="card-dark py-[3.5rem] px-[3rem] pb-0">
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
						</div>
					</div>

					<div className="md:grid grid-cols-3 gap-6 w-full text-left">
						<div className="px-[31px] py-[64px] space-y-4 bg-[#E2FF54] rounded-[20px]">
							<h4 className="secondary-title !text-3xl capitalize">
								100% <br /> Dedication
							</h4>

							<p className="capitalize">
								we offer a comprehensive range of innovative financial services
								tailored to meet your needs.
							</p>
						</div>

						<div className="rounded-[20px] bg-[#F6F9F8] border border-[#0000000F] px-[31px] py-[64px] expense-details">
							<img src="/chart_up.svg" alt="Chart Up" />
							<h4 className="secondary-title !text-2xl capitalize mt-2">
								Hold money in 30+ currencies
							</h4>
						</div>

						<div className="rounded-[20px] bg-[#2D907A] text-white flex items-center justify-center px-[31px] py-[64px]">
							<h4 className="secondary-title !text-3xl capitalize !text-center">
								Visit our services pages
							</h4>
						</div>
					</div>

					<Button variant="outline-secondary" className="mt-10">
						View More
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Services;
