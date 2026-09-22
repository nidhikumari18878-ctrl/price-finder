import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Search,
  X,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";

import "./Products.css";


const categories = [
  "All",
  "Audio",
  "Watches",
  "Gaming",
];

function Products() {
  const [searchParams] = useSearchParams();
const urlSearch = searchParams.get("search") || "";
const urlCategory = searchParams.get("category") || "All";
  const [search, setSearch] = useState(urlSearch);
 const [category, setCategory] = useState(urlCategory);
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] =
    useState(false);
const [maxPrice, setMaxPrice] = useState(10000);
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;
        const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sort === "price-low") return a.price - b.price;
  if (sort === "price-high") return b.price - a.price;
  if (sort === "rating") return b.rating - a.rating;
  return 0;
});
  }, [search, category, sort]);

  const clearSearch = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <>
      <Navbar />

      <main className="products-page">
        <div className="products-container">

          {/* Heading */}
          <motion.div
            className="products-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>PRICEFINDER COLLECTION</span>

            <h1>
              Find products at the{" "}
              <strong>right price.</strong>
            </h1>

            <p>
              Search, compare and discover products
              that fit your budget.
            </p>
          </motion.div>

          {/* Search */}
          <div className="products-search">
            <Search size={20} />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Toolbar */}
          <div className="products-toolbar">

            <div>
              <strong>
                {filteredProducts.length}
              </strong>{" "}
              products found
            </div>

            <div className="toolbar-right">

              <button
                className="mobile-filter-button"
                onClick={() =>
                  setShowFilters(!showFilters)
                }
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              <div className="sort-control">
                <span>Sort:</span>

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="low">
                    Price: Low to High
                  </option>

                  <option value="high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Highest Rated
                  </option>
                </select>
              </div>

            </div>
          </div>

          {/* Layout */}
          <div className="products-layout">

            {/* Filters */}
            <aside
              className={`products-filters ${
                showFilters
                  ? "show-mobile"
                  : ""
              }`}
            >
              <div className="filter-heading">
                <h3>Filters</h3>

                <button
                  onClick={clearSearch}
                >
                  Reset
                </button>
              </div>

              <div className="filter-group">
                <label>Category</label>

                {categories.map(
                  (item) => (
                    <button
                      key={item}
                      className={
                        category === item
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setCategory(item)
                      }
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              <div className="price-filter">
              <label>
                Maximum Budget: ₹{maxPrice.toLocaleString("en-IN")}
              </label>

              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
            <div className="budget-presets">
            <button onClick={() => setMaxPrice(2000)}>
              Under ₹2K
            </button>

            <button onClick={() => setMaxPrice(5000)}>
              Under ₹5K
            </button>

            <button onClick={() => setMaxPrice(10000)}>
              Under ₹10K
            </button>
          </div>
          <button
            className="reset-filters"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setMaxPrice(10000);
            }}
          >
            Reset Filters
          </button>
            </aside>

            {/* Products */}
            <section className="products-grid">

              {filteredProducts.length === 0 ? (
              <div className="products-empty">
  <h3>No products found</h3>
  <p>Try changing your search, category, or budget.</p>

  <button
    onClick={() => {
      setSearch("");
      setCategory("All");
      setMaxPrice(10000);
    }}
  >
    Reset Filters
  </button>
</div>
              ) : (
                sortedProducts.map(
                  (product, index) => {
                    const discount =
                      Math.round(
                        ((product.oldPrice -
                          product.price) /
                          product.oldPrice) *
                          100
                      );

                    return (
                      <motion.article
                        className="product-card"
                        key={product.id}
                        initial={{
                          opacity: 0,
                          y: 25,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.05,
                        }}
                        whileHover={{
                          y: -6,
                        }}
                      >

                        <div className="product-card-image">
                          <span>
                            {discount}% OFF
                          </span>
                          <div className="discount-badge">
                          {Math.round(
                            ((product.oldPrice - product.price) / product.oldPrice) * 100
                          )}
                        % OFF
                        </div>
                             <img
                            src={product.image}
                            alt={product.name}
                          />
                        </div>

                        <div className="product-card-content">

                          <small>
                            {product.category}
                          </small>

                          <h2>
                            {product.name}
                          </h2>

                          <div className="product-card-rating">
                            <Star
                              size={14}
                              fill="currentColor"
                            />

                            {product.rating}
                          </div>
                          <div className="product-store">
                                    <span>Available on</span>
                                    <strong>{product.store}</strong>
                                  </div>

                          <div className="product-card-price">
                            <strong>
                              ₹
                              {product.price.toLocaleString(
                                "en-IN"
                              )}
                            </strong>

                            <del>
                              ₹
                              {product.oldPrice.toLocaleString(
                                "en-IN"
                              )}
                            </del>
                          </div>
                              <div className="product-rating">
                            <div className="rating-stars">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={14}
                                  fill={star <= Math.round(product.rating) ? "currentColor" : "none"}
                                />
                              ))}
                            </div>

                            <span>{product.rating}</span>
                          </div>
                          <div className="product-card-store">
                            Available on{" "}
                            <strong>
                              {product.platform}
                            </strong>
                          </div>

                          <Link
                            to={`/product/${product.id}`}
                            className="product-view-button"
                          >
                            View Product
                          </Link>

                        </div>
                      </motion.article>
                    );
                  }
                )
              )}

            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Products;