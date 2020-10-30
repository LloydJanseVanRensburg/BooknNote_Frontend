import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

//Component
import AuthContext from "../../../../context/auth/authContext";

//styles
import styles from "./NavLinks.module.css";

const NavLinks = ({ visibility }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  let linkStyles;

  const onLogout = () => {
    logout();
  };

  const loggedInLinks = (
    <>
      <li className={`${styles.navlinks__link} ${styles.navlinks__shopnow}`}>
        <NavLink to="/advertisehere">Advertise Here</NavLink>
      </li>
      <li className={styles.navlinks__link}>
        <NavLink to="/profile/">Profile</NavLink>
      </li>
      <li className={styles.navlinks__link}>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const notLoggedInLink = (
    <>
      <li className={`${styles.navlinks__link} ${styles.navlinks__shopnow}`}>
        <NavLink to="/advertisehere">Advertise Here</NavLink>
      </li>
      <li className={styles.navlinks__link}>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li className={styles.navlinks__link}>
        <NavLink to="/register">Register</NavLink>
      </li>
    </>
  );

  if (visibility) {
    linkStyles = `${styles.navlinks} ${styles.active}`;
  } else {
    linkStyles = `${styles.navlinks} ${styles.inactive}`;
  }

  return (
    <ul className={linkStyles}>
      {isAuthenticated ? loggedInLinks : notLoggedInLink}
    </ul>
  );
};

export default NavLinks;
