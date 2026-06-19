import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.right}>
        <div>
          <img
            src="/local/placeholder.svg"
            alt="red bus logo"
            height="60px"
          />
        </div>
        <div className={styles.navLink}>
          <Link to="/bus-tickets" className={styles.removeunderline}>
            <p className={styles.white}>Bus Tickets</p>
          </Link>
          <Link to="/rpool" className={styles.removeunderline}>
            <p className={styles.white}>rPool</p>
          </Link>
          <Link to="/bus-hire" className={styles.removeunderline}>
            <p className={styles.white}>BUS HIRE</p>
          </Link>
        </div>
      </div>
      <div className={styles.left}>
        <p className={styles.white}>Manage Booking</p>
        <p className={styles.white}>Help</p>
      </div>
    </div>
  );
};

export default Navbar;
