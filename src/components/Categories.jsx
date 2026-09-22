import { motion } from "framer-motion";
import {
  Smartphone,
  Laptop,
  Headphones,
  Shirt,
  Home,
  Gamepad2,
  Camera,
  Watch,
  ArrowUpRight,
} from "lucide-react";
import "./Categories.css";

const categories = [
  {
    name: "Mobiles",
    description: "Smartphones & accessories",
    icon: Smartphone,
  },
  {
    name: "Laptops",
    description: "Work & gaming laptops",
    icon: Laptop,
  },
  {
    name: "Audio",
    description: "Earbuds & headphones",
    icon: Headphones,
  },
  {
    name: "Fashion",
    description: "Clothing & footwear",
    icon: Shirt,
  },
  {
    name: "Home & Kitchen",
    description: "Everything for your home",
    icon: Home,
  },
  {
    name: "Gaming",
    description: "Consoles & gaming gear",
    icon: Gamepad2,
  },
  {
    name: "Cameras",
    description: "Cameras & photography",
    icon: Camera,
  },
  {
    name: "Watches",
    description: "Smart & classic watches",
    icon: Watch,
  },
];

export default function Categories() {
  return (
    <section className="categories-section" id="categories">
      <div className="categories-container">

        {/* Heading */}
        <motion.div
          className="categories-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="categories-eyebrow">
              EXPLORE
            </span>

            <h2>
              Shop by <span>category</span>
            </h2>

            <p>
              Explore popular categories and find the products
              you are looking for at the right price.
            </p>
          </div>

          <motion.button
            className="categories-view-all"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.96 }}
          >
            View all
            <ArrowUpRight size={17} />
          </motion.button>
        </motion.div>

        {/* Category Grid */}
        <div className="categories-grid">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.button
                key={category.name}
                className="category-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.06,
                }}
                whileHover={{ y: -7 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="category-icon">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>

                <div className="category-arrow">
                  <ArrowUpRight size={17} />
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
}