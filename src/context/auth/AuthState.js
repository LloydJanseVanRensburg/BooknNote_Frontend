import React, { useReducer, useContext } from "react";
import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";

import AuthContext from "./authContext";
import AlertContext from "../alerts/alertContext";
import authReducer from "./authReducer";

import * as authTypes from "./auth_types";

const AuthState = (props) => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const intialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, intialState);

  //@route - GET /users/
  //@desc - Get a specific user that is logged in using req.user param
  //@access - Private
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("http://localhost:5000/users/");

      dispatch({
        type: authTypes.USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      const errorPayload = err.response.data.msg || err.response.data.errors;

      if (!err.response.data.msg) {
        for (let i = 0; i < errorPayload.length; i++) {
          console.log(errorPayload[i].msg);
        }
      }

      console.log(errorPayload);
      dispatch({ type: authTypes.AUTH_ERROR });
      setAlert("Auth Error", "danger");
    }
  };

  //@route - POST /users/register
  //@desc - Create a new user in database and check that doesn't exist yet, and then gen token
  //@access - Public
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/users/register",
        formData,
        config
      );

      dispatch({
        type: authTypes.REGISTER_SUCCESS,
        payload: res.data,
      });

      setAlert("Register Success", "success");

      loadUser();
    } catch (err) {
      const errorPayload = err.response.data.msg || err.response.data.errors;

      if (!err.response.data.msg) {
        for (let i = 0; i < errorPayload.length; i++) {
          console.log(errorPayload[i].msg);
        }
      }

      console.log(errorPayload);

      dispatch({
        type: authTypes.REGISTER_FAIL,
        payload: errorPayload,
      });
    }
  };

  //@route - POST /users/login
  //@desc - Check users if exists and gen token and login
  //@access - Public
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/users/login",
        formData,
        config
      );

      dispatch({
        type: authTypes.LOGIN_SUCCESS,
        payload: res.data,
      });

      setAlert("Login Success", "success");

      loadUser();
    } catch (err) {
      const errorPayload = err.response.data.msg || err.response.data.errors;

      if (!err.response.data.msg) {
        for (let i = 0; i < errorPayload.length; i++) {
          console.log(errorPayload[i].msg);
        }
      }
      dispatch({
        type: authTypes.LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: authTypes.LOGOUT });
  };

  //@route - PUT /users/:id
  //@desc - Update anything on the user enitity
  //@access - Private
  const updateProfile = async (formData, id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/users/${id}`,
        formData
      );

      dispatch({
        type: authTypes.UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      });

      setAlert("Profile Successfully Updated", "success");
      loadUser();
    } catch (err) {
      const errorPayload = err.response.data.msg || err.response.data.errors;

      if (!err.response.data.msg) {
        for (let i = 0; i < errorPayload.length; i++) {
          console.log(errorPayload[i].msg);
        }
      }

      dispatch({
        type: authTypes.UPDATE_PROFILE_ERROR,
        payload: err.repsonse.data.msg,
      });
    }
  };

  // Clear Errors in state
  const clearErrors = () => {
    dispatch({ type: authTypes.CLEAR_ERRORS });
  };

  //@route - POST /adverts/sendemail
  //@desc - Handling emails
  //@access Private
  const sendEmail = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/adverts/sendemail",
        formData,
        config
      );

      console.log(res.data);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
        updateProfile,
        sendEmail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
