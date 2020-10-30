import React, { useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";

//styles
import styles from "./Searchbar.module.css";

import AlertContext from "../../../../context/alerts/alertContext";
import AdvertContext from "../../../../context/adverts/advertContext";

const Searchbar = (props) => {
  const [searchToggle, setSearchToggle] = useState(false);

  const [text, setText] = useState("");

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const advertContext = useContext(AdvertContext);
  const { searchAdverts } = advertContext;

  const history = useHistory();

  const onIconSearchHandler = () => {
    setSearchToggle(!searchToggle);
  };

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please Enter Something", "primary");
    } else {
      searchAdverts(text);
      setText("");
      history.push("/searchresults");
    }
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
        <form onSubmit={onSubmit}>
          <div className={styles.searchbar}>
            <input
              type="text"
              className={styles.searchbar__input}
              placeholder="What Module Code to filter By?"
              onChange={onChangeHandler}
              value={text}
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
        </form>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.searchbar}>
          <input
            type="text"
            className={styles.searchbar__input}
            placeholder="What are you loooking for?"
            onChange={onChangeHandler}
            value={text}
          />
          <button type="submit" className={styles.searchbar__icon}>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <button
          onClick={onIconSearchHandler}
          className={styles.searchbar__mobileicon}
        >
          <i className="fas fa-search"></i>
        </button>
      </form>
    </>
  );
};

export default Searchbar;
