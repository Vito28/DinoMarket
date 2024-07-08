import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2 className="logo">
              <span>YourShop</span>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum consectetur elit sit amet.
            </p>
            <div className="contact">
              <span>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                Jakarta, Indonesia
              </span>
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
                info@yourshop.com
              </span>
            </div>
            <div className="socials">
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
          <div className="footer-section links">
            <h2>Useful Links</h2>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact-form">
            <h2>Contact Us</h2>
            <form action="#">
              <input type="email" name="email" className="text-input contact-input" placeholder="Your email address" />
              <textarea rows="4" name="message" className="text-input contact-input" placeholder="Your message"></textarea>
              <button type="submit" className="btn btn-big contact-btn">
                <FontAwesomeIcon icon={faEnvelope} />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; YourShop 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;