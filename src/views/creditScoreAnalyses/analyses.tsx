import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
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
			<div className="container mx-auto p-8">
				<Card className="p-12 bg-black text-white rounded-2xl shadow-lg text-center">
					<h2 className="text-2xl font-semibold mb-4">No Credit Score Data</h2>
					<p className="text-gray-400 mb-8">
						Please generate your Financial Profile Score first
					</p>
					<Link
						to="/generate-credit"
						className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
					>
						Generate FPS
					</Link>
				</Card>
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
		<div className="container mx-auto">
			<div>
				<Card className="p-6 bg-black text-white rounded-2xl shadow-lg w-full max-w-4xl">
					<div className="flex justify-between items-center mb-4">
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

					<div className="flex items-center gap-2">
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

					<div className="h-40 mt-4">
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
								<LineChart data={chartData}>
									<XAxis dataKey="name" stroke="#aaa" />
									<YAxis domain={[400, 1000]} stroke="#aaa" />
									<Tooltip
										contentStyle={{ backgroundColor: 'black', color: 'white' }}
									/>
									<Line
										type="monotone"
										dataKey="score"
										stroke="#facc15"
										strokeWidth={2}
										dot={false}
									/>
								</LineChart>
							</ResponsiveContainer>
						) : (
							<div className="flex items-center justify-center h-full text-gray-400 text-sm">
								No historical data available
							</div>
						)}
					</div>

					<div className="mt-4">
						<h2 className="text-lg font-semibold">Smart Credit Strategies</h2>
						<div className="mt-2 space-y-1">
							<div className="flex justify-between text-sm">
								<span>On-time Payments</span>{' '}
								<span>
									<p>Seamless, stress free payments- right on time!</p>
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Credit Utilization</span>{' '}
								<span>
									<p>
										Use your good credit to finance assests that appreciate in
										value.
									</p>
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Credit Age</span>{' '}
								<span>
									<p>
										Great Score! Grow your financial reputation with every
										month.
									</p>
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Spending vs. Savings </span>{' '}
								<span>
									<p>You deposit ₵500 weekly but withdraw 20% within 7 days.</p>
								</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Credit Mix</span>{' '}
								<span>
									<p>Expand wisely. Know when to use credit cards or loans.</p>
								</span>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default CreditScoreEvaluation;
