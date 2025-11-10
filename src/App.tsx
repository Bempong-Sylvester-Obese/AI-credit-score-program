import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Home, GenerateCredit, Login, AIInsights, Settings } from "./views";
import CreditScoreEvaluation from "./views/creditScoreAnalyses/analyses";
import CreditCalculator from "./views/takeCredit/takeCredit";
import "./App.css";

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    });

    const animatableElements = document.querySelectorAll(".animate-on-scroll");
    animatableElements.forEach((el) => observer.observe(el));
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate-credit" element={<GenerateCredit />} />
      <Route path="/login" element={<Login />} />
      <Route path="/analyses" element={<CreditScoreEvaluation />} />
      <Route path="/take-credit" element={<CreditCalculator />} />
      <Route path="/ai-insights" element={<AIInsights />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
