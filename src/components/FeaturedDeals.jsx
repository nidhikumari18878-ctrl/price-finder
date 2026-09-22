import { motion } from "framer-motion";
import {
  Star,
  ArrowUpRight,
  ShoppingBag,
  TrendingDown,
} from "lucide-react";
import "./FeaturedDeals.css";

const products = [
  {
    id: 1,
    name: "boAt Airdopes 141",
    category: "Wireless Earbuds",
    price: 1299,
    originalPrice: 4490,
    discount: 71,
    rating: 4.3,
    reviews: "18.2k",
    platform: "Amazon",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80",
  },
  {
    id: 2,
    name: "Noise ColorFit Pro",
    category: "Smart Watch",
    price: 1799,
    originalPrice: 5999,
    discount: 70,
    rating: 4.2,
    reviews: "9.8k",
    platform: "Flipkart",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  },
  {
    id: 3,
    name: "Sony WH-CH520",
    category: "Headphones",
    price: 3299,
    originalPrice: 4490,
    discount: 27,
    rating: 4.5,
    reviews: "7.4k",
    platform: "Amazon",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  },
  {
    id: 4,
    name: "Logitech K380",
    category: "Wireless Keyboard",
    price: 2499,
    originalPrice: 3495,
    discount: 29,
    rating: 4.6,
    reviews: "4.1k",
    platform: "Flipkart",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
  },
];

const formatPrice = (price) => {
  return price.toLocaleString("en-IN");
};

export default function FeaturedDeals() {
  return (
    <section className="featured-deals" id="deals">
      <div className="featured-deals-container">

        {/* Header */}
        <motion.div
          className="deals-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="deals-eyebrow">
              TODAY'S PICKS
            </span>

            <h2>
              Deals worth <span>checking out</span>
            </h2>

            <p>
              Popular products with prices that caught our attention.
            </p>
          </div>

          <motion.button
            className="deals-view-all"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.96 }}
          >
            View all deals
            <ArrowUpRight size={17} />
          </motion.button>
        </motion.div>

        {/* Products */}
        <div className="deals-grid">
          {products.map((product, index) => (
            <motion.article
              className="deal-card"
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -6 }}
            >
              {/* Image */}
              <div className="deal-image-wrapper">

                <div className="deal-discount">
                  -{product.discount}%
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="deal-image"
                />

                <div className="deal-platform">
                  <ShoppingBag size={13} />
                  {product.platform}
                </div>
              </div>

              {/* Content */}
              <div className="deal-content">

                <span className="deal-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                {/* Rating */}
                <div className="deal-rating">
                  <span className="rating-star">
                    <Star size={13} fill="currentColor" />
                  </span>

                  <strong>{product.rating}</strong>

                  <span>
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="deal-pricing">
                  <div>
                    <span className="deal-price">
                      ₹{formatPrice(product.price)}
                    </span>

                    <span className="deal-original-price">
                      ₹{formatPrice(product.originalPrice)}
                    </span>
                  </div>

                  <span className="deal-saving">
                    <TrendingDown size={13} />
                    Save ₹
                    {formatPrice(
                      product.originalPrice - product.price
                    )}
                  </span>
                </div>

                {/* Button */}
                <motion.button
                  className="deal-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Deal
                  <ArrowUpRight size={16} />
                </motion.button>

              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}