import React from "react";

//stryles
import styles from "./Footer.module.css";

//Components
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Logo color="#fff" />
      <h5>Contact Us On Social Media</h5>
      <div className={styles.footer__socialLinks}>
        <i className="fab fa-facebook-square"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-linkedin"></i>
      </div>
    </div>
  );
};

export default Footer;
