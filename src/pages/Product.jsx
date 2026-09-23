import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Star, ShieldCheck, Truck, Bell, CheckCircle2, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";
import "./Product.css";

const storeUrls = {
  Amazon: "https://www.amazon.in/",
  Flipkart: "https://www.flipkart.com/",
  "Other Store": "#",
};

export default function Product() {
  const { id } = useParams();
  const product = useMemo(() => products.find((item) => item.id === Number(id)), [id]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertPrice, setAlertPrice] = useState("");
  const [alertSaved, setAlertSaved] = useState(false);

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [id]);

  useEffect(() => {
    if (!product) return;
    const saved = localStorage.getItem(`priceAlert_${product.id}`);
    if (saved) {
      setAlertPrice(saved);
      setAlertSaved(true);
    } else {
      setAlertPrice("");
      setAlertSaved(false);
    }
  }, [product]);

  if (!product) {
    return <><Navbar /><main className="product-not-found"><div><span>404</span><h1>Product not found</h1><p>The product may have been removed or the link is incorrect.</p><Link to="/products">Back to products</Link></div></main><Footer /></>;
  }

  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  const saving = product.oldPrice - product.price;
  const offers = [
    { store: product.store, price: product.price, delivery: "Free delivery", url: storeUrls[product.store] || "#" },
    { store: product.store === "Amazon" ? "Flipkart" : "Amazon", price: product.price + 100, delivery: "Free delivery", url: storeUrls[product.store === "Amazon" ? "Flipkart" : "Amazon"] },
    { store: "Other Store", price: product.price + 200, delivery: "Delivery available", url: "#" },
  ].sort((a, b) => a.price - b.price);

  const saveAlert = () => {
    const target = Number(alertPrice);
    if (!target || target <= 0) return;
    localStorage.setItem(`priceAlert_${product.id}`, String(target));
    setAlertSaved(true);
    setTimeout(() => setShowAlert(false), 700);
  };

  return (
    <>
      <Navbar />
      <main className="product-details-page">
        <div className="product-details-container">
          <Link to="/products" className="back-products"><ArrowLeft size={16} /> Back to products</Link>

          <section className="product-details-main">
            <motion.div className="details-image" initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}>
              <span className="details-discount">{discount}% OFF</span>
              <div className="details-image-orb" />
              <img src={product.image} alt={product.name} />
            </motion.div>

            <motion.div className="details-info" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}>
              <span className="details-category">{product.category}</span>
              <h1>{product.name}</h1>
              <div className="details-rating">
                <div>{[1,2,3,4,5].map((star) => <Star key={star} size={15} fill={star <= Math.round(product.rating) ? "currentColor" : "none"} />)}</div>
                <strong>{product.rating}</strong><span>Customer rating</span>
              </div>
              <p className="details-description">{product.description}</p>

              <div className="details-price">
                <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
                <span>Save ₹{saving.toLocaleString("en-IN")}</span>
              </div>

              <div className="details-actions">
                <a href="#offers" className="compare-button">Compare prices</a>
                <button className="alert-button" onClick={() => setShowAlert(true)}><Bell size={17} /> Price Alert</button>
              </div>

              <div className="details-benefits">
                <div><ShieldCheck size={19}/><span><strong>Compare before buying</strong>Multiple offers in one place</span></div>
                <div><Truck size={19}/><span><strong>Check delivery</strong>Verify availability on store</span></div>
              </div>
            </motion.div>
          </section>

          <section className="details-features">
            <div className="section-title"><span>PRODUCT INFORMATION</span><h2>Key features</h2></div>
            <div className="features-grid">
              {product.features.map((feature) => <div className="feature-item" key={feature}><CheckCircle2 size={18}/><span>{feature}</span></div>)}
            </div>
          </section>

          <section className="offers-section" id="offers">
            <div className="section-title"><span>PRICE COMPARISON</span><h2>Available offers</h2><p>Demo offers are shown for the frontend. Real affiliate/product URLs can be connected later.</p></div>
            <div className="offers-table">
              {offers.map((offer, index) => (
                <motion.div className={`offer-row ${index === 0 ? "best-offer" : ""}`} key={offer.store} whileHover={{ y: -2 }}>
                  <div className="offer-store"><div className="store-logo">{offer.store.charAt(0)}</div><div><strong>{offer.store}</strong>{index === 0 && <span>Lowest price</span>}</div></div>
                  <div className="offer-delivery">{offer.delivery}</div>
                  <strong className="offer-price">₹{offer.price.toLocaleString("en-IN")}</strong>
                  {offer.url === "#" ? <button className="deal-button" onClick={(e) => e.preventDefault()}>Coming soon <ExternalLink size={14}/></button> : <a href={offer.url} target="_blank" rel="noopener noreferrer" className="deal-button">View Deal <ExternalLink size={14}/></a>}
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {showAlert && (
          <div className="price-alert-overlay" onClick={() => setShowAlert(false)}>
            <motion.div className="price-alert-modal" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()}>
              <button className="alert-close" onClick={() => setShowAlert(false)} aria-label="Close"><X size={18}/></button>
              <div className="alert-icon"><Bell size={22}/></div>
              <h2>Set a price alert</h2>
              <p>We'll store your target price in this browser. Email/WhatsApp notifications can be connected later.</p>
              <label htmlFor="target-price">Target price</label>
              <div className="alert-input"><span>₹</span><input id="target-price" type="number" min="1" placeholder="Enter price" value={alertPrice} onChange={(e) => setAlertPrice(e.target.value)} /></div>
              <button className="set-alert-button" onClick={saveAlert}>Save Price Alert</button>
              {alertSaved && <div className="alert-success"><CheckCircle2 size={16}/> Alert saved at ₹{Number(alertPrice).toLocaleString("en-IN")}</div>}
              {alertSaved && <button className="remove-alert-button" onClick={() => { localStorage.removeItem(`priceAlert_${product.id}`); setAlertPrice(""); setAlertSaved(false); }}>Remove alert</button>}
            </motion.div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
