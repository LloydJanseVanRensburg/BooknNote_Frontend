import React from "react";
import { NavLink } from "react-router-dom";

//styles
import styles from "./NavLinks.module.css";

const NavLinks = ({ visibility }) => {
  let linkStyles;

  if (visibility) {
    linkStyles = `${styles.navlinks} ${styles.active}`;
  } else {
    linkStyles = `${styles.navlinks} ${styles.inactive}`;
  }

  return (
    <ul className={linkStyles}>
      <li className={`${styles.navlinks__link} ${styles.navlinks__shopnow}`}>
        <NavLink to="/shop">Advertise Now</NavLink>
      </li>
      <li className={styles.navlinks__link}>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li className={styles.navlinks__link}>
        <NavLink to="/register">Register</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
