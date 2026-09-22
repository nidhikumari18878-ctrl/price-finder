import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-inner">

        {/* Logo */}
        <a href="/" className="logo">
          <span className="logo-icon">P</span>
          <span>
            Price<span className="logo-orange">Finder</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="/">Home</a>
          <a href="#categories">Categories</a>
          <a href="#deals">Deals</a>
          <a href="#about">About</a>
        </nav>

        {/* Right Side */}
        <div className="nav-actions">

          <motion.button
            className="search-icon-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
          >
            <Search size={20} />
          </motion.button>

          <motion.a
            href="#search"
            className="nav-search-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Search Products
          </motion.a>

          {/* Mobile Menu */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="mobile-menu"
        initial={false}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        style={{ overflow: "hidden" }}
      >
        <a href="/" onClick={() => setMenuOpen(false)}>
          Home
        </a>

        <a href="#categories" onClick={() => setMenuOpen(false)}>
          Categories
        </a>

        <a href="#deals" onClick={() => setMenuOpen(false)}>
          Deals
        </a>

        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
        </a>
      </motion.div>
    </motion.header>
  );
}