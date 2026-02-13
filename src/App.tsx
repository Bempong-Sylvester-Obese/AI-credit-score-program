import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Home, GenerateCredit, Login, AIInsights, Settings } from "./views";
import CreditScoreEvaluation from "./views/creditScoreAnalyses/analyses";
import CreditCalculator from "./views/takeCredit/takeCredit";
import NotFound from "./views/404";
import ProtectedRoute from "./components/ProtectedRoute";
import { pageTransition } from "./lib/animations";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const location = useLocation();

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
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={false}
        animate="animate"
        exit="exit"
        variants={pageTransition}
        style={{ minHeight: "100%" }}
      >
        <Routes location={location}>
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
          <Route
            path="/ai-insights"
            element={
              <ProtectedRoute>
                <AIInsights />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;