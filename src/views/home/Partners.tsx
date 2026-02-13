const Partners = () => {
	return (
		<section className="bg-[#00B512]">
			<div className="nc-container">
				<div className="flex flex-wrap items-center justify-center md:justify-between w-full py-5 gap-4">
					<img
						src="/achieve-logo-transparent.svg"
						alt="Spherule"
						className="w-12 h-8 md:w-[90px] md:h-auto object-contain"
					/>
					<img
						src="/mtn-mobile-logo-icon.svg"
						alt="MTN momo"
						className="w-12 h-8 md:w-[90px] md:h-[50px] object-contain"
					/>
					<img
						src="/vodafone-icon.svg"
						alt="telecel"
						className="w-12 h-8 md:w-[90px] md:h-[50px] object-contain"
					/>
					<img src="/amazon_pay.svg" alt="Amazon" className="w-12 h-8 md:w-auto md:h-auto object-contain" />
					<img src="/paypal.svg" alt="Paypal" className="w-12 h-8 md:w-auto md:h-auto object-contain" />
					<img src="/alipay.svg" alt="Alipay" className="w-12 h-8 md:w-auto md:h-auto object-contain" />
				</div>
			</div>
		</section>
	);
};

export default Partners;
