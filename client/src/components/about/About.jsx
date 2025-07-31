import React from "react";
import styles from "./about.module.css";
import Navbar from "../navbar/Navbar";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function About() {
  return (
    <section>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.heading}>About This Blog</h2>
        <p className={styles.paragraph}>
          Welcome to <strong>MyBlogApp</strong> — a platform for writers,
          thinkers, and enthusiasts to share their insights, ideas, and
          experiences with the world.
        </p>
        <p className={styles.paragraph}>
          Whether you're into tech, fashion, travel, or nature, there's
          something here for everyone. Our mission is to foster creativity and
          bring together a community of passionate bloggers.
        </p>
        <p className={styles.paragraph}>
          Built with <code>MERN stack</code> (MongoDB, Express, React, Node.js),
          this app allows users to create, edit, and explore blogs across
          various categories.
        </p>
        <p className={styles.paragraph}>
          Thank you for visiting! We hope you find inspiration and enjoyment in
          every post.
        </p>
      </div>

      {/* Extra Info Section */}
      <div className={styles.infoWrapper}>
        <section className={styles.teamInfo}>
          <h3>Our Team</h3>
          <ul>
            <li>Jane Doe – Editor</li>
            <li>John Smith – Designer</li>
            <li>Emily Chan – Developer</li>
          </ul>
        </section>

        <section className={styles.externalLinks}>
          <h3>Learn More</h3>
          <ul>
            <li>
              <a
                href="https://developer.mozilla.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                MDN Web Docs
              </a>
            </li>
            <li>
              <a
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                React Docs
              </a>
            </li>
            <li>
              <a
                href="https://nodejs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Node.js
              </a>
            </li>
          </ul>
        </section>
        <section className={styles.socialLinks}>
          <h3>Social Media</h3>
          <p className={styles.socialParagraph}>
            Follow us on social platforms to stay updated with our latest
            content
            <br />
            and behind-the-scenes updates.
          </p>
          <ul className={styles.socialLinks}>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter size={24} color="#1DA1F2" />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} color="#1877F2" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={24} color="#C13584" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
