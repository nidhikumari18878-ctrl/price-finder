import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  ShieldCheck,
  Truck,
  Bell,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ProductDetails.css";

const products = [
  {
    id: 1,
    name: "boAt Airdopes 141",
    category: "Audio",
    price: 1299,
    oldPrice: 2990,
    rating: 4.3,
    platform: "Amazon",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80",
    description:
      "Wireless earbuds with immersive sound, long battery life and a comfortable everyday design.",
    features: [
      "Wireless Bluetooth connectivity",
      "Long battery backup",
      "Lightweight design",
      "Built for everyday use",
    ],
  },
  {
    id: 2,
    name: "Sony WH-CH520",
    category: "Audio",
    price: 4499,
    oldPrice: 5990,
    rating: 4.5,
    platform: "Amazon",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description:
      "Comfortable wireless headphones designed for everyday listening and entertainment.",
    features: [
      "Wireless Bluetooth",
      "Comfortable ear cushions",
      "Long battery life",
      "Lightweight construction",
    ],
  },
  {
    id: 3,
    name: "Noise ColorFit Pro",
    category: "Watches",
    price: 2499,
    oldPrice: 4999,
    rating: 4.2,
    platform: "Flipkart",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
    description:
      "Smartwatch with a modern display, fitness tracking and everyday smart features.",
    features: [
      "Fitness tracking",
      "Smart notifications",
      "Modern display",
      "Everyday activity tracking",
    ],
  },
  {
    id: 4,
    name: "Logitech K380",
    category: "Gaming",
    price: 2899,
    oldPrice: 3995,
    rating: 4.6,
    platform: "Flipkart",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    description:
      "Compact wireless keyboard with a clean design and convenient multi-device support.",
    features: [
      "Compact keyboard",
      "Wireless connectivity",
      "Multi-device support",
      "Portable design",
    ],
  },
  {
    id: 5,
    name: "JBL Tune 510BT",
    category: "Audio",
    price: 2499,
    oldPrice: 3999,
    rating: 4.4,
    platform: "Amazon",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
    description:
      "Wireless headphones with a comfortable design and powerful everyday audio.",
    features: [
      "Wireless connectivity",
      "Comfortable fit",
      "Powerful sound",
      "Portable design",
    ],
  },
  {
    id: 6,
    name: "Redmi Watch 5 Active",
    category: "Watches",
    price: 2799,
    oldPrice: 4999,
    rating: 4.1,
    platform: "Flipkart",
    image:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80",
    description:
      "Feature-packed smartwatch with fitness tracking and a modern everyday design.",
    features: [
      "Activity tracking",
      "Smart notifications",
      "Modern watch design",
      "Everyday fitness features",
    ],
  },
];

const offers = [
  {
    store: "Amazon",
    price: 1299,
    delivery: "Free delivery",
  },
  {
    store: "Flipkart",
    price: 1399,
    delivery: "Free delivery",
  },
  {
    store: "Other Store",
    price: 1499,
    delivery: "Delivery available",
  },
];

function ProductDetails() {
  const { id } = useParams();

  const product = useMemo(
    () => products.find((item) => item.id === Number(id)),
    [id]
  );

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="product-not-found">
          <h1>Product not found</h1>
          <Link to="/products">Back to products</Link>
        </main>

        <Footer />
      </>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const sortedOffers = [...offers].sort((a, b) => a.price - b.price);

  return (
    <>
      <Navbar />

      <main className="product-details-page">
        <div className="product-details-container">

          <Link to="/products" className="back-products">
            <ArrowLeft size={17} />
            Back to products
          </Link>

          <div className="product-details-main">

            {/* Image */}
            <motion.div
              className="details-image"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="details-discount">
                {discount}% OFF
              </span>

              <img src={product.image} alt={product.name} />
            </motion.div>

            {/* Info */}
            <motion.div
              className="details-info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="details-category">
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <div className="details-rating">
                <Star size={17} fill="currentColor" />
                <strong>{product.rating}</strong>
                <span>Customer rating</span>
              </div>

              <p className="details-description">
                {product.description}
              </p>

              <div className="details-price">
                <strong>
                  ₹{product.price.toLocaleString("en-IN")}
                </strong>

                <del>
                  ₹{product.oldPrice.toLocaleString("en-IN")}
                </del>

                <span>Save ₹{(product.oldPrice - product.price).toLocaleString("en-IN")}</span>
              </div>

              <div className="details-actions">
                <a
                  href="#offers"
                  className="compare-button"
                >
                  Compare prices
                </a>

                <button className="alert-button">
                  <Bell size={17} />
                  Price Alert
                </button>
              </div>

              <div className="details-benefits">
                <div>
                  <ShieldCheck size={20} />
                  <span>
                    <strong>Compare before buying</strong>
                    Multiple offers in one place
                  </span>
                </div>

                <div>
                  <Truck size={20} />
                  <span>
                    <strong>Check delivery</strong>
                    Verify availability on store
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <section className="details-features">
            <div className="section-title">
              <span>PRODUCT INFORMATION</span>
              <h2>Key features</h2>
            </div>

            <div className="features-grid">
              {product.features.map((feature) => (
                <div className="feature-item" key={feature}>
                  <ShieldCheck size={18} />
                  {feature}
                </div>
              ))}
            </div>
          </section>

          {/* Offers */}
          <section className="offers-section" id="offers">
            <div className="section-title">
              <span>PRICE COMPARISON</span>
              <h2>Available offers</h2>
              <p>
                Prices shown here are demo data for now.
              </p>
            </div>

            <div className="offers-table">
              {sortedOffers.map((offer, index) => (
                <motion.div
                  className={`offer-row ${
                    index === 0 ? "best-offer" : ""
                  }`}
                  key={offer.store}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="offer-store">
                    <div className="store-logo">
                      {offer.store.charAt(0)}
                    </div>

                    <div>
                      <strong>{offer.store}</strong>

                      {index === 0 && (
                        <span>Lowest price</span>
                      )}
                    </div>
                  </div>

                  <div className="offer-delivery">
                    {offer.delivery}
                  </div>

                  <strong className="offer-price">
                    ₹{offer.price.toLocaleString("en-IN")}
                  </strong>

                  <a
                    href="#"
                    className="deal-button"
                  >
                    View Deal
                    <ExternalLink size={15} />
                  </a>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;