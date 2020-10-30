import React, { useContext } from "react";
import { Link } from "react-router-dom";

//styles
import styles from "./AdvertCard.module.css";
import AdvertContext from "../../../context/adverts/advertContext";

const AdvertCard = ({ advert }) => {
  const advertCntext = useContext(AdvertContext);

  const { loadCurrentAd, clearCurrentAd } = advertCntext;

  const singleAdvertHandler = (id) => {
    clearCurrentAd();
    loadCurrentAd(id);
  };

  return (
    <Link
      to={`/singlepost/${advert._id}`}
      onClick={() => singleAdvertHandler(advert._id)}
    >
      <div className={styles.advertcard}>
        <span
          className={styles.advertcard__typeSleeve}
          style={
            advert.type === "note"
              ? { borderTop: "90px solid var(--success-color)" }
              : { borderTop: "90px solid var(--warning-color)" }
          }
        ></span>
        <span className={styles.advertcard__typeText}>
          {advert.type ? advert.type.toUpperCase() : ""}
        </span>
        <img
          className={styles.advertcard__thumbnail}
          src={`http://localhost:5000/${advert.imageUrl}`}
          alt={advert.title}
        />
        <div className={styles.advertcard__info}>
          <h3>{advert.title}</h3>
          <p>{advert.moduleId}</p>
          <p>{advert.seller}</p>
          <p>
            {advert.type === "note"
              ? `${
                  advert.reviews.averageRating
                    ? advert.reviews.averageRating
                    : ""
                } / 5`
              : null}
          </p>
          <p>R {advert.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default AdvertCard;
