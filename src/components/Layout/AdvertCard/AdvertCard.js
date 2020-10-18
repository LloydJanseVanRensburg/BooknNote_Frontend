import React from "react";

//styles
import styles from "./AdvertCard.module.css";

const AdvertCard = ({ image, title, subject, seller, rating, price }) => {
  return (
    <div className={styles.advertcard}>
      <img className={styles.advertcard__thumbnail} src={image} alt="" />
      <div className={styles.advertcard__info}>
        <h3>{title}</h3>
        <p>{subject}</p>
        <p>{seller}</p>
        <p>{rating}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default AdvertCard;
