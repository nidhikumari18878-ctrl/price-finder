import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Star, ShieldCheck, Truck, Bell, CheckCircle2, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createPriceAlert, getProductById } from "../services/productService";
import "./Product.css";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertPrice, setAlertPrice] = useState("");
  const [email, setEmail] = useState("");
  const [alertSaved, setAlertSaved] = useState(false);
  const [alertError, setAlertError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let cancelled = false;
    setLoading(true);
    getProductById(id).then((data) => {
      if (!cancelled) setProduct(data);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <><Navbar /><main className="product-not-found"><div><span>...</span><h1>Loading product</h1><p>Fetching the latest product details.</p></div></main><Footer /></>;

  if (!product) return <><Navbar /><main className="product-not-found"><div><span>404</span><h1>Product not found</h1><p>The product may have been removed or the link is incorrect.</p><Link to="/products">Back to products</Link></div></main><Footer /></>;

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const saving = product.oldPrice ? product.oldPrice - product.price : 0;
  const offers = (product.offers?.length ? product.offers : [{ store: product.store, price: product.price, delivery: "Check store", productUrl: product.productUrl, affiliateUrl: product.affiliateUrl }])
    .sort((a, b) => a.price - b.price);

  const saveAlert = async () => {
    const target = Number(alertPrice);
    if (!target || target <= 0 || !email.trim()) {
      setAlertError("Enter a valid target price and email.");
      return;
    }
    try {
      await createPriceAlert({ productId: product._id, email: email.trim(), targetPrice: target });
      setAlertSaved(true);
      setAlertError("");
    } catch {
      setAlertError("Could not save the alert. Please check the backend.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="product-details-page">
        <div className="product-details-container">
          <Link to="/products" className="back-products"><ArrowLeft size={16} /> Back to products</Link>
          <section className="product-details-main">
            <motion.div className="details-image" initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}>
              {discount > 0 && <span className="details-discount">{discount}% OFF</span>}
              <div className="details-image-orb" /><img src={product.image} alt={product.name} />
            </motion.div>
            <motion.div className="details-info" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }}>
              <span className="details-category">{product.category}</span>
              <h1>{product.name}</h1>
              <div className="details-rating"><div>{[1,2,3,4,5].map((star) => <Star key={star} size={15} fill={star <= Math.round(product.rating) ? "currentColor" : "none"} />)}</div><strong>{product.rating}</strong><span>Customer rating</span></div>
              <p className="details-description">{product.description}</p>
              <div className="details-price"><strong>₹{product.price.toLocaleString("en-IN")}</strong>{product.oldPrice && <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>}{saving > 0 && <span>Save ₹{saving.toLocaleString("en-IN")}</span>}</div>
              <div className="details-actions"><a href="#offers" className="compare-button">Compare prices</a><button className="alert-button" onClick={() => setShowAlert(true)}><Bell size={17} /> Price Alert</button></div>
              <div className="details-benefits"><div><ShieldCheck size={19}/><span><strong>Compare before buying</strong>Multiple offers in one place</span></div><div><Truck size={19}/><span><strong>Check delivery</strong>Verify availability on store</span></div></div>
            </motion.div>
          </section>

          <section className="details-features"><div className="section-title"><span>PRODUCT INFORMATION</span><h2>Key features</h2></div><div className="features-grid">{product.features.map((feature) => <div className="feature-item" key={feature}><CheckCircle2 size={18}/><span>{feature}</span></div>)}</div></section>

          <section className="offers-section" id="offers">
            <div className="section-title"><span>PRICE COMPARISON</span><h2>Available offers</h2><p>Store links are placeholders until real product or affiliate URLs are connected.</p></div>
            <div className="offers-table">
              {offers.map((offer, index) => {
                const url = offer.affiliateUrl || offer.productUrl || "";
                return <motion.div className={`offer-row ${index === 0 ? "best-offer" : ""}`} key={`${offer.store}-${offer.price}`} whileHover={{ y: -2 }}>
                  <div className="offer-store"><div className="store-logo">{offer.store.charAt(0)}</div><div><strong>{offer.store}</strong>{index === 0 && <span>Lowest price</span>}</div></div>
                  <div className="offer-delivery">{offer.delivery || "Check store"}</div>
                  <strong className="offer-price">₹{offer.price.toLocaleString("en-IN")}</strong>
                  {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="deal-button">View Deal <ExternalLink size={14}/></a> : <button className="deal-button" onClick={(e) => e.preventDefault()}>Coming soon <ExternalLink size={14}/></button>}
                </motion.div>;
              })}
            </div>
          </section>
        </div>

        {showAlert && <div className="price-alert-overlay" onClick={() => setShowAlert(false)}>
          <motion.div className="price-alert-modal" initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()}>
            <button className="alert-close" onClick={() => setShowAlert(false)} aria-label="Close"><X size={18}/></button>
            <div className="alert-icon"><Bell size={22}/></div><h2>Set a price alert</h2>
            <p>Save a target price to the backend. Notification delivery can be connected later.</p>
            <label htmlFor="alert-email">Email</label>
            <div className="alert-input"><input id="alert-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <label htmlFor="target-price">Target price</label>
            <div className="alert-input"><span>₹</span><input id="target-price" type="number" min="1" placeholder="Enter price" value={alertPrice} onChange={(e) => setAlertPrice(e.target.value)} /></div>
            <button className="set-alert-button" onClick={saveAlert}>Save Price Alert</button>
            {alertError && <div className="alert-success">{alertError}</div>}
            {alertSaved && <div className="alert-success"><CheckCircle2 size={16}/> Alert saved successfully</div>}
          </motion.div>
        </div>}
      </main>
      <Footer />
    </>
  );
}
