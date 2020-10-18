import React from "react";

//styles
import styles from "./RowComp.module.css";

//Components
import AdvertCard from "../../../Layout/AdvertCard/AdvertCard";

const RowComp = ({ title }) => {
  return (
    <div className={styles.rowcomp}>
      <h1 className={styles.rowcomp__title}>{title}</h1>
      <div className={styles.rowcomp__items}>
        <AdvertCard
          image="https://approachingtheelephant.com/wp-content/uploads/1_1024x1024-word-search-puzzle-books-image-ideas-coloring-sheet-best-of-all-time-where-to-buy-kappa-bible-large.jpg"
          title="Note 01"
          subject="BMAN"
          seller="Lloyd Janse van Rensburg"
          rating="4.5"
          price="R 250-00"
        />
        <AdvertCard
          image="https://approachingtheelephant.com/wp-content/uploads/1_1024x1024-word-search-puzzle-books-image-ideas-coloring-sheet-best-of-all-time-where-to-buy-kappa-bible-large.jpg"
          title="Note 01"
          subject="BMAN"
          seller="Lloyd Janse van Rensburg"
          rating="4.5"
          price="R 250-00"
        />
        <AdvertCard
          image="https://approachingtheelephant.com/wp-content/uploads/1_1024x1024-word-search-puzzle-books-image-ideas-coloring-sheet-best-of-all-time-where-to-buy-kappa-bible-large.jpg"
          title="Note 01"
          subject="BMAN"
          seller="Lloyd Janse van Rensburg"
          rating="4.5"
          price="R 250-00"
        />
        <AdvertCard
          image="https://approachingtheelephant.com/wp-content/uploads/1_1024x1024-word-search-puzzle-books-image-ideas-coloring-sheet-best-of-all-time-where-to-buy-kappa-bible-large.jpg"
          title="Note 01"
          subject="BMAN"
          seller="Lloyd Janse van Rensburg"
          rating="4.5"
          price="R 250-00"
        />
      </div>
    </div>
  );
};

export default RowComp;
