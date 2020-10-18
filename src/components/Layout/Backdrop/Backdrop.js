import React from "react";

//styles
import styles from "./Backdrop.module.css";

const Backdrop = (props) => {
  return (
    <div className={styles.backdrop} onClick={props.clicked}>
      i am a backdrop
    </div>
  );
};

export default Backdrop;
