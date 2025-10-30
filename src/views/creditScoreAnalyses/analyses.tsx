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
import type { PredictionResult } from '@/types/credit';
import './analyses.css';

const CreditScoreEvaluation = () => {
	const location = useLocation();
	const prediction = (location.state as { prediction: PredictionResult })?.prediction;

	const generateHistoricalData = (currentScore: number) => {
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
		const baseVariation = currentScore * 0.1;
		return months.map((name, index) => ({
			name,
			score: Math.round(currentScore - baseVariation + (index * baseVariation) / months.length),
		}));
	};

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
	const chartData = generateHistoricalData(prediction.credit_score);

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
								Last 6 Months <ChevronDown className="ml-1 h-4 w-4" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>Last 3 Months</DropdownMenuItem>
								<DropdownMenuItem>Last 6 Months</DropdownMenuItem>
								<DropdownMenuItem>Last 12 Months</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<div className="flex items-center gap-2">
						<span className="text-4xl font-bold">{prediction.credit_score}</span>
						<Badge className={`${riskThreshold.badgeColor} text-white`}>
							{prediction.risk_category}
						</Badge>
						<span className="text-green-500">+1.5%</span>
					</div>

					<div className="h-40 mt-4">
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
