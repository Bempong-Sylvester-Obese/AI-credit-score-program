import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/useAuth';

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
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main>
			<div className="nc-container flex flex-col md:grid md:grid-cols-3 min-h-screen">
				<section className="hidden md:block md:col-span-2 mb-8 md:mb-0 md:mr-20">
				<img
					src="/login-banner.png"
					alt="Login Banner"
					className="mt-5 translate-y-10 max-w-full h-auto"
				/>
				</section>

				<section className="flex flex-col justify-center py-8 h-full animate fade-up gap-8">
					<img
						src="/login-logo.svg"
						alt="Neural Cash"
						width={72}
						height={72}
					/>

					<div>
						<h1 className="!text-4xl mb-3">Login to your account</h1>
						<p className="text-white/50">
							Access your credit score, insights, and offers
						</p>

						{error && (
							<div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded text-sm">
								{error}
							</div>
						)}

						<Button
							onClick={handleGoogleSignIn}
							disabled={isLoading}
							className="w-full rounded-lg bg-transparent border border-white/10 text-white/70 capitalize mt-8 hover:bg-white/5 hover:border-white/20 transition-all"
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
					</div>
				</section>
			</div>
		</main>
	);
};

export default Login;
