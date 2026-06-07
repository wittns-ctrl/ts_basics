import { motion } from "framer-motion";
import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing">

      <nav className="top-nav">
        <a href="/">Explore</a>
        <a href="/">About Us</a>
        <a href="/">Services</a>
        <a href="/login">Get Started</a>
      </nav>

      <div className="landing-card">

        <motion.div
          className="left-panel"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >

          <h1>
            Supa<span>Meal</span>
          </h1>

          <p>
            GOOD FOOD GREAT MOMENTS
          </p>

          <button className="gold-button">
            Explore Our Menu
          </button>

          <motion.img
            src="/food.png"
            className="food-image"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

        </motion.div>

        <motion.div
          className="right-panel"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >

          <div className="service-grid">

            <motion.div
              className="service-box"
              whileHover={{
                scale: 1.05,
              }}
            >
              Order Online
            </motion.div>

            <motion.div
              className="service-box"
              whileHover={{
                scale: 1.05,
              }}
            >
              Restaurant
            </motion.div>

            <motion.div
              className="service-box"
              whileHover={{
                scale: 1.05,
              }}
            >
              Special Offers
            </motion.div>

          </div>

          <div className="contact-area">

            <h2>
              Why Choose SupaMeal
            </h2>

            <input placeholder="Name" />

            <input placeholder="Email Address" />

            <textarea
              rows="5"
              placeholder="Message"
            />

            <button className="gold-button">
              Send Message
            </button>

          </div>

        </motion.div>

      </div>

    </div>
  );
}