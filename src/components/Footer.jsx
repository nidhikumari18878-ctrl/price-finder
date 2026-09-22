import { motion } from "framer-motion";
import {
  Search,
 
  
 
  Mail,
  ArrowUp,
} from "lucide-react";
import "./Footer.css";

const categories = [
  "Mobiles",
  "Laptops",
  "Audio",
  "Gaming",
  "Fashion",
  "Home & Kitchen",
];

const companyLinks = [
  "About Us",
  "How It Works",
  "Price Alerts",
  "Contact",
];

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">

        <div className="footer-main">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a href="#" className="footer-logo">
              <span className="footer-logo-icon">
                <Search size={19} />
              </span>
              PriceFinder
            </a>

            <p>
              Find better prices, compare your options and shop within your
              budget.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
               <span>IG</span>
              </a>

              <a href="#" aria-label="Twitter">
               T
              </a>

              <a href="#" aria-label="GitHub">
                {/* <Github size={18} /> */}
              </a>

              <a href="#" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          <div className="footer-column">
            <h3>Explore</h3>

            {categories.map((category) => (
              <a href="#categories" key={category}>
                {category}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h3>PriceFinder</h3>

            {companyLinks.map((link) => (
              <a href="#about" key={link}>
                {link}
              </a>
            ))}
          </div>

          <div className="footer-column footer-contact">
            <h3>Stay updated</h3>

            <p>
              Get useful shopping updates and price alerts.
            </p>

            <a href="#alerts" className="footer-alert-link">
              Get Price Alerts
            </a>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} PriceFinder. All rights reserved.
          </p>

          <div className="footer-legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Disclaimer</a>
          </div>

          <button
            className="back-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={17} />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;