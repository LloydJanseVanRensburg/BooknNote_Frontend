import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

//Components
import AdvertContext from "../../../../context/adverts/advertContext";
import AlertContext from "../../../../context/alerts/alertContext";

//styles
import styles from "./MaintainAdvert.module.css";

const MaintainAdvert = (props) => {
  const { type } = props;

  const INITIAL_STATE = {
    type: props.type,
    moduleId: "",
    title: "",
    imageUrl: "",
    description: "",
    price: "",
  };

  const list = [
    "BMAN111",
    "CMPG111",
    "MATH111",
    "STTN111",
    "MTHS111",
    "ACCF122",
    "ALDA121",
    "ALDA111",
    "CMPG223",
    "BMAN223",
    "CMPG121",
    "PSYH111",
  ];

  const [advert, setAdvert] = useState(INITIAL_STATE);

  const advertContext = useContext(AdvertContext);
  const { createAdvert } = advertContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const history = useHistory();

  const onTextChangeHandler = (e) => {
    setAdvert({
      ...advert,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChangeHandler = (e) => {
    setAdvert({
      ...advert,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitHandler = () => {
    const data = new FormData();

    let error = false;

    if (!advert.imageUrl) {
      setAlert("Please Supply Image", "danger");
      error = true;
    }

    if (!advert.title) {
      setAlert("Please Supply Title", "danger");
      error = true;
    }

    if (!advert.moduleId) {
      setAlert("Please Supply Module Id", "danger");
      error = true;
    }

    if (!advert.description) {
      setAlert("Please Supply Description", "danger");
      error = true;
    }

    if (!advert.price) {
      setAlert("Please Supply Price", "danger");
      error = true;
    }

    if (!advert.type) {
      setAlert("Please Supply Type", "danger");
      error = true;
    }

    if (!error) {
      data.append("imageUrl", advert.imageUrl);
      data.append("title", advert.title);
      data.append("type", advert.type);
      data.append("moduleId", advert.moduleId);
      data.append("description", advert.description);
      data.append("price", advert.price);
      createAdvert(data);

      history.push(`/singlepost/${advert.title}`);
    }
  };

  return (
    <div className={styles.maintainadvert}>
      <h2 className={styles.maintainadvert__formTitle}>
        Create your {String(type).toUpperCase()} advert
      </h2>
      <div className={styles.maintainadvert__form}>
        <div className={styles.form__formgroup}>
          <label htmlFor="moduleId">Subject Code:</label>
          <select
            name="moduleId"
            id="moduleId"
            onChange={onTextChangeHandler}
            required
            value={advert.moduleId}
          >
            {list.map((subject) => {
              return (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.form__formgroup}>
          <label htmlFor="title">Title:</label>
          <input
            required
            type="text"
            name="title"
            id="title"
            onChange={onTextChangeHandler}
            value={advert.title}
          />
        </div>
        <div className={styles.form__formgroup}>
          <label htmlFor="imageUrl">
            Image: <small>(thumbnail of advert)</small>
          </label>
          <input
            required
            type="file"
            name="imageUrl"
            id="imageUrl"
            onChange={onFileChangeHandler}
          />
        </div>
        <div className={styles.form__formgroup}>
          <label htmlFor="description">Description</label>
          <textarea
            required
            name="description"
            id="description"
            cols="60"
            rows="10"
            onChange={onTextChangeHandler}
            value={advert.description}
          ></textarea>
        </div>
        <div className={styles.form__formgroup}>
          <label htmlFor="price">Price:</label>
          <input
            required
            type="text"
            name="price"
            id="price"
            onChange={onTextChangeHandler}
            value={advert.price}
          />
        </div>
        <div className={styles.form__formbuttons}>
          <button
            className={styles.formbuttons__cancelbtn}
            onClick={() => history.push("/advertisehere")}
          >
            Cancel
          </button>
          <button
            className={styles.formbuttons__createbtn}
            onClick={submitHandler}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintainAdvert;
