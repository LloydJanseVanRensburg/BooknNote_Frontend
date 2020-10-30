import React, { useState, useContext, useEffect } from "react";

//Components
import AuthContext from "../../../context/auth/authContext";
import AlertContext from "../../../context/alerts/alertContext";

//stylus
import styles from "./Register.module.css";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/profile");
    }

    if (error) {
      console.log(error);
      error.forEach((err) => {
        setAlert(err.msg, "danger");
      });
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [formData, setFormData] = useState(INITIAL_STATE);
  const { username, email, password, confirmPassword } = formData;

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else if (password !== confirmPassword) {
      setAlert(
        "Passwords do not match make sure you know your password",
        "danger"
      );
    } else {
      register({
        username,
        email,
        password,
      });
    }
  };

  return (
    <div className={styles.loginpage}>
      <form onSubmit={onSubmit} className={styles.loginForm}>
        <h1>Register</h1>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            onChange={onChangeHandler}
            value={username}
          />
        </div>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            onChange={onChangeHandler}
            value={email}
          />
        </div>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={onChangeHandler}
            value={password}
          />
        </div>
        <div className={styles.loginForm__formgroup}>
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            onChange={onChangeHandler}
            value={confirmPassword}
          />
        </div>
        <button type="submit" className={styles.loginForm__btn}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
