import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  TrendingDown,
  ExternalLink,
} from "lucide-react";
import "./PriceComparison.css";

const stores = [
  {
    name: "Amazon",
    price: 1299,
    delivery: "Free delivery",
    badge: "Best Price",
    recommended: true,
  },
  {
    name: "Flipkart",
    price: 1349,
    delivery: "Free delivery",
    badge: "",
    recommended: false,
  },
  {
    name: "Croma",
    price: 1499,
    delivery: "Free delivery",
    badge: "",
    recommended: false,
  },
];

export default function PriceComparison() {
  const lowestPrice = Math.min(...stores.map((store) => store.price));

  return (
    <section className="price-comparison">
      <div className="price-comparison-container">

        {/* Header */}
        <motion.div
          className="comparison-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="comparison-eyebrow">
              PRICE CHECK
            </span>

            <h2>
              Compare before you <span>buy</span>
            </h2>

            <p>
              See prices from different shopping platforms in one place.
            </p>
          </div>

          <div className="comparison-saving">
            <TrendingDown size={17} />
            Save more
          </div>
        </motion.div>

        {/* Product Summary */}
        <motion.div
          className="comparison-product"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="comparison-product-image">
            <img
              src="https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&q=80"
              alt="Wireless earbuds"
            />
          </div>

          <div className="comparison-product-info">
            <span>Wireless Earbuds</span>

            <h3>boAt Airdopes 141</h3>

            <p>
              Compare prices across shopping platforms
            </p>
          </div>

          <div className="comparison-lowest">
            <small>Starting from</small>

            <strong>
              ₹{lowestPrice.toLocaleString("en-IN")}
            </strong>

            <span>
              Lowest price
            </span>
          </div>
        </motion.div>

        {/* Store List */}
        <div className="store-list">
          {stores.map((store, index) => {
            const isLowest = store.price === lowestPrice;

            return (
              <motion.div
                className={`store-row ${
                  isLowest ? "lowest" : ""
                }`}
                key={store.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                }}
              >
                <div className="store-name">
                  <div className="store-logo">
                    {store.name.charAt(0)}
                  </div>

                  <div>
                    <strong>{store.name}</strong>

                    <span>
                      {store.delivery}
                    </span>
                  </div>
                </div>

                <div className="store-price">
                  <strong>
                    ₹{store.price.toLocaleString("en-IN")}
                  </strong>

                  {store.badge && (
                    <span className="best-price-badge">
                      <CheckCircle2 size={12} />
                      {store.badge}
                    </span>
                  )}
                </div>

                <motion.button
                  className="store-button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Visit store
                  <ExternalLink size={14} />
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="comparison-note">
          <span>
            Prices shown are for demonstration and may change.
          </span>

          <button>
            See comparison details
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}