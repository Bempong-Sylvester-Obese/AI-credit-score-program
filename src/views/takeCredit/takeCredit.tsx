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
    <div>
      <nav className="main-navigation absolute left-0 right-0 top-6 z-50 px-4">
        <div className="flex items-center justify-end md:justify-center">
          <div className="hidden md:flex items-center gap-4 md:gap-10">
            <Link to="/">Home</Link>
            <Link to="/generate-credit">Generate FPS</Link>
            <Link to="/take-credit" className="font-semibold">Credit Offers</Link>
            <Link to="/ai-insights">AI Insights</Link>
            <Link to="/settings">Settings</Link>
          </div>
          <MobileNav>
            <Link to="/" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Home</Link>
            <Link to="/generate-credit" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Generate FPS</Link>
            <Link to="/take-credit" className="block py-2 text-[#E2FF54] font-semibold">Credit Offers</Link>
            <Link to="/ai-insights" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">AI Insights</Link>
            <Link to="/settings" className="block py-2 text-white hover:text-[#E2FF54] transition-colors">Settings</Link>
          </MobileNav>
        </div>
      </nav>

      <main className="nc-container pt-24 md:pt-40 pb-20">
        {/* Header */}
        <section className="text-center mb-16 animate fade-up">
          <p className="tag tag-no-emoji">Credit Offers</p>
          <h1 className="font-bold text-3xl md:text-6xl max-w-[700px] mx-auto leading-[1.2] font-montserrat py-10">
            Explore Credit Options
          </h1>
          <p className="text-xl text-gray-600 max-w-[600px] mx-auto">
            Calculate your credit, browse available offers, and manage your
            applications all in one place.
          </p>
        </section>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 animate fade-up delay-30">
          <button
            onClick={() => setActiveTab("calculate")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "calculate"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Calculate Credit
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "offers"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Browse Offers
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "applications"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            My Applications
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "payments"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Payment Plans
          </button>
        </div>

        {/* Calculate Credit Tab */}
        {activeTab === "calculate" && (
          <Card className="max-w-2xl mx-auto p-8 animate fade-up delay-30">
            <h2 className="text-2xl font-bold mb-6">Credit Calculator</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-green-600">
                  Credit Amount (GHS)
                </label>
                <Input
                  type="number"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  placeholder="400.00"
                  className="w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-green-600">
                    Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="8"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-green-600">
                    Credit Term (Days)
                  </label>
                  <Input
                    type="number"
                    value={creditTerm}
                    onChange={(e) => setCreditTerm(e.target.value)}
                    placeholder="10"
                    className="w-full"
                  />
                </div>
              </div>

              {creditAmount && (
                <div className="mt-8 p-6 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">
                    Total Amount To Be Repaid
                  </h3>
                  <p className="text-3xl font-bold text-green-600 mb-4">
                    GHS {repayment.total.toFixed(2)}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      Principal: <span className="font-bold">GHS {repayment.principal.toFixed(2)}</span>
                    </p>
                    <p>
                      Interest: <span className="font-bold">GHS {repayment.interest.toFixed(2)}</span>
                    </p>
                    <p className="mt-4">
                      With an interest rate of{" "}
                      <span className="font-bold">{interestRate}%</span> for{" "}
                      <span className="font-bold">{creditTerm} Days</span>, you will pay{" "}
                      <span className="font-bold">GHS {repayment.principal.toFixed(2)}</span> and{" "}
                      <span className="font-bold">GHS {repayment.interest.toFixed(2)}</span> in
                      interest over the timeline of your credit.
                    </p>
                  </div>
                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all"
                        style={{ width: `${Math.min(repayment.progress, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
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
          <div className="grid md:grid-cols-3 gap-6 animate fade-up delay-30">
            {availableOffers.map((offer) => (
              <Card key={offer.id} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{offer.name}</h3>
                <p className="text-2xl font-bold text-green-600 mb-4">
                  {offer.amount}
                </p>
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Interest Rate:</span> {offer.interestRate}
                  </p>
                  <p>
                    <span className="font-semibold">Term:</span> {offer.term}
                  </p>
                </div>
                <ul className="space-y-1 mb-4 text-sm">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
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
          <div className="max-w-4xl mx-auto animate fade-up delay-30">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">My Applications</h2>
              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <Card
                      key={app.id}
                      className="p-6 border-l-4 border-l-green-500"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold mb-2">
                            {app.offerName}
                          </h3>
                          <p className="text-xl font-bold text-green-600 mb-2">
                            {app.amount}
                          </p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              <span className="font-semibold">Applied:</span> {app.date}
                            </p>
                            <p>
                              <span className="font-semibold">Due Date:</span> {app.dueDate}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${
                            app.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 py-8">
                  No applications found. Browse offers to apply for credit.
                </p>
              )}
            </Card>
          </div>
        )}

        {/* Payment Plans Tab */}
        {activeTab === "payments" && (
          <div className="max-w-4xl mx-auto animate fade-up delay-30">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Plans</h2>
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Flexible Payment Options</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <div>
                        <p className="font-semibold">Daily Payments</p>
                        <p className="text-sm text-gray-600">
                          Pay a fixed amount each day for the duration of your credit term
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <div>
                        <p className="font-semibold">Weekly Installments</p>
                        <p className="text-sm text-gray-600">
                          Spread your payments across weekly installments
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <div>
                        <p className="font-semibold">Lump Sum Payment</p>
                        <p className="text-sm text-gray-600">
                          Pay the full amount at the end of the credit term
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <div>
                        <p className="font-semibold">Early Repayment</p>
                        <p className="text-sm text-gray-600">
                          Pay off your credit early with reduced interest rates
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Payment Schedule Example</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    For a credit of GHS 1,000 at 8% interest over 14 days:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Principal:</span>
                      <span className="font-semibold">GHS 1,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest:</span>
                      <span className="font-semibold">GHS 30.68</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2 font-bold">
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
            <Link to="/take-credit" className="font-semibold">Loan Offers</Link>
            <Link to="/ai-insights">AI Insights</Link>
            <Link to="/settings">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreditCalculator;
