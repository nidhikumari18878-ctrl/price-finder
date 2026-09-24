import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Search, ArrowRight, TrendingDown, ShieldCheck, Zap, ShoppingBag, Bell, BarChart3, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProducts } from "../services/productService";
import "./Home.css";

const categoryMeta = [
  { name: "Audio", icon: "🎧" },
  { name: "Watches", icon: "⌚" },
  { name: "Gaming", icon: "🎮" },
];

const features = [
  { icon: <TrendingDown size={23}/>, title: "Compare Prices", text: "See offers side-by-side so you can check the price before opening a store." },
  { icon: <ShieldCheck size={23}/>, title: "Shop Smarter", text: "Useful ratings, features and savings in one clean product view." },
  { icon: <Bell size={23}/>, title: "Price Alerts", text: "Set your target price now. Notification services can be connected later." },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const categories = useMemo(
    () => categoryMeta.map((item) => ({
      ...item,
      count: products.filter((p) => p.category === item.name).length,
    })),
    [products]
  );
  const submitSearch = () => { if (search.trim()) window.location.href = `/products?search=${encodeURIComponent(search.trim())}`; else window.location.href = "/products"; };

  return (
    <>
      <Navbar />
      <main className="home-page">
        <section className="home-hero">
          <div className="home-container hero-content">
            <motion.div className="hero-text" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
              <div className="hero-badge"><Zap size={14}/> Smart shopping starts here</div>
              <h1>Find the <span>best price</span> before you buy.</h1>
              <p>Search products, compare offers and discover what fits your budget — without jumping between tabs.</p>
              <div className="hero-actions"><Link to="/products" className="hero-primary">Explore Products <ArrowRight size={17}/></Link><a href="#categories" className="hero-secondary">Browse Categories</a></div>
              <div className="hero-proof"><span><CheckCircle2 size={15}/> Compare in one place</span><span><CheckCircle2 size={15}/> Budget friendly</span></div>
            </motion.div>
            <motion.div className="hero-visual" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }}>
              <div className="hero-card-main"><div className="hero-card-icon"><ShoppingBag size={27}/></div><span>PRICEFINDER</span><h3>Compare & Save</h3><div className="hero-price-box"><small>Example best deal</small><strong>₹1,299</strong><span>Save up to 56%</span></div></div>
              <div className="floating-card floating-card-one"><TrendingDown size={17}/><div><strong>Price Drop</strong><span>₹500 saved</span></div></div>
              <div className="floating-card floating-card-two"><BarChart3 size={17}/><div><strong>Smart Compare</strong><span>Multiple offers</span></div></div>
            </motion.div>
          </div>
        </section>

        <section className="home-search-section"><div className="home-container"><div className="home-search-box"><Search size={20}/><input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitSearch()} placeholder="What are you looking for?"/><button onClick={submitSearch}>Search</button></div></div></section>

        <section className="home-section" id="categories"><div className="home-container"><div className="section-heading"><div><span>EXPLORE</span><h2>Popular Categories</h2></div><Link to="/products">View all <ArrowRight size={15}/></Link></div><div className="category-grid">{categories.map((category,index)=><motion.div className="category-card" key={category.name} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.07}}><div className="category-icon">{category.icon}</div><div><h3>{category.name}</h3><p>{category.count} products</p></div><Link to={`/products?category=${encodeURIComponent(category.name)}`}>Explore <ArrowRight size={14}/></Link></motion.div>)}</div></div></section>

        <section className="home-section features-section" id="about"><div className="home-container"><div className="section-heading centered"><div><span>WHY PRICEFINDER</span><h2>A simpler way to shop</h2></div></div><div className="features-grid">{features.map((feature,index)=><motion.div className="feature-card" key={feature.title} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.08}}><div className="feature-icon">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.text}</p></motion.div>)}</div></div></section>

        <section className="home-section mini-stats"><div className="home-container stats-grid"><div><strong>6+</strong><span>Demo products</span></div><div><strong>3</strong><span>Store offers</span></div><div><strong>₹10K</strong><span>Budget range</span></div><div><strong>24/7</strong><span>Frontend access</span></div></div></section>

        <section className="home-cta" id="deals"><div className="home-container"><div className="cta-box"><div><span>READY TO SHOP?</span><h2>Stop overpaying for products.</h2><p>Compare prices today. Real APIs, affiliate links and database features can be connected next.</p></div><Link to="/products">Start Comparing <ArrowRight size={17}/></Link></div></div></section>
      </main>
      <Footer />
    </>
  );
}
