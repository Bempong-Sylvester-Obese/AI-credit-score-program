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
import './analyses.css';

const data = [
	{ name: 'Jan', score: 600 },
	{ name: 'Feb', score: 650 },
	{ name: 'Mar', score: 615 },
	{ name: 'Apr', score: 700 },
	{ name: 'May', score: 750 },
	{ name: 'Jun', score: 800 },
];

const CreditScoreEvaluation = () => {
	return (
		<div className="container mx-auto">
			<div>
				<Card className="p-6 bg-black text-white rounded-2xl shadow-lg w-350 h-190">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-semibold">
							Financiial Profile Score (FPS) Evaluation
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
						<span className="text-4xl font-bold">800.6</span>
						<Badge className="bg-green-500 text-white">Excellent</Badge>
						<span className="text-green-500">+1.5%</span>
					</div>

					<div className="h-40 mt-4">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={data}>
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
