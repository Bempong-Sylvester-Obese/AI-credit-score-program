import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

const Trustworthiness = () => {
	return (
		<section
			className="py-20 md:py-40"
			style={{
				background: 'linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
			}}
		>
			<div className="nc-container">
				<div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
					<ScrollReveal>
						<motion.img
							variants={fadeInUp}
							src="/visa_card.png"
							alt="Visa Card"
							className="max-w-full w-full md:w-auto order-1 md:order-none rounded-2xl"
						/>
					</ScrollReveal>

					<ScrollReveal className="space-y-6 order-2 md:order-none">
						<motion.p variants={fadeInUp} className="section-label section-label--green">
							Trustworthiness
						</motion.p>
						<motion.h2
							variants={fadeInUp}
							className="text-3xl md:text-5xl leading-[1.1] font-bold tracking-tight"
						>
							We value your trust and security
						</motion.h2>

						<motion.p
							variants={fadeInUp}
							className="text-base md:text-lg text-white/50 leading-relaxed"
						>
							Our mission is to make financial decisions more accessible,
							informed, and secure for everyone. We use bank-grade encryption
							and never share your data without your explicit consent.
						</motion.p>
					</ScrollReveal>
				</div>
			</div>
		</section>
	);
};

export default Trustworthiness;
