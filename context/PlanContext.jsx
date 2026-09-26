"use client";
import { createContext, useContext, useState, useEffect } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on first render
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
    setMounted(true);
  }, []);

  // Save plan to localStorage whenever it changes
  useEffect(() => {
    if (mounted) localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, mounted]);

  // Save saved list to localStorage whenever it changes
  useEffect(() => {
    if (mounted) localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, mounted]);

  const addToPlan = (workout) => {
    if (plan.length >= 5) return "full";
    if (plan.find((w) => w.id === workout.id)) return "exists";
    setPlan([...plan, { ...workout, done: false }]);
    return "added";
  };

  const addToSaved = (workout) => {
    if (saved.find((w) => w.id === workout.id)) return "exists";
    setSaved([...saved, workout]);
    return "added";
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((w) => w.id !== id));
  };

  const markDone = (id) => {
    setPlan(plan.map((w) => (w.id === id ? { ...w, done: true } : w)));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
