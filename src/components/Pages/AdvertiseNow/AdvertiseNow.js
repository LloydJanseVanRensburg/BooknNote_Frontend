import React from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./AdvertiseNow.module.css";

const AdvertiseNow = () => {
  return (
    <div className={styles.advertisenow}>
      <h1>Which type of Advert are you creating</h1>
      <div className={styles.advertisenow__buttonContainer}>
        <Link to="/advert/book">
          <div className={styles.buttonContainer__bookBtn}>
            <h4>Book</h4>
          </div>
        </Link>
        <Link to="/advert/note">
          <div className={styles.buttonContainer__noteBtn}>
            <h4>Note</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdvertiseNow;
