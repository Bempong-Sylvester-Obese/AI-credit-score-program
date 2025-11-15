import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Home, GenerateCredit, Login, AIInsights, Settings } from "./views";
import CreditScoreEvaluation from "./views/creditScoreAnalyses/analyses";
import CreditCalculator from "./views/takeCredit/takeCredit";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { AuthProvider } from "@/contexts/AuthProvider";

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

    return () => observer.disconnect();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/generate-credit"
          element={
            <ProtectedRoute>
              <GenerateCredit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analyses"
          element={
            <ProtectedRoute>
              <CreditScoreEvaluation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/take-credit"
          element={
            <ProtectedRoute>
              <CreditCalculator />
            </ProtectedRoute>
          }
        />
        <Route path="/ai-insights" element={<AIInsights />} />
        <ProtectedRoute> <Route path="/settings" element={<Settings />} /> </ProtectedRoute>
      </Routes>
    </AuthProvider>
  );
}

export default App;