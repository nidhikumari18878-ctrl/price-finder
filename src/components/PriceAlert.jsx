import { motion } from "framer-motion";
import { BellRing, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import "./PriceAlert.css";

function PriceAlert() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="price-alert" id="alerts">
      <div className="price-alert-container">
        <motion.div
          className="alert-glow alert-glow-one"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="alert-glow alert-glow-two"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="alert-icon"
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
        >
          <BellRing size={28} />
        </motion.div>

        <motion.div
          className="alert-content"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span>PRICE ALERTS</span>

          <h2>
            Don't miss the
            <strong> right price.</strong>
          </h2>

          <p>
            Get notified about interesting deals and price changes for the
            products you care about.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            className="alert-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="alert-input">
              <Mail size={19} />

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit">
              Get alerts
              <ArrowRight size={18} />
            </button>
          </motion.form>
        ) : (
          <motion.div
            className="alert-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle2 size={22} />
            <span>You're on the list!</span>
          </motion.div>
        )}

        <p className="alert-note">
          No spam. Only useful price and deal updates.
        </p>
      </div>
    </section>
  );
}

export default PriceAlert;