import {
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Area,
	AreaChart,
} from 'recharts';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { getRiskThreshold } from '@/constants/credit';
import { getScoreHistory } from '@/lib/api';
import type { PredictionResult, ScoreHistoryItem } from '@/types/credit';
import { useState, useEffect } from 'react';
import { fadeInUp, scaleIn } from '@/lib/animations';
import './analyses.css';

const CreditScoreEvaluation = () => {
	const location = useLocation();
	const prediction = (location.state as { prediction: PredictionResult })?.prediction;
	const [historyData, setHistoryData] = useState<ScoreHistoryItem[]>([]);
	const [isLoadingHistory, setIsLoadingHistory] = useState(true);
	const [historyError, setHistoryError] = useState<string>('');
	const [selectedPeriod, setSelectedPeriod] = useState<3 | 6 | 12>(6);

	// Fetch historical data from API
	useEffect(() => {
		const fetchHistory = async () => {
			if (!prediction) {
				setIsLoadingHistory(false);
				return;
			}

			try {
				setIsLoadingHistory(true);
				setHistoryError('');
				const history = await getScoreHistory(selectedPeriod);
				setHistoryData(history);
			} catch (err) {
				setHistoryError(err instanceof Error ? err.message : 'Failed to load score history');
				// Fallback to current score if history fails
				if (prediction) {
					setHistoryData([{
						score: prediction.credit_score,
						category: prediction.risk_category,
						risk_probability: prediction.risk_probability,
						date: new Date().toISOString(),
					}]);
				}
			} finally {
				setIsLoadingHistory(false);
			}
		};

		fetchHistory();
	}, [prediction, selectedPeriod]);

	// Format data for chart
	const chartData = historyData.map((item, index) => {
		const date = item.date ? new Date(item.date) : new Date();
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return {
			name: monthNames[date.getMonth()] || `Month ${index + 1}`,
			score: item.score,
		};
	}).reverse(); // Show oldest to newest

	if (!prediction) {
		return (
			<div className="nc-container py-20 md:py-32">
				<div className="max-w-md mx-auto text-center">
					<p className="section-label section-label--green mb-6">Credit Analysis</p>
					<h2 className="text-2xl font-semibold mb-4 text-white">No Credit Score Data</h2>
					<p className="text-white/50 mb-8">
						Please generate your Financial Profile Score first
					</p>
					<Link
						to="/generate-credit"
						className="inline-block px-8 py-3 bg-[#00B512] text-white rounded-xl hover:bg-[#00a010] transition-colors font-medium"
					>
						Generate Score
					</Link>
				</div>
			</div>
		);
	}

	const riskThreshold = getRiskThreshold(prediction.credit_score);

	// Calculate percentage change for historical data
	const getPercentageChange = () => {
		if (chartData.length < 2) return null;
		const current = chartData[chartData.length - 1]?.score || prediction.credit_score;
		const previous = chartData[chartData.length - 2]?.score || current;
		const change = ((current - previous) / previous) * 100;
		return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
	};

	const percentageChange = getPercentageChange();

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={scaleIn}
			className="nc-container py-10 md:py-16 min-w-0"
		>
			<p className="section-label section-label--green mb-6">Credit Analysis</p>
			<div>
				<Card hover glass className="p-6 md:p-10 text-white rounded-2xl w-full max-w-4xl min-w-0" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
						<h2 className="text-lg font-semibold">
							Financial Profile Score (FPS) Evaluation
						</h2>
						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center text-gray-400">
								Last {selectedPeriod} Months <ChevronDown className="ml-1 h-4 w-4" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => setSelectedPeriod(3)}>Last 3 Months</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setSelectedPeriod(6)}>Last 6 Months</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setSelectedPeriod(12)}>Last 12 Months</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<div className="flex flex-col sm:flex-row sm:items-center gap-2">
						<span className="text-4xl font-bold">{prediction.credit_score}</span>
						<Badge className={`${riskThreshold.badgeColor} text-white`}>
							{prediction.risk_category}
						</Badge>
						{percentageChange && (
							<span className={percentageChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
								{percentageChange}
							</span>
						)}
					</div>

					<motion.div
						initial="hidden"
						animate="visible"
						variants={fadeInUp}
						className="h-40 mt-4 min-w-0"
					>
						{isLoadingHistory ? (
							<div className="flex items-center justify-center h-full">
								<div className="text-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
									<p className="mt-2 text-gray-400 text-sm">Loading history...</p>
								</div>
							</div>
						) : historyError ? (
							<div className="flex items-center justify-center h-full text-yellow-400 text-sm">
								{historyError}
							</div>
						) : chartData.length > 0 ? (
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={chartData}>
									<defs>
										<linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#facc15" stopOpacity={0.8} />
											<stop offset="95%" stopColor="#facc15" stopOpacity={0} />
										</linearGradient>
									</defs>
									<XAxis dataKey="name" stroke="#aaa" />
									<YAxis domain={[400, 1000]} stroke="#aaa" />
									<Tooltip
										contentStyle={{
											backgroundColor: 'rgba(0, 0, 0, 0.9)',
											color: 'white',
											border: '1px solid rgba(250, 204, 21, 0.3)',
											borderRadius: '8px',
											padding: '8px 12px',
										}}
										cursor={{ stroke: '#facc15', strokeWidth: 2 }}
									/>
									<Area
										type="monotone"
										dataKey="score"
										stroke="#facc15"
										strokeWidth={3}
										fill="url(#scoreGradient)"
										dot={{ fill: '#facc15', r: 4 }}
										animationDuration={1000}
										animationBegin={0}
									/>
								</AreaChart>
							</ResponsiveContainer>
						) : (
							<div className="flex items-center justify-center h-full text-gray-400 text-sm">
								No historical data available
							</div>
						)}
					</motion.div>

					<div className="mt-8 pt-6 border-t border-white/10">
						<h2 className="text-lg font-semibold text-white/90 mb-4">Smart Credit Strategies</h2>
						<div className="space-y-4">
							<div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
								<span className="font-medium">On-time Payments</span>
								<span>
									<p>Seamless, stress free payments- right on time!</p>
								</span>
							</div>
							<div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
								<span className="font-medium">Credit Utilization</span>
								<span>
									<p>
										Use your good credit to finance assests that appreciate in
										value.
									</p>
								</span>
							</div>
							<div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
								<span className="font-medium">Credit Age</span>
								<span>
									<p>
										Great Score! Grow your financial reputation with every
										month.
									</p>
								</span>
							</div>
							<div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
								<span className="font-medium">Spending vs. Savings</span>
								<span>
									<p>You deposit ₵500 weekly but withdraw 20% within 7 days.</p>
								</span>
							</div>
							<div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-sm">
								<span className="font-medium">Credit Mix</span>
								<span>
									<p>Expand wisely. Know when to use credit cards or loans.</p>
								</span>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</motion.div>
	);
};

export default CreditScoreEvaluation;
