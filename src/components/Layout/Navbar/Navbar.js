import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

//styles
import styles from "./Navbar.module.css";

// Components
import Logo from "../Logo/Logo";
import Searchbar from "./Searchbar/Searchbar";
import NavLinks from "./NavLinks/NavLinks";
import Backdrop from "../Backdrop/Backdrop";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const SidebarToggler = () => {
    setToggle(!toggle);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 1170px)" });

  if (!isMobile && toggle) {
    setToggle(false);
  }

  return (
    <nav className={styles.navbar}>
      {/* Hamburger */}
      <div onClick={SidebarToggler} className={styles.navbar__hamburger}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {toggle && isMobile ? (
        <>
          <Backdrop clicked={SidebarToggler} />
          <Sidebar visibility={toggle && isMobile} />
        </>
      ) : null}
      {/* Logo */}
      <Logo color="#000" />
      {/* SearchBar */}
      <Searchbar />
      {/* NavLinks */}
      <NavLinks visibility={!isMobile && !toggle} />
    </nav>
  );
};

export default Navbar;
