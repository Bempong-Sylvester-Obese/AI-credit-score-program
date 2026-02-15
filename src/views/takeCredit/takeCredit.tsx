import { useNavigate, Link } from "react-router-dom";
import { MobileNav } from "@/components/navigation/MobileNav";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CreditCalculator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"calculate" | "offers" | "applications" | "payments">("calculate");
  const [creditAmount, setCreditAmount] = useState("");
  const [interestRate, setInterestRate] = useState("8");
  const [creditTerm, setCreditTerm] = useState("10");

  const calculateRepayment = () => {
    const amount = parseFloat(creditAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const days = parseFloat(creditTerm) || 0;
    const interest = (amount * rate * days) / (100 * 365);
    return {
      principal: amount,
      interest: interest,
      total: amount + interest,
      progress: (days / 30) * 100,
    };
  };

  const repayment = calculateRepayment();

  const navigateBackToHome = () => {
    return navigate("/analyses");
  };

  const availableOffers = [
    {
      id: 1,
      name: "Quick Cash",
      amount: "Up to GHS 1,000",
      interestRate: "8%",
      term: "7-14 days",
      features: ["Instant approval", "No collateral", "Flexible repayment"],
    },
    {
      id: 2,
      name: "Personal Loan",
      amount: "Up to GHS 5,000",
      interestRate: "12%",
      term: "1-3 months",
      features: ["Low interest rate", "Flexible terms", "Easy application"],
    },
    {
      id: 3,
      name: "Business Credit",
      amount: "Up to GHS 10,000",
      interestRate: "10%",
      term: "3-6 months",
      features: ["For businesses", "Competitive rates", "Quick processing"],
    },
  ];

  const applications = [
    {
      id: 1,
      offerName: "Quick Cash",
      amount: "GHS 500",
      status: "Approved",
      date: "2024-01-15",
      dueDate: "2024-01-29",
    },
    {
      id: 2,
      offerName: "Personal Loan",
      amount: "GHS 2,000",
      status: "Pending",
      date: "2024-01-20",
      dueDate: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <nav className="main-navigation fixed left-0 right-0 top-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10 px-4">
        <div className="nc-container flex items-center justify-between py-5">
          <Link to="/" className="flex items-center">
            <img src="/favicon.svg" alt="Neural Cash" className="h-6 md:h-8" />
          </Link>
          <div className="hidden md:flex items-center gap-12">
            <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Home</Link>
            <Link to="/generate-credit" className="text-sm text-white/70 hover:text-white transition-colors">Generate Score</Link>
            <Link to="/take-credit" className="text-sm text-white font-medium transition-colors">Credit Offers</Link>
            <Link to="/ai-insights" className="text-sm text-white/70 hover:text-white transition-colors">AI Insights</Link>
            <Link to="/settings" className="text-sm text-white/70 hover:text-white transition-colors">Settings</Link>
          </div>
          <MobileNav>
            <Link to="/" className="block py-2 text-white/80 hover:text-white transition-colors">Home</Link>
            <Link to="/generate-credit" className="block py-2 text-white/80 hover:text-white transition-colors">Generate Score</Link>
            <Link to="/take-credit" className="block py-2 text-[#00B512] font-semibold">Credit Offers</Link>
            <Link to="/ai-insights" className="block py-2 text-white/80 hover:text-white transition-colors">AI Insights</Link>
            <Link to="/settings" className="block py-2 text-white/80 hover:text-white transition-colors">Settings</Link>
          </MobileNav>
        </div>
      </nav>

      <main className="nc-container pt-28 md:pt-44 pb-20">
        {/* Header */}
        <section className="text-center mb-16">
          <p className="section-label section-label--green">Credit Offers</p>
          <h1 className="font-bold text-3xl md:text-6xl max-w-[700px] mx-auto leading-[1.1] font-montserrat py-10 tracking-tight text-white">
            Explore Credit Options
          </h1>
          <p className="text-lg text-white/50 max-w-[600px] mx-auto leading-relaxed">
            Calculate your credit, browse available offers, and manage your
            applications all in one place.
          </p>
        </section>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-12 border-b border-white/10">
          <button
            onClick={() => setActiveTab("calculate")}
            className={`px-3 py-2 text-sm md:px-6 md:py-3 md:text-base font-medium transition-colors ${
              activeTab === "calculate"
                ? "border-b-2 border-[#00B512] text-[#00B512]"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Calculate Credit
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`px-3 py-2 text-sm md:px-6 md:py-3 md:text-base font-medium transition-colors ${
              activeTab === "offers"
                ? "border-b-2 border-[#00B512] text-[#00B512]"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Browse Offers
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-3 py-2 text-sm md:px-6 md:py-3 md:text-base font-medium transition-colors ${
              activeTab === "applications"
                ? "border-b-2 border-[#00B512] text-[#00B512]"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            My Applications
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-3 py-2 text-sm md:px-6 md:py-3 md:text-base font-medium transition-colors ${
              activeTab === "payments"
                ? "border-b-2 border-[#00B512] text-[#00B512]"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Payment Plans
          </button>
        </div>

        {/* Calculate Credit Tab */}
        {activeTab === "calculate" && (
          <Card className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 className="text-2xl font-bold mb-6 text-white">Credit Calculator</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-[#00B512]">
                  Credit Amount (GHS)
                </label>
                <Input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  placeholder="400.00"
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#00B512]">
                    Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="8"
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#00B512]">
                    Credit Term (Days)
                  </label>
                  <Input
                    type="number"
                    value={creditTerm}
                    onChange={(e) => setCreditTerm(e.target.value)}
                    placeholder="10"
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>

              {creditAmount && (
                <div className="mt-8 p-6 rounded-xl" style={{ background: 'rgba(0,181,18,0.08)', border: '1px solid rgba(0,181,18,0.15)' }}>
                  <h3 className="text-lg font-bold mb-4 text-white">
                    Total Amount To Be Repaid
                  </h3>
                  <p className="text-3xl font-bold text-[#00B512] mb-4">
                    GHS {repayment.total.toFixed(2)}
                  </p>
                  <div className="space-y-2 text-sm text-white/60">
                    <p>
                      Principal: <span className="font-bold text-white/80">GHS {repayment.principal.toFixed(2)}</span>
                    </p>
                    <p>
                      Interest: <span className="font-bold text-white/80">GHS {repayment.interest.toFixed(2)}</span>
                    </p>
                    <p className="mt-4">
                      With an interest rate of{" "}
                      <span className="font-bold text-white/80">{interestRate}%</span> for{" "}
                      <span className="font-bold text-white/80">{creditTerm} Days</span>, you will pay{" "}
                      <span className="font-bold text-white/80">GHS {repayment.principal.toFixed(2)}</span> and{" "}
                      <span className="font-bold text-white/80">GHS {repayment.interest.toFixed(2)}</span> in
                      interest over the timeline of your credit.
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div
                        className="bg-[#00B512] h-3 rounded-full transition-all"
                        style={{ width: `${Math.min(repayment.progress, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                      Progress: {Math.round(repayment.progress)}%
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={navigateBackToHome}
                variant="primary"
                className="w-full mt-6"
              >
                Apply for Credit
              </Button>
            </div>
          </Card>
        )}

        {/* Browse Offers Tab */}
        {activeTab === "offers" && (
          <div className="grid md:grid-cols-3 gap-6">
            {availableOffers.map((offer) => (
              <Card key={offer.id} className="p-6 md:p-8 rounded-2xl hover:border-white/15 transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="text-xl font-bold mb-2 text-white">{offer.name}</h3>
                <p className="text-2xl font-bold text-[#00B512] mb-4">
                  {offer.amount}
                </p>
                <div className="space-y-2 mb-4 text-sm text-white/50">
                  <p>
                    <span className="font-semibold text-white/70">Interest Rate:</span> {offer.interestRate}
                  </p>
                  <p>
                    <span className="font-semibold text-white/70">Term:</span> {offer.term}
                  </p>
                </div>
                <ul className="space-y-1 mb-6 text-sm text-white/60">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-[#00B512] mr-2">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="primary" className="w-full">
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* My Applications Tab */}
        {activeTab === "applications" && (
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-10 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 className="text-2xl font-bold mb-6 text-white">My Applications</h2>
              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 rounded-xl border-l-4 border-l-[#00B512]"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '4px solid #00B512' }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold mb-2 text-white">
                            {app.offerName}
                          </h3>
                          <p className="text-xl font-bold text-[#00B512] mb-2">
                            {app.amount}
                          </p>
                          <div className="text-sm text-white/50 space-y-1">
                            <p>
                              <span className="font-semibold text-white/70">Applied:</span> {app.date}
                            </p>
                            <p>
                              <span className="font-semibold text-white/70">Due Date:</span> {app.dueDate}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            app.status === "Approved"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-white/50 py-8">
                  No applications found. Browse offers to apply for credit.
                </p>
              )}
            </Card>
          </div>
        )}

        {/* Payment Plans Tab */}
        {activeTab === "payments" && (
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-10 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 className="text-2xl font-bold mb-6 text-white">Payment Plans</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-lg font-bold mb-4 text-white">Flexible Payment Options</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#00B512] mr-2 mt-1">&#8226;</span>
                      <div>
                        <p className="font-semibold text-white/90">Daily Payments</p>
                        <p className="text-sm text-white/50">
                          Pay a fixed amount each day for the duration of your credit term
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00B512] mr-2 mt-1">&#8226;</span>
                      <div>
                        <p className="font-semibold text-white/90">Weekly Installments</p>
                        <p className="text-sm text-white/50">
                          Spread your payments across weekly installments
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00B512] mr-2 mt-1">&#8226;</span>
                      <div>
                        <p className="font-semibold text-white/90">Lump Sum Payment</p>
                        <p className="text-sm text-white/50">
                          Pay the full amount at the end of the credit term
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00B512] mr-2 mt-1">&#8226;</span>
                      <div>
                        <p className="font-semibold text-white/90">Early Repayment</p>
                        <p className="text-sm text-white/50">
                          Pay off your credit early with reduced interest rates
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl" style={{ background: 'rgba(0,181,18,0.06)', border: '1px solid rgba(0,181,18,0.12)' }}>
                  <h3 className="text-lg font-bold mb-4 text-white">Payment Schedule Example</h3>
                  <p className="text-sm text-white/60 mb-4">
                    For a credit of GHS 1,000 at 8% interest over 14 days:
                  </p>
                  <div className="space-y-2 text-sm text-white/60">
                    <div className="flex justify-between">
                      <span>Principal:</span>
                      <span className="font-semibold text-white/80">GHS 1,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest:</span>
                      <span className="font-semibold text-white/80">GHS 30.68</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2 mt-2 font-bold text-white">
                      <span>Total:</span>
                      <span>GHS 1,030.68</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-10 mt-20" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="nc-container flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center">
            <img src="/favicon.svg" alt="Neural Cash" className="h-5" />
          </Link>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link to="/" className="text-white/40 hover:text-white transition-colors">Home</Link>
            <Link to="/generate-credit" className="text-white/40 hover:text-white transition-colors">Credit Score</Link>
            <Link to="/take-credit" className="text-white/60 font-medium">Credit Offers</Link>
            <Link to="/ai-insights" className="text-white/40 hover:text-white transition-colors">AI Insights</Link>
            <Link to="/settings" className="text-white/40 hover:text-white transition-colors">Settings</Link>
          </div>
          <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Neural Cash</p>
        </div>
      </footer>
    </div>
  );
};

export default CreditCalculator;
