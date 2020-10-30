import React from "react";

import styles from "./Modal.module.css";

const Modal = (props) => {
  return <div className={styles.modal_container}>{props.children}</div>;
};

export default Modal;
