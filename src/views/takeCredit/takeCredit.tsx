import { useNavigate } from "react-router-dom";
const CreditCalculator = () => {
  const navigate = useNavigate();
  const navigateBackToHome = () => {
    return navigate("/analyses");
  };
  return (
    <div className="max-w-lg mx-auto p-6 border-2 border-green-600 rounded-lg bg-white shadow-lg">
      <h2 className="text-lg font-bold mb-2">1. Enter your credit details</h2>
      <div className="mb-4">
        <label className="block text-green-600 font-semibold">
          Credit Amount
        </label>
        <input
          type="number"
          value="Credit Amount"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <label className="block text-green-600 font-semibold">
            Interest Rate
          </label>
          <input
            type="number"
            value="8 %"
            className="w-20 p-2 border rounded"
          />
          %
        </div>
      </div>
      <div>
        <label className="block text-green-600 font-semibold">
          Credit Term
        </label>
        <input
          type="number"
          value="10 Days"
          className="w-20 p-2 border rounded"
        />{" "}
        Days
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">2. Total Amount To Be Repaid</h2>
        <p className="text-green-600 font-semibold">GHS 432</p>{" "}
        <p className="text-gray-600 text-sm">
          With an interest rate of <span className="font-bold">8% for </span>
          <span className="font-bold">10 Days</span>, you will pay{" "}
          <span className="font-bold">GHS 400</span> and{" "}
          <span className="font-bold">GHS 32</span> in interest over the
          timeline of your credit.
        </p>
      </div>
      <div className="relative pt-5">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: (4 / 6) * 100 }}
          ></div>
        </div>
      </div>

      <button
        onClick={navigateBackToHome}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded text-lg font-semibold"
      >
        Apply
      </button>
    </div>
  );
};

export default CreditCalculator;
