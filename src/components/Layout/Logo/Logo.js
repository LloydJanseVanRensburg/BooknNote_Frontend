import React from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./Logo.module.css";

const Logo = ({ color }) => {
  return (
    <div className={styles.logo}>
      <Link to="/" className={styles.logo__homeLink}>
        <span className={styles.logo__words} style={{ color: color }}>
          BooknNote
        </span>
        <span className={styles.logo__circle}>com</span>
      </Link>
    </div>
  );
};

export default Logo;
