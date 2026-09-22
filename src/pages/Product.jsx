import {useEffect, useMemo ,useState} from "react";
import { useParams, Link } from "react-router-dom";
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
import products from "../data/products";

import "./Product.css";


const offers = [
  {
    store: "Amazon",
    price: 1299,
    delivery: "Free delivery",
    url: "https://www.amazon.in/",
  },
  {
    store: "Flipkart",
    price: 1399,
    delivery: "Free delivery",
    url: "https://www.flipkart.com/",
  },
  {
    store: "Other Store",
    price: 1499,
    delivery: "Delivery available",
    url: "#",
  },
];
function Product() {
  const { id } = useParams();

  const [showAlert, setShowAlert] = useState(false);
  const [alertPrice, setAlertPrice] = useState("");
  const [alertSaved, setAlertSaved] = useState(false);
    const product = useMemo(() => {
    return products.find((item) => item.id === Number(id));
  }, [id]);

  useEffect(() => {
  if (!product) return;

  const savedAlert = localStorage.getItem(
    `priceAlert_${product.id}`
  );

  if (savedAlert) {
    setAlertPrice(savedAlert);
    setAlertSaved(true);
  }
}, [product]);


  // Product not found
  if (!product) {
    return (
      <>
        <Navbar />

        <main className="product-not-found">
          <h1>Product not found</h1>

          <Link to="/products">
            Back to products
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );

  const productOffers = offers.map((offer, index) => {
    if (index === 0) {
      return {
        ...offer,
        price: product.price,
      };
    }

    return {
      ...offer,
      price: product.price + index * 100,
    };
  });

  const sortedOffers = [...productOffers].sort(
    (a, b) => a.price - b.price
  );

  return (
    <>
      <Navbar />

      <main className="product-details-page">
        <div className="product-details-container">

          {/* Back */}
          <Link
            to="/products"
            className="back-products"
          >
            <ArrowLeft size={17} />
            Back to products
          </Link>

          {/* Main Product */}
          <div className="product-details-main">

            {/* Image */}
            <motion.div
              className="details-image"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="details-discount">
                {discount}% OFF
              </span>

              <img
                src={product.image}
                alt={product.name}
              />
            </motion.div>

            {/* Information */}
            <motion.div
              className="details-info"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="details-category">
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <div className="details-rating">
                <Star
                  size={17}
                  fill="currentColor"
                />

                <strong>{product.rating}</strong>

                <span>
                  Customer rating
                </span>
              </div>

              <p className="details-description">
                {product.description}
              </p>

              <div className="details-price">
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

                <span>
                  Save ₹
                  {(
                    product.oldPrice -
                    product.price
                  ).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="details-actions">
                <a
                  href="#offers"
                  className="compare-button"
                >
                  Compare prices
                </a>
                  <button
                className="alert-button"
                type="button"
                onClick={() => setShowAlert(true)}
              >
                <Bell size={17} />
                Price Alert
              </button>
              </div>

              <div className="details-benefits">

                <div>
                  <ShieldCheck size={20} />

                  <span>
                    <strong>
                      Compare before buying
                    </strong>

                    Multiple offers in one place
                  </span>
                </div>

                <div>
                  <Truck size={20} />

                  <span>
                    <strong>
                      Check delivery
                    </strong>

                    Verify availability on store
                  </span>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Features */}
          <section className="details-features">
            <div className="section-title">
              <span>
                PRODUCT INFORMATION
              </span>

              <h2>Key features</h2>
            </div>

            <div className="features-grid">
              {product.features.map(
                (feature) => (
                  <div
                    className="feature-item"
                    key={feature}
                  >
                    <ShieldCheck size={18} />

                    <span>
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Price Comparison */}
          <section
            className="offers-section"
            id="offers"
          >
            <div className="section-title">
              <span>
                PRICE COMPARISON
              </span>

              <h2>
                Available offers
              </h2>

              <p>
                Prices shown here are demo
                data for now.
              </p>
            </div>

            <div className="offers-table">
              {sortedOffers.map(
                (offer, index) => (
                  <motion.div
                    className={`offer-row ${
                      index === 0
                        ? "best-offer"
                        : ""
                    }`}
                    key={offer.store}
                    whileHover={{
                      scale: 1.01,
                    }}
                  >
                    <div className="offer-store">
                      <div className="store-logo">
                        {offer.store.charAt(0)}
                      </div>

                      <div>
                        <strong>
                          {offer.store}
                        </strong>

                        {index === 0 && (
                          <span>
                            Lowest price
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="offer-delivery">
                      {offer.delivery}
                    </div>

                    <strong className="offer-price">
                      ₹
                      {offer.price.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                   <a
                href={offer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="deal-button"
              >
                View Deal
                <ExternalLink size={15} />
              </a>
                  </motion.div>
                )
              )}
            </div>
          </section>

        </div>
        {showAlert && (
  <div
    className="price-alert-overlay"
    onClick={() => setShowAlert(false)}
  >
    <motion.div
      className="price-alert-modal"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="alert-close"
        onClick={() => setShowAlert(false)}
      >
        ×
      </button>

      <div className="alert-icon">
        <Bell size={24} />
      </div>

      <h2>Set a Price Alert</h2>

      <p>
        Get notified when{" "}
        <strong>{product.name}</strong>{" "}
        reaches your target price.
      </p>

      <label>
        Target price
      </label>

      <div className="alert-input">
        <span>₹</span>

        <input
          type="number"
          placeholder="Enter price"
          value={alertPrice}
          onChange={(e) =>
            setAlertPrice(e.target.value)
          }
        />
      </div>
          <button
      className="set-alert-button"
          onClick={() => {
  if (!alertPrice) return;

  localStorage.setItem(
    `priceAlert_${product.id}`,
    alertPrice
  );

  setAlertSaved(true);

  setTimeout(() => {
    setShowAlert(false);
  }, 800);
}}
    >
      Set Price Alert
    </button>
  {alertSaved && (
  <>
    <div className="alert-success">
      ✓ Price alert saved at ₹
      {Number(alertPrice).toLocaleString("en-IN")}
    </div>

    <button
      className="remove-alert-button"
      onClick={() => {
        localStorage.removeItem(`priceAlert_${product.id}`);
        setAlertPrice("");
        setAlertSaved(false);
      }}
    >
      Remove Price Alert
    </button>
  </>
)}
    </motion.div>
  </div>
  )}
      </main>

      <Footer />
    </>
  );
}

export default Product;