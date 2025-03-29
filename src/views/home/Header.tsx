import { Button } from '@/components/ui/button';
import mobileUi from '../../assets/images/mobile_ui.png';

function Header() {
	return (
		<header className="main-header pt-40 pb-16">
			<div className="container text-white md:grid grid-cols-2">
				<div className="flex flex-col justify-center gap-5">
					<p className="w-fit bg-[#FFFFFF2E] text-[#F9FAFB] px-4 py-1 rounded-[16px] text-[0.875rem] uppercase font-normal">
						100% Trusted Platform
					</p>
					<h1 className="!text-6xl font-semibold uppercase tracking-[1px]">
						Know Your Score. Own Your{' '}
						<span className="text-[#00B512]">Future</span>
					</h1>
					<p className="text-[1.125rem] max-w-[523px] font-medium text-[#DCDCDC] capitalize">
						Get an instant, AI-driven credit score and unlock better financial
						opportunities. No bias, no hassle, just smarter lending decisions
					</p>

					<Button variant="primary" className="mt-9">
						Get Your Score
					</Button>
				</div>

				<div className="md:ml-5">
					<img src={mobileUi} alt="Neural Cash Mobile App" />
				</div>
			</div>
		</header>
	);
}

export default Header;
