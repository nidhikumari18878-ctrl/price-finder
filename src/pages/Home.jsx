import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {  useState } from "react";

import {
  Search,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Zap,
  ShoppingBag,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

const categories = [
  { name: "Audio", icon: "🎧" },
  { name: "Watches", icon: "⌚" },
  { name: "Gaming", icon: "🎮" },
  { name: "Mobiles", icon: "📱" },
];

const features = [
  {
    icon: <TrendingDown size={25} />,
    title: "Compare Prices",
    text: "Compare prices from multiple shopping platforms in one place.",
  },
  {
    icon: <ShieldCheck size={25} />,
    title: "Smart Shopping",
    text: "Find useful product information before spending your money.",
  },
  {
    icon: <Zap size={25} />,
    title: "Price Alerts",
    text: "Set your target price and keep track of better deals.",
  },
];

function Home() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar />

      <main className="home-page">

        {/* HERO */}
        <section className="home-hero">
          <div className="home-container hero-content">

            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="hero-badge">
                <Zap size={15} />
                Smart shopping starts here
              </div>

              <h1>
                Find the
                <span> Best Price </span>
                Before You Buy.
              </h1>

              <p>
                Compare products, discover better prices and set price alerts
                — all from one simple platform.
              </p>

              <div className="hero-actions">
                <Link to="/products" className="hero-primary">
                  Explore Products
                  <ArrowRight size={18} />
                </Link>

                <a href="#categories" className="hero-secondary">
                  Browse Categories
                </a>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="hero-card-main">
                <div className="hero-card-icon">
                  <ShoppingBag size={30} />
                </div>

                <span>PriceFinder</span>

                <h3>Compare & Save</h3>

                <div className="hero-price-box">
                  <small>Best deal found</small>
                  <strong>₹1,299</strong>
                  <span>Save up to 56%</span>
                </div>
              </div>

              <div className="floating-card floating-card-one">
                <TrendingDown size={18} />
                <div>
                  <strong>Price Drop</strong>
                  <span>₹500 saved</span>
                </div>
              </div>

              <div className="floating-card floating-card-two">
                <ShieldCheck size={18} />
                <div>
                  <strong>Smart Choice</strong>
                  <span>4.5 ★ Rating</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* SEARCH */}
        <section className="home-search-section">
          <div className="home-container">
            <div className="home-search-box">
              <Search size={21} />
             <input
  type="text"
  placeholder="What are you looking for?"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      window.location.href = `/products?search=${encodeURIComponent(search)}`;
    }
  }}
/>
              <Link to={`/products?search=${encodeURIComponent(search)}`}>
  Search
</Link>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="home-section" id="categories">
          <div className="home-container">
            <div className="section-heading">
              <div>
                <span>EXPLORE</span>
                <h2>Popular Categories</h2>
              </div>

              <Link to="/products">
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="category-grid">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="category-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="category-icon">
                    {category.icon}
                  </div>

                  <h3>{category.name}</h3>

                  <Link
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                >
                  Explore <ArrowRight size={15} />
                </Link>
                                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="home-section features-section">
          <div className="home-container">
            <div className="section-heading centered">
              <div>
                <span>WHY PRICEFINDER</span>
                <h2>Shop Smarter</h2>
              </div>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  className="feature-card"
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="home-cta">
          <div className="home-container">
            <div className="cta-box">
              <div>
                <span>READY TO SHOP?</span>
                <h2>Stop overpaying for products.</h2>
                <p>
                  Compare prices and find deals before you buy.
                </p>
              </div>

              <Link to="/products">
                Start Comparing
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Home;