import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";

const popularSearches = [
  "Wireless Earbuds",
  "Smartphones",
  "Shoes",
  "Laptops",
  "Headphones",
];

const budgets = [
  "Under ₹500",
  "Under ₹1,000",
  "Under ₹2,000",
  "Under ₹5,000",
];

export default function Hero() {
  return (
    <section className="hero">
      {/* Animated background */}
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="hero-content">

        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={15} />
          Smart shopping starts here
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Find the best price.
          <br />
          <span>Stay within your budget.</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Compare products across shopping platforms and discover
          deals that actually fit your budget.
        </motion.p>

        {/* Search */}
        <motion.div
          className="hero-search"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Search size={22} className="search-icon" />

          <input
            type="text"
            placeholder="What are you looking for?"
          />

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Search
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>

        {/* Popular searches */}
        <motion.div
          className="popular-searches"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <span>Popular:</span>

          {popularSearches.map((item, index) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.08 }}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.button>
          ))}
        </motion.div>

        {/* Budget chips */}
        <motion.div
          className="budget-row"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          {budgets.map((budget) => (
            <button key={budget} className="budget-chip">
              {budget}
            </button>
          ))}
        </motion.div>

      </div>
    </section>
  );
}