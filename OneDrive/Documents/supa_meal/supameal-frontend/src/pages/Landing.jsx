import { motion } from "framer-motion";
import { useState } from "react";
import { mailApi } from "../services/api";
import img1 from "../assets/images/restaurant_interior.png";
import "../styles/landing.css";

export default function Landing() {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleContact = async (e) => {
    e.preventDefault();
    setContactError('');
    try {
      await mailApi.contact({
        fullName: contactName,
        email: contactEmail,
        message: contactMessage,
      });
      setContactSent(true);
    } catch (err) {
      setContactError(err.message || 'Failed to send message');
    }
  };

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
            src={img1}
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

            {contactSent ? (
              <p style={{ color: '#4caf80', textAlign: 'center' }}>Message sent successfully!</p>
            ) : (
              <form onSubmit={handleContact}>
                <input
                  placeholder="Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />

                <textarea
                  rows="5"
                  placeholder="Message"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                />

                {contactError && <p style={{ color: '#e05555', fontSize: '0.85rem' }}>{contactError}</p>}

                <button type="submit" className="gold-button">
                  Send Message
                </button>
              </form>
            )}

          </div>

        </motion.div>

      </div>

    </div>
  );
}
