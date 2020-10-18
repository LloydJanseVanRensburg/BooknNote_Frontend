import React from "react";

//stylus
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.loginpage}>
      <form className={styles.loginForm}>
        <h1>Login</h1>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter your email" />
        </div>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className={styles.loginForm__btn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
