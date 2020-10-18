import React from "react";

//styles
import styles from "./Sidebar.module.css";

//Components
import NavLinks from "../Navbar/NavLinks/NavLinks";

const Sidebar = (props) => {
  return (
    <div className={styles.sidebar}>
      <NavLinks visibility={props.visibility} />
    </div>
  );
};

export default Sidebar;
