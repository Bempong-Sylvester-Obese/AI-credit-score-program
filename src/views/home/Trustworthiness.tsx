import { Button } from '@/components/ui/button';

const Trustworthiness = () => {
	return (
		<section className="py-[5.5rem] trustworthiness">
			<div className="container md:grid grid-cols-2 items-center">
				<img src="/visa_card.png" alt="Visa Card" />

				<div className="space-y-3">
					<p className="tag">Trustworthiness</p>
					<h2 className="text-5xl leading-[1.2]">
						We value your trust and security
					</h2>

					<p className="text-[1rem] text-[#dbdbdb]">
						Our mission is to make finance more accessible, transparent, and
						secure for everyone. With cutting.
					</p>

					<Button variant="primary" className="mt-10">
						Get Started
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Trustworthiness;
