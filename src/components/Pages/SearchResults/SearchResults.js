import React, { useContext, useEffect } from "react";

import { Link } from "react-router-dom";

import styles from "./SearchResults.module.css";

import AdvertContext from "../../../context/adverts/advertContext";
import Spinner from "../../Layout/Spinner/Spinner";

const SearchResults = () => {
  const advertContext = useContext(AdvertContext);
  const { search, loading } = advertContext;

  useEffect(() => {
    if (search) {
      console.log(search);
    }
  }, [search]);

  return (
    <>
      <h1 className={styles.searchTitle}>Search Results:</h1>
      <div className={styles.results}>
        {search && !loading ? (
          search.map((adv) => {
            return (
              <Link to={`/singlepost/${adv._id}`}>
                <div className={styles.advertcard}>
                  <span
                    className={styles.advertcard__typeSleeve}
                    style={
                      adv.type === "note"
                        ? { borderTop: "90px solid var(--success-color)" }
                        : { borderTop: "90px solid var(--warning-color)" }
                    }
                  ></span>
                  <span className={styles.advertcard__typeText}>
                    {adv.type ? adv.type.toUpperCase() : ""}
                  </span>
                  <img
                    className={styles.advertcard__thumbnail}
                    src={`http://localhost:5000/${adv.imageUrl}`}
                    alt={adv.title}
                  />
                  <div className={styles.advertcard__info}>
                    <h3>{adv.title}</h3>
                    <p>{adv.moduleId}</p>
                    <p>{adv.seller}</p>
                    <p>
                      {adv.type === "note"
                        ? `${
                            adv.reviews.averageRating
                              ? adv.reviews.averageRating
                              : ""
                          } / 5`
                        : null}
                    </p>
                    <p>R {adv.price}</p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default SearchResults;
