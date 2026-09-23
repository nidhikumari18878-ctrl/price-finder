import { ArrowUp, Mail, Search } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

const categories = ["Audio", "Watches", "Gaming"];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo"><span className="footer-logo-icon"><Search size={18}/></span>PriceFinder</Link>
            <p>Find better prices, compare your options and shop within your budget.</p>
            <a className="footer-mail" href="mailto:hello@pricefinder.example"><Mail size={15}/> hello@pricefinder.example</a>
          </div>

          <div className="footer-column"><h3>Explore</h3><Link to="/products">All Products</Link>{categories.map((category) => <Link key={category} to={`/products?category=${encodeURIComponent(category)}`}>{category}</Link>)}</div>
          <div className="footer-column"><h3>PriceFinder</h3><Link to="/#about">How It Works</Link><Link to="/#deals">Deals</Link><Link to="/products">Compare Prices</Link><Link to="/#categories">Categories</Link></div>
          <div className="footer-column footer-contact"><h3>Built for smarter shopping</h3><p>The frontend is ready for live APIs, affiliate links, authentication and database-backed price history.</p><Link to="/products" className="footer-alert-link">Start Comparing</Link></div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PriceFinder. All rights reserved.</p>
          <div className="footer-legal"><span>Demo frontend</span><span>API-ready</span><span>Affiliate-ready</span></div>
          <button className="back-top" onClick={scrollToTop} aria-label="Back to top"><ArrowUp size={17}/></button>
        </div>
      </div>
    </footer>
  );
}
