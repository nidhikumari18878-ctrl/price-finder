import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Wallet,
  Store,
  RefreshCw,
  BadgeCheck,
} from "lucide-react";
import "./WhyPriceFinder.css";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Compare in one place",
    text: "Check different shopping options without jumping between multiple websites.",
  },
  {
    icon: Wallet,
    title: "Budget focused",
    text: "Set your spending limit and discover products around your preferred budget.",
  },
  {
    icon: Zap,
    title: "Save your time",
    text: "Quickly discover prices and product options through a simple interface.",
  },
  {
    icon: Store,
    title: "Multiple stores",
    text: "Bring shopping options from different platforms into one comparison experience.",
  },
  {
    icon: RefreshCw,
    title: "Price awareness",
    text: "Make it easier to notice price differences before making a purchase.",
  },
  {
    icon: BadgeCheck,
    title: "Simple decisions",
    text: "Clear product information helps you understand your options before buying.",
  },
];

function WhyPriceFinder() {
  return (
    <section className="why-pricefinder" id="about">
      <div className="why-container">

        <motion.div
          className="why-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="why-eyebrow">WHY PRICEFINDER</span>

          <h2>
            Less searching.
            <span> More clarity.</span>
          </h2>

          <p>
            Everything you need to make price-conscious shopping easier,
            organized in one simple experience.
          </p>
        </motion.div>

        <div className="why-stats">
          <motion.div
            className="stat-box"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <strong>01</strong>
            <span>Search</span>
            <p>Find products quickly</p>
          </motion.div>

          <motion.div
            className="stat-box"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <strong>02</strong>
            <span>Compare</span>
            <p>Explore different prices</p>
          </motion.div>

          <motion.div
            className="stat-box"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <strong>03</strong>
            <span>Choose</span>
            <p>Stay within your budget</p>
          </motion.div>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                className="benefit-card"
                key={benefit.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -7 }}
              >
                <div className="benefit-icon">
                  <Icon size={23} />
                </div>

                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhyPriceFinder;