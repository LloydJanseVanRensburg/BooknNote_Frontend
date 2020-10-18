import React from "react";

//stylus
import styles from "./Register.module.css";

const Register = () => {
  return (
    <div className={styles.loginpage}>
      <form className={styles.loginForm}>
        <h1>Register</h1>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Username</label>
          <input type="text" placeholder="Enter your username" />
        </div>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Confirm Password</label>
          <input type="password" placeholder="Confirm your password" />
        </div>
        <button type="submit" className={styles.loginForm__btn}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
