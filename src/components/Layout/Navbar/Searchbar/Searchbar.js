import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

//styles
import styles from "./Searchbar.module.css";

const Searchbar = () => {
  const [searchToggle, setSearchToggle] = useState(false);

  const onIconSearchHandler = () => {
    setSearchToggle(!searchToggle);
  };

  const onIconCloseSearchHandler = () => {
    setSearchToggle(false);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1170px)" });

  if (!isMobile && searchToggle) {
    setSearchToggle(false);
  }

  if (searchToggle && isMobile) {
    return (
      <div className={styles.fullSearchNav}>
        <div className={styles.searchbar}>
          <input
            type="text"
            className={styles.searchbar__input}
            placeholder="What are you loooking for?"
          />
          <div className={styles.searchbar__icon}>
            <i className="fas fa-search"></i>
          </div>
        </div>
        <div
          className={styles.fullSearchNav__closeBtn}
          onClick={onIconCloseSearchHandler}
        >
          <i className="fas fa-times"></i>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.searchbar}>
        <input
          type="text"
          className={styles.searchbar__input}
          placeholder="What are you loooking for?"
        />
        <div className={styles.searchbar__icon}>
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div
        onClick={onIconSearchHandler}
        className={styles.searchbar__mobileicon}
      >
        <i className="fas fa-search"></i>
      </div>
    </>
  );
};

export default Searchbar;
