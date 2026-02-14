import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface QuoteProps {
	text: string;
	author: string;
	role: string;
}

export function Quote({ text, author, role }: QuoteProps) {
	return (
		<section className="py-20 md:py-32">
			<div className="nc-container-narrow text-center">
				<ScrollReveal>
					{/* Green accent line */}
					<motion.div
						variants={fadeInUp}
						className="w-12 h-[2px] bg-[#00B512] mx-auto mb-10"
					/>

					<motion.blockquote
						variants={fadeInUp}
						className="text-lg sm:text-xl md:text-2xl leading-relaxed italic text-white/80 mb-8 font-light"
						style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
					>
						"{text}"
					</motion.blockquote>

					<motion.div variants={fadeInUp}>
						<p className="text-sm font-semibold text-white/90 tracking-wide uppercase">
							{author}
						</p>
						<p className="text-xs text-white/40 mt-1 tracking-wider uppercase">
							{role}
						</p>
					</motion.div>
				</ScrollReveal>
			</div>
		</section>
	);
}
