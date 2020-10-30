import React from "react";

//styles
import styles from "./RowComp.module.css";

//Components
import AdvertCard from "../../../Layout/AdvertCard/AdvertCard";

const RowComp = ({ title, data }) => {
  return (
    <div className={styles.rowcomp}>
      <h1 className={styles.rowcomp__title}>{title}</h1>
      <div className={styles.rowcomp__items}>
        {data && data.length > 0 ? (
          data.map((advert) => <AdvertCard key={advert._id} advert={advert} />)
        ) : (
          <p>No Adverts Loaded</p>
        )}
      </div>
    </div>
  );
};

export default RowComp;
