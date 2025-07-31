import React from "react";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";
import womanImg from "../../assets/woman.jpg";
import { useState } from "react";

const Navbar = ({ scrollToCategories, scrollToFooter }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/">BlogApp</Link>
        </div>
        <ul className={classes.center}>
          <li className={classes.listItem}>
            {/* <Link to="/">Home</Link> */}
            Home
          </li>
          <li className={classes.listItem}>
            <Link to="/about" className={classes.nav}>
              About
            </Link>
          </li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToCategories();
            }}
          >
            <span className={classes.nav}>Categories</span>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToFooter();
            }}
          >
            <span className={classes.nav}>Contacts</span>
          </a>
        </ul>
        <div className={classes.right}>
          <img
            onClick={() => setShowModal((prev) => !prev)}
            src={womanImg}
            className={classes.img}
          />
          {showModal && (
            <div className={classes.modal}>
              <Link to="/create">Create</Link>
              <span>Logout</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
