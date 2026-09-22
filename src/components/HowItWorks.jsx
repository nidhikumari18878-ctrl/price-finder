import { motion } from "framer-motion";
import {
  Search,
  GitCompareArrows,
  WalletCards,
  ArrowRight,
} from "lucide-react";
import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search your product",
    description:
      "Find the product you're looking for using our smart search and categories.",
  },
  {
    number: "02",
    icon: GitCompareArrows,
    title: "Compare prices",
    description:
      "See prices from different shopping platforms side by side in one place.",
  },
  {
    number: "03",
    icon: WalletCards,
    title: "Stay within budget",
    description:
      "Choose an option that matches your budget and make a smarter purchase.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="how-container">

        <motion.div
          className="how-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="how-eyebrow">HOW IT WORKS</span>

          <h2>
            Shopping made
            <span> simpler.</span>
          </h2>

          <p>
            PriceFinder brings product discovery, price comparison and
            budget-friendly shopping together.
          </p>
        </motion.div>

        <div className="steps-wrapper">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                className="step-card"
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <div className="step-top">
                  <span className="step-number">{step.number}</span>

                  <div className="step-icon">
                    <Icon size={25} />
                  </div>
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="step-arrow">
                    <ArrowRight size={20} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="how-bottom"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <strong>One place. Multiple prices. Smarter decisions.</strong>
            <p>
              No need to open multiple shopping websites just to compare.
            </p>
          </div>

          <a href="#search" className="how-cta">
            Start searching
            <ArrowRight size={18} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default HowItWorks;