import { Link } from 'react-router-dom';
import { MobileNav } from '@/components/navigation/MobileNav';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState, FormEvent, useEffect } from 'react';
import { getUserProfile, updateUserProfile, createUserProfile } from '@/lib/api';

const Settings = () => {
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');
	const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'data'>('profile');

	const [profileData, setProfileData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		mobile: '',
		postalAddress: '',
		employmentStatus: '',
	});

	const [notificationSettings, setNotificationSettings] = useState({
		emailNotifications: true,
		smsNotifications: false,
		scoreUpdates: true,
		creditOffers: true,
		weeklyReports: true,
		securityAlerts: true,
	});

	const [privacySettings, setPrivacySettings] = useState({
		shareDataForResearch: false,
		showScorePublicly: false,
		dataRetentionPeriod: '12',
	});

	// Load user profile on mount
	useEffect(() => {
		const loadProfile = async () => {
			try {
				setIsLoading(true);
				setError('');
				const profile = await getUserProfile();
				setProfileData({
					firstName: profile.first_name || '',
					lastName: profile.last_name || '',
					email: profile.email || '',
					mobile: profile.mobile || '',
					postalAddress: profile.postal_address || '',
					employmentStatus: profile.employment_status || '',
				});
			} catch (err) {
				// Profile might not exist yet, which is okay
				if (err instanceof Error && !err.message.includes('404')) {
					setError('Failed to load profile. Please try again.');
					console.error('Error loading profile:', err);
				}
			} finally {
				setIsLoading(false);
			}
		};

		loadProfile();
	}, []);

	const handleProfileSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsSaving(true);
		setError('');
		setSuccess('');

		try {
			const profileUpdate = {
				first_name: profileData.firstName || undefined,
				last_name: profileData.lastName || undefined,
				email: profileData.email || undefined,
				mobile: profileData.mobile || undefined,
				postal_address: profileData.postalAddress || undefined,
				employment_status: profileData.employmentStatus || undefined,
			};

			// Try to update first, if it fails, try to create
			try {
				await updateUserProfile(profileUpdate);
				setSuccess('Profile updated successfully!');
			} catch {
				// If update fails, try creating new profile
				await createUserProfile(profileUpdate);
				setSuccess('Profile created successfully!');
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to save profile. Please try again.');
		} finally {
			setIsSaving(false);
		}
	};

	const handleNotificationChange = (key: keyof typeof notificationSettings) => {
		setNotificationSettings((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const handlePrivacyChange = (key: keyof typeof privacySettings) => {
		setPrivacySettings((prev) => ({
			...prev,
			[key]: !prev[key],
		}));
	};

	const handleDataExport = () => {
		alert('Your data export will be sent to your email shortly.');
	};

	const handleAccountDeletion = () => {
		if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
			alert('Account deletion request submitted. We will process it within 30 days.');
		}
	};

	return (
		<div>
			<nav className="main-navigation absolute left-0 right-0 top-6 z-50 px-4">
				<div className="flex items-center justify-end md:justify-center">
					<div className="hidden md:flex items-center gap-4 md:gap-10">
						<Link to="/">Home</Link>
						<Link to="/generate-credit">Generate FPS</Link>
						<Link to="/take-credit">Credit Offers</Link>
						<Link to="/ai-insights">AI Insights</Link>
						<Link to="/settings" className="font-semibold">
							Settings
						</Link>
					</div>
					<MobileNav>
						<Link to="/" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Home</Link>
						<Link to="/generate-credit" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Generate FPS</Link>
						<Link to="/take-credit" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Credit Offers</Link>
						<Link to="/ai-insights" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">AI Insights</Link>
						<Link to="/settings" className="block py-2 text-[#E2FF54] font-semibold">Settings</Link>
					</MobileNav>
				</div>
			</nav>

			<main className="nc-container pt-24 md:pt-40 pb-20">
				{/* Header */}
				<section className="text-center mb-16 animate fade-up">
					<p className="tag tag-no-emoji">Settings</p>
					<h1 className="font-bold text-3xl md:text-6xl max-w-[700px] mx-auto leading-[1.2] font-montserrat py-10">
						Personalize Your Experience
					</h1>
					<p className="text-xl text-gray-600 max-w-[600px] mx-auto">
						Manage your profile, preferences, and account settings to get the most out of
						NeuralCash.
					</p>
				</section>

				{/* Tabs */}
				<div className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 animate fade-up delay-30">
					<button
						onClick={() => setActiveTab('profile')}
						className={`px-6 py-3 font-medium transition-colors ${
							activeTab === 'profile'
								? 'border-b-2 border-blue-600 text-blue-600'
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						Profile
					</button>
					<button
						onClick={() => setActiveTab('notifications')}
						className={`px-6 py-3 font-medium transition-colors ${
							activeTab === 'notifications'
								? 'border-b-2 border-blue-600 text-blue-600'
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						Notifications
					</button>
					<button
						onClick={() => setActiveTab('privacy')}
						className={`px-6 py-3 font-medium transition-colors ${
							activeTab === 'privacy'
								? 'border-b-2 border-blue-600 text-blue-600'
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						Privacy
					</button>
					<button
						onClick={() => setActiveTab('data')}
						className={`px-6 py-3 font-medium transition-colors ${
							activeTab === 'data'
								? 'border-b-2 border-blue-600 text-blue-600'
								: 'text-gray-600 hover:text-gray-900'
						}`}
					>
						Data Management
					</button>
				</div>

				{/* Profile Tab */}
				{activeTab === 'profile' && (
					<Card className="p-8 animate fade-up delay-30">
						<h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
						{isLoading ? (
							<div className="flex items-center justify-center py-12">
								<div className="text-center">
									<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
									<p className="mt-4 text-gray-600">Loading profile...</p>
								</div>
							</div>
						) : (
							<form onSubmit={handleProfileSubmit} className="space-y-6">
							<div className="md:grid grid-cols-2 gap-6">
								<div>
									<label htmlFor="firstName" className="block text-sm font-medium mb-2">
										First Name
									</label>
									<Input
										id="firstName"
										value={profileData.firstName}
										onChange={(e) =>
											setProfileData((prev) => ({ ...prev, firstName: e.target.value }))
										}
										placeholder="Enter your first name"
									/>
								</div>
								<div>
									<label htmlFor="lastName" className="block text-sm font-medium mb-2">
										Last Name
									</label>
									<Input
										id="lastName"
										value={profileData.lastName}
										onChange={(e) =>
											setProfileData((prev) => ({ ...prev, lastName: e.target.value }))
										}
										placeholder="Enter your last name"
									/>
								</div>
							</div>

							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-2">
									Email Address
								</label>
								<Input
									id="email"
									type="email"
									value={profileData.email}
									onChange={(e) =>
										setProfileData((prev) => ({ ...prev, email: e.target.value }))
									}
									placeholder="Enter your email address"
								/>
							</div>

							<div>
								<label htmlFor="mobile" className="block text-sm font-medium mb-2">
									Mobile Number
								</label>
								<Input
									id="mobile"
									type="tel"
									value={profileData.mobile}
									onChange={(e) =>
										setProfileData((prev) => ({ ...prev, mobile: e.target.value }))
									}
									placeholder="Enter your mobile number"
								/>
							</div>

							<div>
								<label htmlFor="postalAddress" className="block text-sm font-medium mb-2">
									Postal Address
								</label>
								<Input
									id="postalAddress"
									value={profileData.postalAddress}
									onChange={(e) =>
										setProfileData((prev) => ({ ...prev, postalAddress: e.target.value }))
									}
									placeholder="Enter your postal address"
								/>
							</div>

							<div>
								<label htmlFor="employmentStatus" className="block text-sm font-medium mb-2">
									Employment Status
								</label>
								<Input
									id="employmentStatus"
									value={profileData.employmentStatus}
									onChange={(e) =>
										setProfileData((prev) => ({ ...prev, employmentStatus: e.target.value }))
									}
									placeholder="e.g., Employed, Self-employed, Student"
								/>
							</div>

							{error && (
								<div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
									{error}
								</div>
							)}
							{success && (
								<div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
									{success}
								</div>
							)}
							<div className="flex gap-4">
								<Button type="submit" variant="primary" disabled={isSaving}>
									{isSaving ? 'Saving...' : 'Save Changes'}
								</Button>
								<Button
									type="button"
									variant="outline-secondary"
									onClick={() => setProfileData({ firstName: '', lastName: '', email: '', mobile: '', postalAddress: '', employmentStatus: '' })}
								>
									Reset
								</Button>
							</div>
						</form>
						)}
					</Card>
				)}

				{/* Notifications Tab */}
				{activeTab === 'notifications' && (
					<Card className="p-8 animate fade-up delay-30">
						<h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
						<p className="text-gray-600 mb-8">
							Choose how you want to be notified about your financial profile and account
							updates.
						</p>

						<div className="space-y-6">
							<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
								<div>
									<h3 className="font-semibold mb-1">Email Notifications</h3>
									<p className="text-sm text-gray-600">
										Receive important updates via email
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={notificationSettings.emailNotifications}
										onChange={() => handleNotificationChange('emailNotifications')}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
								<div>
									<h3 className="font-semibold mb-1">SMS Notifications</h3>
									<p className="text-sm text-gray-600">
										Receive updates via text message
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={notificationSettings.smsNotifications}
										onChange={() => handleNotificationChange('smsNotifications')}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
								<div>
									<h3 className="font-semibold mb-1">Score Updates</h3>
									<p className="text-sm text-gray-600">
										Get notified when your credit score changes
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={notificationSettings.scoreUpdates}
										onChange={() => handleNotificationChange('scoreUpdates')}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
								<div>
									<h3 className="font-semibold mb-1">Credit Offers</h3>
									<p className="text-sm text-gray-600">
										Receive personalized credit offers and recommendations
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={notificationSettings.creditOffers}
										onChange={() => handleNotificationChange('creditOffers')}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
								<div>
									<h3 className="font-semibold mb-1">Weekly Reports</h3>
									<p className="text-sm text-gray-600">
										Receive weekly financial summary reports
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={notificationSettings.weeklyReports}
										onChange={() => handleNotificationChange('weeklyReports')}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
								<div>
									<h3 className="font-semibold mb-1">Security Alerts</h3>
									<p className="text-sm text-gray-600">
										Get notified about important security events
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={notificationSettings.securityAlerts}
										onChange={() => handleNotificationChange('securityAlerts')}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>
						</div>
					</Card>
				)}

				{/* Privacy Tab */}
				{activeTab === 'privacy' && (
					<Card className="p-8 animate fade-up delay-30">
						<h2 className="text-2xl font-semibold mb-6">Privacy Settings</h2>
						<p className="text-gray-600 mb-8">
							Control how your data is used and shared to protect your privacy.
						</p>

						<div className="space-y-6">
							<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
								<div>
									<h3 className="font-semibold mb-1">Share Data for Research</h3>
									<p className="text-sm text-gray-600">
										Allow anonymized data to be used for improving our AI models
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={privacySettings.shareDataForResearch}
										onChange={() => handlePrivacyChange('shareDataForResearch')}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>

							<div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
								<div>
									<h3 className="font-semibold mb-1">Show Score Publicly</h3>
									<p className="text-sm text-gray-600">
										Allow your credit score to be visible in public rankings
									</p>
								</div>
								<label className="relative inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={privacySettings.showScorePublicly}
										onChange={() => handlePrivacyChange('showScorePublicly')}
										className="sr-only peer"
									/>
									<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
								</label>
							</div>

							<div className="p-4 border border-gray-200 rounded-lg">
								<label htmlFor="dataRetention" className="block font-semibold mb-3">
									Data Retention Period
								</label>
								<select
									id="dataRetention"
									value={privacySettings.dataRetentionPeriod}
									onChange={(e) =>
										setPrivacySettings((prev) => ({
											...prev,
											dataRetentionPeriod: e.target.value,
										}))
									}
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="3">3 months</option>
									<option value="6">6 months</option>
									<option value="12">12 months</option>
									<option value="24">24 months</option>
									<option value="indefinite">Keep indefinitely</option>
								</select>
								<p className="text-sm text-gray-600 mt-2">
									How long to keep your transaction data for credit score calculation
								</p>
							</div>
						</div>
					</Card>
				)}

				{/* Data Management Tab */}
				{activeTab === 'data' && (
					<div className="space-y-6 animate fade-up delay-30">
						<Card className="p-8">
							<h2 className="text-2xl font-semibold mb-6">Data Management</h2>
							<p className="text-gray-600 mb-8">
								Download your data or manage your account information.
							</p>

							<div className="space-y-6">
								<div className="p-6 border border-gray-200 rounded-lg">
									<h3 className="font-semibold mb-2">Export Your Data</h3>
									<p className="text-sm text-gray-600 mb-4">
										Download a copy of your financial profile, transaction history, and
										credit score data in CSV format.
									</p>
									<Button variant="primary" onClick={handleDataExport}>
										Export Data
									</Button>
								</div>

								<div className="p-6 border border-red-200 rounded-lg bg-red-50">
									<h3 className="font-semibold mb-2 text-red-900">
										Danger Zone
									</h3>
									<p className="text-sm text-red-700 mb-4">
										Permanently delete your account and all associated data. This action
										cannot be undone.
									</p>
									<Button
										variant="destructive"
										onClick={handleAccountDeletion}
										className="bg-red-600 hover:bg-red-700"
									>
										Delete Account
									</Button>
								</div>
							</div>
						</Card>
					</div>
				)}
			</main>

			{/* Footer */}
			<footer className="py-[7rem] bg-[#F6F9F8] mt-20">
				<div className="nc-container">
					<img
						src="/brand_logo.png"
						alt="Neural Cash logo"
						className="my-20 mx-auto"
					/>
					<div className="text-center space-x-10 footer-links">
						<Link to="/">Home</Link>
						<Link to="/generate-credit">Credit Score</Link>
						<Link to="/take-credit">Loan Offers</Link>
						<Link to="/ai-insights">AI Insights</Link>
						<Link to="/settings" className="font-semibold">
							Settings
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Settings;

