import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/UseAuth';

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { signInWithGoogle } = useAuth();
	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		try {
			setIsLoading(true);
			setError('');
			await signInWithGoogle();
			navigate('/');
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
			setIsLoading(false);
		}
	};

	return (
		<main className="">
			<div className="nc-container md:grid grid-cols-3 min-h-screen">
				<section className="col-span-2 mr-20">
					<img
						src="/login-banner.png"
						alt="Login Banner"
						className="mt-5 translate-y-10"
					/>
				</section>

				<section className="flex flex-col justify-between py-8 h-full animate fade-up">
					<img
						src="/login-logo.svg"
						alt="Login Logo. I run out of name ideas here!"
						width={72}
						height={72}
					/>

					<div>
						<h1 className="!text-4xl mb-3">Login to your account</h1>
						<p className="text-[1rem]">
							See what is going on with your business
						</p>

						{error && (
							<div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
								{error}
							</div>
						)}

						<Button
							onClick={handleGoogleSignIn}
							disabled={isLoading}
							className="w-full rounded-[5px] bg-transparent border border-[#E8E8E8] text-[#828282] capitalize my-5 hover:bg-transparent"
						>
							{isLoading ? (
								<span>Signing in...</span>
							) : (
								<>
									<img src="/google-icon.svg" alt="Google" />
									<span>Continue with Google</span>
								</>
							)}
						</Button>

						<span className="text-[#A1A1A1] text-xs flex items-center justify-center mb-5">
							------or Sign in with Email------
						</span>

						<div>
							<label htmlFor="email" className="text-[#828282] text-sm">
								Email
							</label>
							<Input
								id="email"
								name="email"
								placeholder="mail@abc.com"
								className="w-full rounded-[5px] bg-transparent border border-[#E8E8E8] text-[#828282] shadow-none placeholder:text-[#E0E0E0] placeholder:text-xs py-5"
							/>
						</div>

						<div className="mt-3">
							<label htmlFor="password" className="text-[#828282] text-sm">
								Password
							</label>
							<Input
								id="password"
								type="password"
								name="password"
								// placeholder="***********"
								className="w-full rounded-[5px] !bg-transparent border border-[#E8E8E8] text-[#828282] !shadow-none placeholder:text-[#E0E0E0] placeholder:text-xs !outline-none py-5"
							/>
						</div>

						<div className="text-xs flex items-center justify-between mt-3 mb-7">
							<div>
								<label htmlFor="remember-me">
									<input
										type="checkbox"
										name="remember-me"
										id="remember-me"
										className="bg-transparent"
									/>
									<span className="text-[#A1A1A1] ml-2">Remember Me</span>
								</label>
							</div>

							<span className="text-[#267F47]">Forgot Password?</span>
						</div>

						<Button className="w-full rounded-[5px] bg-[#267F47] text-lg">
							Login
						</Button>
					</div>

					<span className="text-sm text-center">
						Not Registered Yet?{' '}
						<span className="text-[#7F265B] font-semibold">
							Create an account
						</span>
					</span>
				</section>
			</div>
		</main>
	);
};

export default Login;
