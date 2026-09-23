import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productService";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal, Star, ArrowUpDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";
import "./Products.css";

const categories = ["All", "Audio", "Watches", "Gaming"];

function ProductCard({ product, index }) {
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  const saving = product.oldPrice - product.price;

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.045, duration: 0.35 }}
      whileHover={{ y: -6 }}
    >
      <Link to={`/product/${product.id}`} className="product-card-image">
        <span className="discount-badge">{discount}% OFF</span>
        <span className="category-pill">{product.category}</span>
        <div className="product-image-orb" />
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>

      <div className="product-card-content">
        <div className="product-card-topline">
          <span>{product.store}</span>
          <div className="product-rating" aria-label={`${product.rating} out of 5 stars`}>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={13} fill={star <= Math.round(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <strong>{product.rating}</strong>
          </div>
        </div>

        <h2>{product.name}</h2>
        <p>{product.description}</p>

        <div className="product-card-price">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
        </div>
        <span className="product-saving">Save ₹{saving.toLocaleString("en-IN")}</span>

        <Link to={`/product/${product.id}`} className="product-view-button">
          Compare Deals <ArrowUpDown size={15} />
        </Link>
      </div>
    </motion.article>
  );
}

export default function Products() {
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "All";
  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(categories.includes(urlCategory) ? urlCategory : "All");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);

  useEffect(() => {
    setSearch(urlSearch);
    setCategory(categories.includes(urlCategory) ? urlCategory : "All");
  }, [urlSearch, urlCategory]);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    const matchesPrice = product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  }), [search, category, maxPrice]);

  const sortedProducts = useMemo(() => [...filteredProducts].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return a.id - b.id;
  }), [filteredProducts, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice(10000);
    setSort("featured");
    setShowFilters(false);
  };

  return (
    <>
      <Navbar />
      <main className="products-page">
        <div className="products-container">
          <motion.section className="products-heading" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <span>PRICEFINDER COLLECTION</span>
            <h1>Find the <strong>right price.</strong></h1>
            <p>Search products, compare deals and stay inside your budget.</p>
          </motion.section>

          <div className="products-search">
            <Search size={20} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." aria-label="Search products" />
            {search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={17} /></button>}
          </div>

          <div className="products-toolbar">
            <div><strong>{sortedProducts.length}</strong> products found</div>
            <div className="toolbar-right">
              <button className="mobile-filter-button" onClick={() => setShowFilters((value) => !value)}>
                <SlidersHorizontal size={16} /> Filters
              </button>
              <label className="sort-control">
                <span>Sort:</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </label>
            </div>
          </div>

          <div className="products-layout">
            <aside className={`products-filters ${showFilters ? "show-mobile" : ""}`}>
              <div className="filter-heading">
                <div><span>REFINE</span><h3>Filters</h3></div>
                <button onClick={resetFilters}>Reset</button>
              </div>

              <div className="filter-group">
                <label>Category</label>
                {categories.map((item) => (
                  <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
                    <span>{item}</span><small>{item === "All" ? products.length : products.filter((p) => p.category === item).length}</small>
                  </button>
                ))}
              </div>

              <div className="price-filter">
                <div className="price-filter-label"><label>Maximum budget</label><strong>₹{maxPrice.toLocaleString("en-IN")}</strong></div>
                <input type="range" min="500" max="10000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                <div className="range-labels"><span>₹500</span><span>₹10K+</span></div>
              </div>

              <div className="budget-presets">
                <button className={maxPrice === 2000 ? "active" : ""} onClick={() => setMaxPrice(2000)}>Under ₹2K</button>
                <button className={maxPrice === 5000 ? "active" : ""} onClick={() => setMaxPrice(5000)}>Under ₹5K</button>
                <button className={maxPrice === 10000 ? "active" : ""} onClick={() => setMaxPrice(10000)}>Under ₹10K</button>
              </div>

              <button className="reset-filters" onClick={resetFilters}>Reset all filters</button>
            </aside>

            <section className="products-grid" aria-live="polite">
              {sortedProducts.length === 0 ? (
                <div className="products-empty">
                  <div className="empty-icon"><Search size={25} /></div>
                  <h3>No products found</h3>
                  <p>Try changing your search, category or budget.</p>
                  <button onClick={resetFilters}>Reset Filters</button>
                </div>
              ) : sortedProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
