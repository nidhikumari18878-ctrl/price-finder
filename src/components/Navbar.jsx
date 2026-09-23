import { motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname, location.search]);

  const isProducts = location.pathname.startsWith("/products") || location.pathname.startsWith("/product/");

  return (
    <motion.header
      className="navbar"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="navbar-inner">
        <Link to="/" className="logo" aria-label="PriceFinder home">
          <span className="logo-icon">P</span>
          <span>Price<span className="logo-orange">Finder</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
          <Link className={isProducts ? "active" : ""} to="/products">Products</Link>
          <Link to="/#categories">Categories</Link>
          <Link to="/#deals">Deals</Link>
          <Link to="/#about">About</Link>
        </nav>

        <div className="nav-actions">
          <Link className="search-icon-btn" to="/products" aria-label="Search products">
            <Search size={19} />
          </Link>
          <Link className="nav-search-btn" to="/products">Search Products</Link>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <motion.nav
        className="mobile-menu"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
      >
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/#categories">Categories</Link>
        <Link to="/#deals">Deals</Link>
        <Link to="/#about">About</Link>
      </motion.nav>
    </motion.header>
  );
}
