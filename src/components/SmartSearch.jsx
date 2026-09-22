import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Star,
} from "lucide-react";
import { useState } from "react";
import "./SmartSearch.css";

const products = [
  {
    id: 1,
    name: "boAt Airdopes 141",
    category: "Audio",
    price: 1299,
    oldPrice: 2990,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Sony WH-CH520",
    category: "Audio",
    price: 4499,
    oldPrice: 5990,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Noise ColorFit Pro",
    category: "Watches",
    price: 2499,
    oldPrice: 4999,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Logitech K380",
    category: "Gaming",
    price: 2899,
    oldPrice: 3995,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80",
  },
];

function SmartSearch() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <section className="smart-search" id="search">
      <div className="smart-search-container">

        <motion.div
          className="smart-search-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="search-eyebrow">DISCOVER PRODUCTS</span>

          <h2>
            Search smarter.
            <span> Buy better.</span>
          </h2>

          <p>
            Search products, compare prices and find options that fit your
            budget.
          </p>
        </motion.div>

        <motion.div
          className="smart-search-bar"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Search size={22} />

          <input
            type="text"
            placeholder="Search for headphones, laptops, watches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              <X size={18} />
            </button>
          )}

          <button className="search-action">
            Search
          </button>
        </motion.div>

        <div className="search-toolbar">
          <div>
            <strong>{filteredProducts.length}</strong> products found
          </div>

          <div className="toolbar-actions">
            <button
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <div className="sort-box">
              <ArrowUpDown size={16} />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort by</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {showFilters && (
          <motion.div
            className="filter-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <div>
              <label>Category</label>
              <select>
                <option>All Categories</option>
                <option>Mobiles</option>
                <option>Laptops</option>
                <option>Audio</option>
                <option>Gaming</option>
                <option>Watches</option>
              </select>
            </div>

            <div>
              <label>Maximum Budget</label>
              <select>
                <option>Any Budget</option>
                <option>Under ₹1,000</option>
                <option>Under ₹2,000</option>
                <option>Under ₹5,000</option>
                <option>Under ₹10,000</option>
              </select>
            </div>

            <div>
              <label>Minimum Rating</label>
              <select>
                <option>Any Rating</option>
                <option>4★ & above</option>
                <option>4.5★ & above</option>
              </select>
            </div>
          </motion.div>
        )}

        <div className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.article
                className="search-product-card"
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />

                  <span className="discount">
                    {Math.round(
                      ((product.oldPrice - product.price) /
                        product.oldPrice) *
                        100
                    )}
                    % OFF
                  </span>
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <div className="rating">
                    <Star size={15} fill="currentColor" />
                    {product.rating}
                  </div>

                  <div className="price-row">
                    <strong>₹{product.price.toLocaleString()}</strong>
                    <del>₹{product.oldPrice.toLocaleString()}</del>
                  </div>

                  <button className="compare-btn">
                    Compare Prices
                  </button>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="no-results">
              <Search size={40} />
              <h3>No products found</h3>
              <p>Try searching for another product.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default SmartSearch;