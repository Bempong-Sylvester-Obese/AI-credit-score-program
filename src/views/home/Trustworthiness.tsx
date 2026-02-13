const Trustworthiness = () => {
	return (
		<section className="py-[5.5rem] trustworthiness">
			<div className="nc-container">
				<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
					<img src="/visa_card.png" alt="Visa Card" className="max-w-full w-full md:w-auto order-1 md:order-none" />

					<div className="space-y-3 order-2 md:order-none">
						<p className="tag">Trustworthiness</p>
						<h2 className="text-3xl md:text-5xl leading-[1.2]">
							We value your trust and security
						</h2>

						<p className="text-[1rem] text-[#dbdbdb]">
							Our mission is to make financial decisions more accessible,
							informed, and secure for everyone.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Trustworthiness;
