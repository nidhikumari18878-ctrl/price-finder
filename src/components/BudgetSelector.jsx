import { motion } from "framer-motion";
import { SlidersHorizontal, Check, IndianRupee } from "lucide-react";
import { useState } from "react";
import "./BudgetSelector.css";

const budgetOptions = [
  "Under ₹500",
  "Under ₹1,000",
  "Under ₹2,000",
  "Under ₹5,000",
  "Under ₹10,000",
];

export default function BudgetSelector() {
  const [selectedBudget, setSelectedBudget] = useState("Under ₹2,000");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handlePreset = (budget) => {
    setSelectedBudget(budget);

    const value = budget.replace(/[^\d]/g, "");

    setMinPrice("");
    setMaxPrice(value);
  };

  const handleApply = () => {
    if (!minPrice && !maxPrice) return;

    const min = minPrice || "0";
    const max = maxPrice || "No limit";

    console.log("Budget applied:", {
      min,
      max,
    });
  };

  return (
    <section className="budget-selector" id="budget">
      <div className="budget-container">

        {/* Heading */}
        <motion.div
          className="budget-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="budget-title-icon">
            <SlidersHorizontal size={22} />
          </div>

          <div>
            <span className="budget-eyebrow">
              SMART FILTER
            </span>

            <h2>
              Set your <span>budget</span>
            </h2>

            <p>
              Tell us how much you want to spend and we'll help
              you find products within your range.
            </p>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="budget-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          {/* Preset budgets */}
          <div className="budget-section">
            <div className="budget-section-header">
              <h3>Quick budget</h3>
              <span>Select one</span>
            </div>

            <div className="budget-options">
              {budgetOptions.map((budget) => {
                const isActive = selectedBudget === budget;

                return (
                  <motion.button
                    key={budget}
                    className={`budget-option ${
                      isActive ? "active" : ""
                    }`}
                    onClick={() => handlePreset(budget)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isActive && (
                      <span className="budget-check">
                        <Check size={14} />
                      </span>
                    )}

                    {budget}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="budget-divider">
            <span>OR SET CUSTOM RANGE</span>
          </div>

          {/* Custom range */}
          <div className="custom-budget">

            <div className="price-input-group">
              <label>Minimum price</label>

              <div className="price-input">
                <IndianRupee size={17} />

                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                    setSelectedBudget("");
                  }}
                />
              </div>
            </div>

            <div className="range-dash">—</div>

            <div className="price-input-group">
              <label>Maximum price</label>

              <div className="price-input">
                <IndianRupee size={17} />

                <input
                  type="number"
                  min="0"
                  placeholder="10,000"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setSelectedBudget("");
                  }}
                />
              </div>
            </div>

            <motion.button
              className="apply-budget-btn"
              onClick={handleApply}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply Budget
              <SlidersHorizontal size={17} />
            </motion.button>

          </div>

          {/* Current budget */}
          {(minPrice || maxPrice) && (
            <motion.div
              className="budget-summary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>Selected budget:</span>

              <strong>
                ₹{minPrice || "0"} — ₹{maxPrice || "No limit"}
              </strong>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}