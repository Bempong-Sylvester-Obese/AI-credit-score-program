const Partners = () => {
	return (
		<section className="bg-[#00B512] relative overflow-hidden">
			{/* Fade edges to dark */}
			<div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0f0f0f]/30 to-transparent z-10 pointer-events-none" />
			<div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0f0f0f]/30 to-transparent z-10 pointer-events-none" />
			<div className="nc-container relative z-20">
				<div className="flex flex-wrap items-center justify-center md:justify-between w-full py-8 md:py-10 gap-6 md:gap-4">
				<img
					src="/achieve-logo-transparent.svg"
					alt="Spherule"
					className="w-12 h-8 sm:w-16 sm:h-10 md:w-[90px] md:h-auto object-contain opacity-90"
				/>
				<img
					src="/mtn-mobile-logo-icon.svg"
					alt="MTN momo"
					className="w-12 h-8 sm:w-16 sm:h-10 md:w-[90px] md:h-[50px] object-contain opacity-90"
				/>
				<img
					src="/vodafone-icon.svg"
					alt="telecel"
					className="w-12 h-8 sm:w-16 sm:h-10 md:w-[90px] md:h-[50px] object-contain opacity-90"
				/>
				<img src="/amazon_pay.svg" alt="Amazon" className="w-12 h-8 sm:w-16 sm:h-10 md:w-auto md:h-auto object-contain opacity-90" />
				<img src="/paypal.svg" alt="Paypal" className="w-12 h-8 sm:w-16 sm:h-10 md:w-auto md:h-auto object-contain opacity-90" />
				<img src="/alipay.svg" alt="Alipay" className="w-12 h-8 sm:w-16 sm:h-10 md:w-auto md:h-auto object-contain opacity-90" />
				</div>
			</div>
		</section>
	);
};

export default Partners;
