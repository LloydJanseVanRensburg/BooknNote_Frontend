import React, { useState, useContext, useEffect } from "react";

//Components
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alerts/alertContext";

//stylus
import styles from "./Login.module.css";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [formInput, setFormInput] = useState(INITIAL_STATE);

  const { email, password } = formInput;

  const formChangeHandler = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please Enter All Fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className={styles.loginpage}>
      <form onSubmit={onSubmit} className={styles.loginForm}>
        <h1>Login</h1>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            name="email"
            onChange={formChangeHandler}
          />
        </div>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            name="password"
            onChange={formChangeHandler}
          />
        </div>
        <button type="submit" className={styles.loginForm__btn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
