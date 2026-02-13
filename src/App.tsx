import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Home, GenerateCredit, Login, AIInsights, Settings } from "./views";
import CreditScoreEvaluation from "./views/creditScoreAnalyses/analyses";
import CreditCalculator from "./views/takeCredit/takeCredit";
import NotFound from "./views/404";
import ProtectedRoute from "./components/ProtectedRoute";
import { ScrollProgress } from "./components/navigation/ScrollProgress";
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
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/generate-credit"
            element={
              <ProtectedRoute>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  <GenerateCredit />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analyses"
            element={
              <ProtectedRoute>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  <CreditScoreEvaluation />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/take-credit"
            element={
              <ProtectedRoute>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  <CreditCalculator />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-insights"
            element={
              <ProtectedRoute>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  <AIInsights />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  <Settings />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <NotFound />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;